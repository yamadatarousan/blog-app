import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Navbar from '../../../components/Navbar'; // 相対パスでテスト
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Navbar', () => {
  it('renders Posts and About links', () => {
    vi.mocked(usePathname).mockReturnValue('/posts');
    render(<Navbar />);
    expect(screen.getByText('Posts')).toHaveAttribute('href', '/posts');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
  });

  it('highlights active link', () => {
    vi.mocked(usePathname).mockReturnValue('/about');
    render(<Navbar />);
    expect(screen.getByText('About').closest('a')).toHaveClass('bg-indigo-800');
    expect(screen.getByText('Posts').closest('a')).not.toHaveClass('bg-indigo-800');
  });

  it('has correct navbar background', () => {
    vi.mocked(usePathname).mockReturnValue('/posts');
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toHaveClass('bg-indigo-600');
  });
});