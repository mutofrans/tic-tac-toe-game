import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from '../components/Game';

describe(('Game component'), () => {
  it('renders correctly', () => {
    render(<Game />);
  });

  it('restart button is rendered', () => {
    render(<Game />);
    expect(screen.getByText('Restart')).toBeInTheDocument();
  });

  it('Go to game start button is rendered', () => {
    render(<Game />);
    expect(screen.getByText('Go to game start')).toBeInTheDocument();
  });

  it('Toggle move order button is rendered', () => {
    render(<Game />);
    expect(screen.getByText('Toggle move order')).toBeInTheDocument();
  });

  it('shows next player is X by default', () => {
    render(<Game />);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });
});

