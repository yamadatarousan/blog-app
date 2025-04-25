// frontend/__tests__/components/PostDetail.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Post from '../../../app/posts/[id]/page';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
}));

global.fetch = vi.fn();

describe('PostDetail', () => {
  beforeEach(() => {
    (global.fetch as any).mockReset();
  });

  it('renders post with image, category, and date in light mode', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
            image: '/test.jpg',
            category: 'Tech',
            created_at: '2023-01-01T00:00:00Z',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    render(<Post />);
    const container = await screen.findByTestId('container');
    expect(container).toHaveClass('bg-white');
    expect(screen.getByText('Test Post')).toHaveClass('text-primary');
    expect(screen.getByText('Tech')).toHaveClass('bg-accent');
    expect(screen.getByText('2023/1/1')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('← Back to Posts')).toBeInTheDocument();
  });

  it('renders post in dark mode', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
            image: '/test.jpg',
            category: 'Tech',
            created_at: '2023-01-01T00:00:00Z',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    render(
      <div className="dark">
        <Post />
      </div>
    );
    const container = await screen.findByTestId('container');
    expect(container).toHaveClass('bg-black');
    expect(screen.getByText('Test Post')).toHaveClass('text-white');
    expect(screen.getByText('まだコメントがありません。')).toHaveClass('text-gray-200');
  });

  it('renders comments and submits new comment', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
            category: 'General',
            created_at: '2023-01-01T00:00:00Z',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, post_id: 1, content: 'Test Comment', created_at: '2023-01-01T00:00:00Z' },
          ]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 2,
            post_id: 1,
            content: 'New Comment',
            created_at: '2023-01-02T00:00:00Z',
          }),
      });

    render(<Post />);
    expect(await screen.findByText('Test Comment')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('コメントを追加'), {
      target: { value: 'New Comment' },
    });
    fireEvent.click(screen.getByText('コメントする'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1/api/comments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ post_id: 1, content: 'New Comment' }),
        })
      );
      expect(screen.getByText('New Comment')).toBeInTheDocument();
    });
  });

  it('displays no comments message when empty', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
            category: 'General',
            created_at: '2023-01-01T00:00:00Z',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    render(<Post />);
    expect(await screen.findByText('まだコメントがありません。')).toBeInTheDocument();
  });

  it('displays error on API failure', async () => {
    (global.fetch as any).mockImplementationOnce(() => {
      throw new Error('API error');
    });
    render(<Post />);
    expect(await screen.findByText('Error: API error')).toBeInTheDocument();
  });
});