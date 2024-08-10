import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useStateSelector = useSelector.withTypes<RootState>();

const useReduxState = (selector: (state: RootState) => any) => {
  return [useStateSelector(selector), useAppDispatch()];
};

export default useReduxState;
