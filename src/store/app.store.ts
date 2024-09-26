import { create } from 'zustand';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import React from 'react';

export const useAppStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user: any) => set({ user }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: any) => set({ error }),
}));

export const useSyncAuthState = () => {
  const setUser = useAppStore((state: any) => state?.setUser);
  const setLoading = useAppStore((state: any) => state?.setLoading);
  const setError = useAppStore((state: any) => state?.setError);

  const [user, loading, error] = useAuthState(auth);


  React.useEffect(() => {
    setUser(user);
    setLoading(loading);
    setError(error);
  }, [user, loading, error, setUser, setLoading, setError]);
};
