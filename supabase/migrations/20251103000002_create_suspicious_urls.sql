-- Create suspicious_urls table untuk tracking spam/phishing attempts
create table if not exists suspicious_urls (
  id uuid default uuid_generate_v4() primary key,
  timestamp timestamptz not null default now(),
  path text not null,
  query_params text,
  full_url text not null,
  ip_address text,
  user_agent text,
  referer text,
  pattern_matched text,
  
  -- Metadata
  created_at timestamptz not null default now()
);

-- Create indexes for querying
create index if not exists suspicious_urls_timestamp_idx on suspicious_urls(timestamp desc);
create index if not exists suspicious_urls_path_idx on suspicious_urls(path);
create index if not exists suspicious_urls_ip_idx on suspicious_urls(ip_address);

-- Add RLS policies
alter table suspicious_urls enable row level security;

-- Allow insert from any source (untuk logging dari middleware)
create policy "Allow insert suspicious URLs"
  on suspicious_urls
  for insert
  to public
  with check (true);

-- Allow select only for admin users
create policy "Allow select for admin users"
  on suspicious_urls
  for select
  to authenticated
  using (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create function to auto-delete old records (older than 30 days)
create or replace function delete_old_suspicious_urls()
returns void as $$
begin
  delete from suspicious_urls 
  where timestamp < now() - interval '30 days';
end;
$$ language plpgsql;

-- Optional: Create scheduled job to clean old records
-- This requires pg_cron extension
-- SELECT cron.schedule('delete-old-suspicious-urls', '0 2 * * *', 'SELECT delete_old_suspicious_urls();');
