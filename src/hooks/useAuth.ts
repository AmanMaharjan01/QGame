import { useSelector } from 'react-redux';
import { IState } from '../app/interface/IState';

const useAuth = () => {
  const user = useSelector((state: IState) => state.auth?.user);
  // eslint-disable-next-line no-console
  console.log('user', user);
  return user;
};

export default useAuth;
