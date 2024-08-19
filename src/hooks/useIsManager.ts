import { useAppSelector } from 'src/hooks';

const useIsAdmin = () => {
  const user = useAppSelector((state) => state.auth.login.user);
  const isAdmin = user && user.role && user.role.includes('Admin');

  return isAdmin;
};

export default useIsAdmin;
