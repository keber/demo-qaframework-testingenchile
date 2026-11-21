/**
 * fixtures/pending.ts
 *
 * Third valid TC state of framework rule 8: the TC is not executable yet. The
 * skip always carries a PENDING-* kind and a reason (the REC id, the missing
 * observation or the S7 restriction), so the report shows why it does not run.
 *
 *   - PENDING-SPEC: the rule is not confirmed (it lives in a REC-TCH-NNN).
 *   - PENDING-BROWSER: the behaviour was not observed in a real browser (K12).
 *   - PENDING-CODE: not executable in this environment (e.g. @destructive on
 *     production, rule S7 / W9) or manual-only track.
 */

import { test } from '@playwright/test';

export type PendingKind = 'PENDING-SPEC' | 'PENDING-BROWSER' | 'PENDING-CODE';

/**
 * Skips the running test with a traceable PENDING-* reason.
 * @param kind - why the TC is pending
 * @param reason - linked REC/issue and what has to happen to reactivate it
 */
export function skipPending(kind: PendingKind, reason: string): void {
  const cleanReason = String(reason ?? '').trim();
  if (!cleanReason) {
    throw new Error(`[pending] ${kind}: a reason is required (linked REC, issue or restriction)`);
  }
  test.info().annotations.push({ type: kind, description: cleanReason });
  test.skip(true, `${kind}: ${cleanReason}`);
}
