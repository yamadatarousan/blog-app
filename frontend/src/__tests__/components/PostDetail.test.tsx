// frontend/__tests__/PostDetail.test.tsx
import { render, screen } from '@testing-library/react';
import Post from '../../app/posts/[id]/page';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

describe('Post', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
  });

  it('renders Post page in light mode', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
            category: 'Tech',
            created_at: '2023-01-01T00:00:00Z',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    );

    expect(await screen.findByTestId('container')).toHaveClass('bg-white');
    expect(screen.getByText('Test Post')).toHaveClass('text-primary');
  });

  it('renders Post page in dark mode', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Post',
            content: 'Content',
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
        <Suspense fallback={<div>Loading...</div>}>
          <Post />
        </Suspense>
      </div>
    );

    expect(await screen.findByTestId('container')).toHaveClass('bg-black');
    expect(screen.getByText('Test Post')).toHaveClass('text-white');
  });
});