import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/Commenting Tool/i);
  expect(title).toBeInTheDocument();
});
