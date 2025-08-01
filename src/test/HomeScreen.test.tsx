import React from 'react';
import { render } from '@testing-library/react-native';
;
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../screens';
import { HomeContainer } from '../components/organisms/HomeContainer';


// Mock de useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock del componente HomeContainer
jest.mock('../components/organisms/HomeContainer.tsx', () => ({
  HomeContainer: jest.fn(() => null), // simulamos render
}));

describe('HomeScreen', () => {
  it('renderiza HomeContainer con navigation', () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    render(<HomeScreen />);

    expect(HomeContainer).toHaveBeenCalledTimes(1);

    const callArgs = (HomeContainer as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toEqual(
      expect.objectContaining({
        navigation: mockNavigation,
      })
    );
  });
});