// frontend/__tests__/Posts.test.tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Posts from '../../app/posts/page';

describe('Posts', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renders posts in light mode', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              title: 'Test Post',
              content: 'Content',
              image: '/test.jpg',
              category: 'Tech',
              created_at: '2023-01-01T00:00:00Z',
            },
          ],
          last_page: 1,
        }),
    });

    render(await Posts({ searchParams: { page: '1' } }));
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('bg-white');
    expect(screen.getByText('Blog Posts')).toHaveClass('text-primary');
    expect(screen.getByText('Test Post')).toHaveClass('text-secondary');
    expect(screen.getByText('2023/1/1')).toBeInTheDocument();
  });

  it('renders posts in dark mode', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              title: 'Test Post',
              content: 'Content',
              image: '/test.jpg',
              category: 'Tech',
              created_at: '2023-01-01T00:00:00Z',
            },
          ],
          last_page: 1,
        }),
    });

    render(
      <div className="dark">
        {await Posts({ searchParams: { page: '1' } })}
      </div>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('bg-black');
    expect(screen.getByText('Blog Posts')).toHaveClass('text-white');
    expect(screen.getByText('Test Post')).toHaveClass('text-white');
  });

  it('displays error on API failure', async () => {
    (global.fetch as any).mockImplementationOnce(() => {
      throw new Error('API error');
    });

    render(await Posts({ searchParams: { page: '1' } }));
    expect(screen.getByText('Error: API error')).toBeInTheDocument();
  });
});