// frontend/__tests__/About.test.tsx
import { render, screen } from '@testing-library/react';
import About from '../../app/about/page';

describe('About', () => {
  it('renders About page in light mode', async () => {
    render(await About());
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('bg-white');
    expect(screen.getByText('About')).toHaveClass('text-primary');
    expect(screen.getByText('自分用のブログアプリを作っている最中です')).toHaveClass('text-gray-700');
  });

  it('renders About page in dark mode', async () => {
    render(
      <div className="dark">
        {await About()}
      </div>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('bg-black');
    expect(screen.getByText('About')).toHaveClass('text-white');
    expect(screen.getByText('自分用のブログアプリを作っている最中です')).toHaveClass('text-gray-200');
  });
});