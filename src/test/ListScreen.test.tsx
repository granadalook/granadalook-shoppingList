import React from 'react';
import { render } from '@testing-library/react-native';
import { ListScreen } from '../screens';
import { ListContainer } from '../components/organisms/ListDetailScreen';


// Mock del componente ListContainer
jest.mock('../components/organisms/ListDetailScreen.tsx', () => ({
  ListContainer: jest.fn(() => null),
}));

describe('ListScreen', () => {
  it('renderiza ListContainer con route y navigation', () => {
    const mockRoute = { params: { id: '123' } };
    const mockNavigation = { navigate: jest.fn() };

    render(<ListScreen route={mockRoute} navigation={mockNavigation} />);

    expect(ListContainer).toHaveBeenCalledTimes(1);

    const callArgs = (ListContainer as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toEqual(
      expect.objectContaining({
        route: mockRoute,
        navigation: mockNavigation,
      })
    );
  });
});
