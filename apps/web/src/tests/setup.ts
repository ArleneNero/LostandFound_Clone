import { beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => `blob:mock-${crypto.randomUUID()}`);
  URL.revokeObjectURL = vi.fn();
});
afterEach(() => cleanup());
