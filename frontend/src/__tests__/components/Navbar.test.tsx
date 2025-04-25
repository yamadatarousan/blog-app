// frontend/__tests__/components/Navbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Navbar from '../../../components/Navbar';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/posts');
  });

  it('renders nav items and toggle button in light mode', () => {
    render(<Navbar isDark={false} setIsDark={vi.fn()} />);
    expect(screen.getByText('Blog App')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toHaveClass('bg-indigo-800');
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toHaveClass('bg-indigo-600');
  });

  it('renders nav items and toggle button in dark mode', () => {
    render(
      <div className="dark">
        <Navbar isDark={true} setIsDark={vi.fn()} />
      </div>
    );
    expect(screen.getByText('Blog App')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toHaveClass('bg-gray-800');
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toHaveClass('bg-gray-900');
  });

  it('toggles mobile menu', () => {
    render(<Navbar isDark={false} setIsDark={vi.fn()} />);
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    expect(screen.getByText('Posts')).toHaveClass('block');
    expect(screen.getByText('ダークモード')).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.queryByText('ダークモード')).not.toBeInTheDocument();
  });

  it('calls setIsDark on toggle button click', () => {
    const setIsDark = vi.fn();
    render(<Navbar isDark={false} setIsDark={setIsDark} />);
    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);
    expect(setIsDark).toHaveBeenCalledWith(true);
  });
});