import React from 'react';
import { render } from '@testing-library/react';
import ThemedContainer from './ThemedContainer';

describe('ThemedContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemedContainer maxWidth="md">
        <div>Test</div>
      </ThemedContainer>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});