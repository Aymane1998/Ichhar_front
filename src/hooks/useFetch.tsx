import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UseFetchProps } from 'src/utils/types/UseFetchProps';

const useFetch = ({ status, data, action }: UseFetchProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle' && (!data || data.length === 0)) {
      dispatch(action());
    }
  }, [status, data, dispatch, action]);

  useEffect(
    () => () => {
      dispatch(action());
    },
    [action, dispatch],
  );
};

export default useFetch;
