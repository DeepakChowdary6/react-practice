import { render, screen } from '@testing-library/react';
import Infinitescrolling from './infinitescrolling';

test('renders learn react link', () => {
  render(<Infinitescrolling />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
