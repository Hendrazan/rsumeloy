// Simple Structured Data validator script
// Usage: node tools/validateStructuredData.js
// Fetches sitemap.xml, picks homepage, doctors page, up to 3 article URLs, and validates JSON-LD blocks.

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://rsumeloy.vercel.app/sitemap.xml';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function extractJsonLd(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    matches.push(m[1].trim());
  }
  return matches;
}

function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // SECURITY FIX: Removed eval() - it's a critical security vulnerability
    // If JSON.parse fails, the data is malformed and should not be parsed
    console.warn('Failed to parse JSON-LD:', e.message);
    return { __parseError: e.message };
  }
}

function validateLdObject(obj) {
  const issues = [];
  if (!obj['@context']) issues.push('missing @context');
  if (!obj['@type']) issues.push('missing @type');
  const type = obj['@type'];
  if (typeof type === 'string') {
    if (type.toLowerCase() === 'article') {
      if (!obj.headline && !obj.name) issues.push('Article: missing headline/name');
      if (!obj.datePublished) issues.push('Article: missing datePublished');
    }
    if (type.toLowerCase() === 'physician') {
      if (!obj.name) issues.push('Physician: missing name');
      if (!obj.worksFor) issues.push('Physician: missing worksFor');
    }
    if (type.toLowerCase() === 'hospital' || type.toLowerCase() === 'localbusiness' || type.toLowerCase() === 'medicalorganization') {
      if (!obj.name) issues.push('Organization: missing name');
      if (!obj.address) issues.push('Organization: missing address');
    }
  }
  return issues;
}

(async function main(){
  console.log('Starting structured data validation...');
  try {
    const sitemapXml = await fetchText(SITEMAP_URL);
    const locRe = /<loc>(.*?)<\/loc>/gi;
    const locs = [];
    let m;
    while ((m = locRe.exec(sitemapXml)) !== null) locs.push(m[1]);

    // pick urls
    const urls = [];
    const hostname = new URL(SITEMAP_URL).origin;
    // homepage
    urls.push(hostname + '/');
    // doctors page
    urls.push(hostname + '/jadwal-dokter');

    // pick up to 3 article URLs containing '/tentang/artikel/'
    const articleUrls = locs.filter(u => u.includes('/tentang/artikel/'));
    for (let i=0;i<Math.min(3, articleUrls.length);i++) urls.push(articleUrls[i]);

    // add one service/contact if present
    const extra = locs.find(u => u.includes('/kontak')) || locs.find(u => u.includes('/layanan'));
    if (extra) urls.push(extra);

    console.log('Selected URLs for validation:', urls);

    const results = [];
    for (const url of urls) {
      try {
        console.log('\nFetching', url);
        const html = await fetchText(url);
        const scripts = extractJsonLd(html);
        console.log(`  Found ${scripts.length} JSON-LD <script> block(s)`);
        const parsed = scripts.map(s => safeParse(s));
        const validations = parsed.map(p => {
          if (p && p.__parseError) return { parsed: null, issues: ['parse error: ' + p.__parseError] };
          // Some pages put an array at top-level
          if (Array.isArray(p)) {
            const flat = p.flatMap(x => ({obj: x, issues: validateLdObject(x)}));
            return { parsed: p, issues: flat.map(f => f.issues).flat() };
          }
          const issues = validateLdObject(p);
          return { parsed: p, issues };
        });
        results.push({ url, scripts: parsed, validations });
      } catch (e) {
        console.error('  Error fetching/processing', url, e.message);
        results.push({ url, error: e.message });
      }
    }

    // Print report
    console.log('\nValidation report:');
    for (const r of results) {
      console.log('\n---', r.url, '---');
      if (r.error) {
        console.log('  ERROR:', r.error);
        continue;
      }
      if (!r.scripts || r.scripts.length === 0) {
        console.log('  No JSON-LD found');
        continue;
      }
      r.validations.forEach((v, i) => {
        console.log(`  Script #${i+1}: issues=${v.issues.length}`);
        v.issues.forEach(issue => console.log('    -', issue));
      });
    }

    // Summary counts
    const totalIssues = results.reduce((acc, r) => {
      if (!r.validations) return acc;
      return acc + r.validations.reduce((a,v)=>a+ (v.issues? v.issues.length:0), 0);
    },0);
    console.log('\nTotal issues found:', totalIssues);
    process.exit(0);
  } catch (e) {
    console.error('Fatal error:', e);
    process.exit(2);
  }
})();
