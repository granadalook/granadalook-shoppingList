import authReducer, { login, logout } from '../../src/store/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
  };

  it('debe retornar el estado inicial', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('debe manejar login', () => {
    const action = login('user@example.com');
    const state = authReducer(initialState, action);
    expect(state.user).toBe('user@example.com');
  });

  it('debe manejar logout', () => {
    const loggedInState = { user: 'user@example.com' };
    const state = authReducer(loggedInState, logout());
    expect(state.user).toBeNull();
  });
});
