import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageInput from './MessageInput';
import userEvent from '@testing-library/user-event';

describe('input message component', () => {
  test('renders button text', () => {
    render(<MessageInput buttonText="button action" />);
    const title = screen.getByText(/button action/i);
    expect(title).toBeInTheDocument();
  });

  test('returned input text', async () => {
    const onSubmit = jest.fn();

    render(<MessageInput buttonText="button action" onSubmit={onSubmit} />);
    const inputArea = screen.getByPlaceholderText('What are your thoughts?');
    const button = screen.getByText(/button action/i);

    await userEvent.type(inputArea, 'my comment');
    expect(screen.getByText(/my comment/i)).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.queryByText(/my comment/i)).toBeNull();
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith('my comment');
  });

  test('canceled comment', async () => {
    const onCancel = jest.fn();

    render(<MessageInput buttonText="button action" onCancel={onCancel} />);
    const inputArea = screen.getByPlaceholderText('What are your thoughts?');
    const cancelButton = screen.getByText(/Cancel/i);

    await userEvent.type(inputArea, 'my comment');
    expect(screen.getByText(/my comment/i)).toBeInTheDocument();

    await userEvent.click(cancelButton);
    expect(screen.queryByText(/my comment/i)).toBeNull();
    expect(onCancel).toBeCalledTimes(1);
  });
});
