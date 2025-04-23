import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Posts from '../../app/posts/page';

global.fetch = vi.fn();

describe('Posts Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders posts from API', async () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Test Post',
        content: 'This is a test.',
        image: 'https://picsum.photos/800/400',
        category: 'Tech',
        created_at: '2025-04-24T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPosts, last_page: 1 }),
    });

    const result = await Posts({ searchParams: {} });
    render(result);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Post' })).toHaveAttribute(
      'src',
      'https://picsum.photos/800/400'
    );
    // リンクを部分一致で特定
    expect(screen.getByRole('link', { name: /Test Post/i })).toHaveAttribute('href', '/posts/1');
  });

  it('shows error on API failure', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });

    const result = await Posts({ searchParams: {} });
    render(result);

    expect(screen.getByText('Error: API error: 500 Server Error')).toBeInTheDocument();
  });
});