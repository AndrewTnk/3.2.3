import '@testing-library/jest-dom/vitest';
import {  vi, beforeEach, afterEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  const portalRoot = document.createElement('div');
  portalRoot.id = 'portal-root';
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  vi.clearAllMocks();
  const portalRoot = document.getElementById('portal-root');
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MantineProvider>
        {children}
      </MantineProvider>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };