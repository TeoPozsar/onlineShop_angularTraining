import { AuthUser } from '../../../services/auth';

export interface UserState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  loading: false,
  error: null,
};
