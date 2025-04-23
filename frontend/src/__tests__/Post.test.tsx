import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Post from '../../app/posts/[id]/page';

global.fetch = vi.fn();

describe('Post Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders single post from API', async () => {
    const mockPost = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test.',
      image: 'https://picsum.photos/800/400',
      category: 'Tech',
      created_at: '2025-04-24T00:00:00Z',
    };

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockPost,
    });

    const result = await Post({ params: { id: '1' } });
    render(result);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('This is a test.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Post' })).toHaveAttribute(
      'src',
      'https://picsum.photos/800/400'
    );
    expect(screen.getByRole('link', { name: '← Back to Posts' })).toHaveAttribute('href', '/posts');
  });

  it('shows error on API failure', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await Post({ params: { id: '999' } });
    render(result);

    expect(screen.getByText('Error: API error: 404 Not Found')).toBeInTheDocument();
  });
});