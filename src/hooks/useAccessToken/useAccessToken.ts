import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { storageTokenName } from 'store/Auth/constants';

const useAccessToken = (): void => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem(storageTokenName)) {
      history.push('/');
    }
  }, [history]);
};

export default useAccessToken;
