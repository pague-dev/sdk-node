import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// Make fetchMock available globally for tests
// @ts-expect-error - Setting global for tests
globalThis.fetchMock = fetchMocker;
