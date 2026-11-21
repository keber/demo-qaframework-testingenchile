// Third-party trackers aborted in EVERY test (fixtures/pom/network-fixture.ts).
// Why: the Bootcamp self-assessment fires a real Google Ads 'purchase' conversion
// (HC-21, REC-TCH-017) and analytics hits would pollute the site owner's data.
// A host matches itself and any subdomain (googletagmanager.com covers www.).
export const BLOCKED_TRACKER_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'analytics.google.com',
  'googleadservices.com',
  'googlesyndication.com',
  'doubleclick.net',
  'facebook.net',
  'facebook.com',
  'connect.facebook.net',
  'licdn.com',
  'ads.linkedin.com',
  'clarity.ms',
  'hotjar.com',
  'tiktok.com',
] as const;

// Conversion and audience endpoints served from google.<tld> (google.com, google.cl...).
export const BLOCKED_GOOGLE_PATH_PREFIXES = ['/pagead/', '/ads/', '/ccm/'] as const;
