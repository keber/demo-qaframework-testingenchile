import { devices, mergeTests } from '@playwright/test';
import { test as pageObjectTest } from './page-object-fixture';
import { test as networkTest } from './network-fixture';
import { test as httpTest } from './http-fixture';

// Single import point for specs: `import { test, expect } from '../../fixtures/pom/test-options'`.
// networkTest is an AUTO fixture: every test aborts third-party trackers (HC-21).
export const test = mergeTests(networkTest, pageObjectTest, httpTest);

export { expect } from '@playwright/test';
export { expectOpenDefect, openDefect, InfraError } from '../defects';
export { skipPending } from '../pending';
export { unreachable, type LinkStatus } from './http-fixture';

// Pixel 5 context options usable in a describe-level `test.use()` (the
// browser-level `defaultBrowserType` of the device descriptor is left out).
const pixel5 = devices['Pixel 5'];
export const PIXEL_5 = {
  viewport: pixel5.viewport,
  userAgent: pixel5.userAgent,
  deviceScaleFactor: pixel5.deviceScaleFactor,
  isMobile: pixel5.isMobile,
  hasTouch: pixel5.hasTouch,
};
