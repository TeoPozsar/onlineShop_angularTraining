import { clearUser, loadUser } from './user.actions';
import { userReducer } from './user.reducer';
import { initialUserState, UserState } from './user.state';

describe('userReducer', () => {
  const populatedState: UserState = {
    user: {
      id: 'user-1',
      username: 'admin',
      fullname: 'Admin User',
      roles: ['admin'],
    },
    loading: true,
    error: 'Previous error',
  };

  it('clears the complete user state', () => {
    expect(userReducer(populatedState, clearUser())).toEqual(initialUserState);
  });

  it('removes stale user roles while loading another user', () => {
    expect(userReducer(populatedState, loadUser())).toEqual({
      user: null,
      loading: true,
      error: null,
    });
  });
});
