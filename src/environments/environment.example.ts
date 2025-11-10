/*
  Example environment file for local development.
  Copy this to `src/environments/environment.ts` and replace placeholders with your real values.

  WARNING: Do NOT commit real credentials. The repository .gitignore ignores environment files.
*/

export const environment = {
  production: false,
  // Your Supabase project URL (example: https://abcd1234.supabase.co)
  supabaseUrl: 'https://YOUR_SUPABASE_URL.supabase.co',
  // Your Supabase anon/public key (do NOT use service_role in client apps)
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
};
