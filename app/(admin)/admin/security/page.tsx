import { createClient } from '@/lib/supabase/server';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface SuspiciousUrl {
  id: string;
  timestamp: string;
  path: string;
  query_params: string | null;
  full_url: string;
  ip_address: string | null;
  user_agent: string | null;
  referer: string | null;
  pattern_matched: string | null;
}

export default async function SecurityLogsPage() {
  const supabase = createClient();
  
  // Fetch suspicious URLs dari database
  const { data: suspiciousUrls, error } = await supabase
    .from('suspicious_urls')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100);

  const totalCount = suspiciousUrls?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security Logs</h1>
        <p className="text-muted-foreground">
          Monitor suspicious URL access attempts and potential security threats
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last 24 Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {suspiciousUrls?.filter(url => {
                const diff = Date.now() - new Date(url.timestamp).getTime();
                return diff < 24 * 60 * 60 * 1000;
              }).length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique IPs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {new Set(suspiciousUrls?.map(url => url.ip_address) || []).size}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Access Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-destructive p-4 bg-destructive/10 rounded-md">
              <p className="font-semibold">Error loading logs:</p>
              <p className="text-sm">{error.message}</p>
              <p className="text-sm mt-2">
                Pastikan tabel <code>suspicious_urls</code> sudah dibuat di database.
                Jalankan migration: <code>20251103000002_create_suspicious_urls.sql</code>
              </p>
            </div>
          ) : suspiciousUrls && suspiciousUrls.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Timestamp</th>
                    <th className="text-left p-3 font-semibold">URL</th>
                    <th className="text-left p-3 font-semibold">IP Address</th>
                    <th className="text-left p-3 font-semibold">Pattern</th>
                    <th className="text-left p-3 font-semibold">Referer</th>
                  </tr>
                </thead>
                <tbody>
                  {suspiciousUrls.map((url) => (
                    <tr key={url.id} className="border-b hover:bg-secondary/50 transition-colors">
                      <td className="p-3 text-muted-foreground">
                        {formatDate(url.timestamp)}
                      </td>
                      <td className="p-3">
                        <code className="text-xs bg-secondary px-2 py-1 rounded">
                          {url.full_url}
                        </code>
                      </td>
                      <td className="p-3 font-mono text-xs">
                        {url.ip_address || 'unknown'}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                          {url.pattern_matched?.replace(/[\/\\]/g, '') || 'unknown'}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-xs truncate">
                        {url.referer || 'direct'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>✅ No suspicious access attempts detected</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Agent Details */}
      {suspiciousUrls && suspiciousUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>User Agent Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(suspiciousUrls.map(u => u.user_agent)))
                .filter(ua => ua)
                .slice(0, 10)
                .map((userAgent, idx) => (
                  <div key={idx} className="p-3 bg-secondary/30 rounded text-xs font-mono break-all">
                    {userAgent}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
