import { render, screen } from '@testing-library/react';

import App from '../App';

describe('rendering <App />', () => {
  it('renders app components', () => {
    render(<App />);
    expect(screen.getByTestId('container')).toBeTruthy();
  });
});
