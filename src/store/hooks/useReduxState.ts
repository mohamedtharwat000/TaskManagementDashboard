import { useDispatch, useSelector } from 'react-redux';
import type { RootState, StateDispatch } from '../../store';

export const useStateDispatch = useDispatch.withTypes<StateDispatch>();
export const useStateSelector = useSelector.withTypes<RootState>();

const useReduxState = () => {
  return [useStateSelector((state) => state), useStateDispatch()];
};

export default useReduxState;
