// Debug helper: fetch a URL and print each application/ld+json script content
// Usage: node tools/printScripts.js <url>

const url = process.argv[2];
if (!url) {
  console.error('Usage: node tools/printScripts.js <url>');
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const html = await res.text();
    const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let m; let i = 0;
    while ((m = re.exec(html)) !== null) {
      i++;
      const text = m[1].trim();
      console.log(`\n--- Script #${i} ---`);
      try {
        const parsed = JSON.parse(text);
        console.log(JSON.stringify(parsed, null, 2).slice(0, 4000));
      } catch (e) {
        console.log('raw:', text.slice(0, 4000));
        console.log('parse error:', e.message);
      }
    }
    if (i === 0) console.log('No JSON-LD scripts found');
  } catch (e) {
    console.error('Error:', e);
    process.exit(2);
  }
})();