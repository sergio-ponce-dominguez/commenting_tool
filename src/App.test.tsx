import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/root.reducer';

const store = createStore(rootReducer);

const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

test('renders title', () => {
  render(<App />, { wrapper: Wrapper });
  const title = screen.getByText(/Commenting Tool/i);
  expect(title).toBeInTheDocument();
});
