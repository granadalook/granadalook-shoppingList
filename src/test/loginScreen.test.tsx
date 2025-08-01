
import React from 'react';
import { render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreen } from '../screens';
import { LoginContainer } from '../components/organisms/LoginContainer';


// Mock de useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock del componente LoginContainer
jest.mock('../components/organisms/LoginContainer.tsx', () => ({
  LoginContainer: jest.fn(() => null),
}));

describe('LoginScreen', () => {
  it('renderiza LoginContainer con navigation', () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    render(<LoginScreen />);

    expect(LoginContainer).toHaveBeenCalledTimes(1);

    const callArgs = (LoginContainer as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toEqual(
      expect.objectContaining({
        navigation: mockNavigation,
      })
    );
  });
});
