import { mergeTests } from '@playwright/test';
import { test as pageObjectTest } from './page-object-fixture';

// Single import point for specs: `import { test, expect } from '../../fixtures/pom/test-options'`.
// Add new fixture modules (helpers, data) to mergeTests below.
export const test = mergeTests(pageObjectTest);

export { expect } from '@playwright/test';
export { expectOpenDefect, openDefect, InfraError } from '../defects';
