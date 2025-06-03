import { useReducer } from 'react';

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((flag) => !flag, false);
  return [forceUpdate];
};

export default useForceUpdate;
