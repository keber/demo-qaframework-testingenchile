// Curated, observed on the live site (2026-11-21). Event year, dates, venue and
// sponsors are volatile (project rule 7): presence and formats are asserted.

// Visible date and venue fragments of the landing (RN-EVT-001).
export const EVENT_DATE_PATTERN = /\d{1,2}( y \d{1,2})? de [A-Za-zÁÉÍÓÚáéíóú]+/;
export const EVENT_VENUE_PATTERN = /Hotel|Santiago/;

// Ticket sales host (RN-EVT-003): links are read, never clicked (S7).
export const TICKET_HOST = 'www.ecopass.cl';

// Sponsor tiers shown on the landing (RN-EVT-007).
export const SPONSOR_TIERS = ['Platinum', 'Oro', 'Plata', 'Bronce'] as const;

// Path of the yearly sponsors page (the year is volatile).
export const SPONSORS_PATH_PATTERN = /^\/nuestros-sponsors-\d{4}\/$/;

// Brochure request mailbox prefix (RN-EVT-011); domain in home/navigation.ts.
export const BROCHURE_MAILBOX_PREFIX = 'eventos';

// Statuses answered by anti-bot protections to automated clients (LinkedIn 999,
// Facebook 400, several sites 403): "not verifiable", never "broken".
export const ANTI_BOT_STATUSES = [999, 400, 403] as const;
export const EXTERNAL_LINK_TIMEOUT_MS = 20_000;

// Edition blocks of the past editions page (RN-EVT-013).
export const EDITION_HEADINGS = [
  /Testing Day Chile 2019/,
  /Testing Day Chile 2018/,
  /Testing Day Chile 2017/,
  /Córdoba Testing Day 2016/,
] as const;

// Embedded video origin of the 2025 edition page (RN-EVT-017).
export const VIDEO_EMBED_HOST = 'youtube-nocookie.com';
