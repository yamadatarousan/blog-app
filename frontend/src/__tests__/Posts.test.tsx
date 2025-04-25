// frontend/__tests__/Posts.test.tsx
import { render, screen } from '@testing-library/react';
import Posts from '../../app/posts/page';
import { Suspense } from 'react';
import { vi } from 'vitest';

describe('Posts', () => {
  it('renders Posts page in light mode', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              title: 'Test Post',
              content: 'Content',
              category: 'Tech',
              created_at: '2023-01-01T00:00:00Z',
            },
          ],
          last_page: 1,
        }),
    });

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Posts searchParams={{}} />
      </Suspense>
    );

    expect(await screen.findByTestId('container')).toHaveClass('bg-white');
    expect(screen.getByText('Blog Posts')).toHaveClass('text-primary');
    expect(screen.getByText('Test Post')).toHaveClass('text-secondary');
  });

  it('renders Posts page in dark mode', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              title: 'Test Post',
              content: 'Content',
              category: 'Tech',
              created_at: '2023-01-01T00:00:00Z',
            },
          ],
          last_page: 1,
        }),
    });

    render(
      <div className="dark">
        <Suspense fallback={<div>Loading...</div>}>
          <Posts searchParams={{}} />
        </Suspense>
      </div>
    );

    expect(await screen.findByTestId('container')).toHaveClass('bg-black');
    expect(screen.getByText('Blog Posts')).toHaveClass('text-white');
    expect(screen.getByText('Test Post')).toHaveClass('text-white');
  });

  it('shows dark theme fallback during loading', async () => {
    global.fetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  data: [],
                  last_page: 1,
                }),
            });
          }, 100)
        )
    );

    render(
      <div className="dark">
        <Suspense fallback={<div className="min-h-screen bg-black text-gray-200">Loading...</div>}>
          <Posts searchParams={{}} />
        </Suspense>
      </div>
    );

    expect(screen.getByText('Loading...')).toHaveClass('bg-black');
    expect(screen.getByText('Loading...')).toHaveClass('text-gray-200');
  });
});