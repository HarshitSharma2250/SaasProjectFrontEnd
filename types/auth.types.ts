export interface AuthState {
  token: string | null
  name: string | null
   userId: string | null;

  setToken: (token: string | null) => void
  setName: (name: string | null) => void
  getToken: () => string | null
  getName: () => string | null
  clearAuth: () => void
  setUserId: (id: string | null) => void;
  getUserId: () => string | null;
}