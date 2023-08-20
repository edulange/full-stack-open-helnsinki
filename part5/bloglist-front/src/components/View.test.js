import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import View from './View';

describe('View Component', () => {
  test('toggles visibility of content', () => {
    const { container, getByText } = render(
      <View buttonLabel="Toggle">
        <div className="content">Content to toggle</div>
      </View>
    );

    // Initially, content should be hidden
    const contentElement = container.querySelector('.content');
    expect(contentElement).toBeNull();

    // Click the "Toggle" button
    const toggleButton = getByText('Toggle');
    fireEvent.click(toggleButton);

    // After clicking, content should be visible
    expect(contentElement).toBeInTheDocument();
  });
});
