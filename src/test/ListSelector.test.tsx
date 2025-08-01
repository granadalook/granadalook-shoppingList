import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListSelector } from '../components/molecules/ListSelector';

// ✅ Declaramos Text y TouchableOpacity dentro del scope de jest.mock
jest.mock('../components/atoms/ListItem', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');

  return {
    ListItem: ({ name, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{name}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('ListSelector', () => {
  const lists = [
    { id: '1', nombre: 'Lista 1' },
    { id: '2', nombre: 'Lista 2' },
  ];

  it('debe renderizar todas las listas', () => {
    const { getByText } = render(
      <ListSelector lists={lists} onSelect={() => {}} />
    );

    expect(getByText('Lista 1')).toBeTruthy();
    expect(getByText('Lista 2')).toBeTruthy();
  });

  it('debe llamar a onSelect cuando se presiona un item', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ListSelector lists={lists} onSelect={onSelect} />);

    fireEvent.press(getByText('Lista 2'));

    expect(onSelect).toHaveBeenCalledWith('2');
  });

  it('no debe volver a llamar a onSelect si se presiona el mismo item', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ListSelector lists={lists} onSelect={onSelect} />);

    const item = getByText('Lista 1');
    fireEvent.press(item); // Primera vez
    fireEvent.press(item); // Segunda vez

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
