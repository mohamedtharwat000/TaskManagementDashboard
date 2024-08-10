import Globals from '../../../types/Globals';

const initialState: Globals = {
  theme: 'light',
  error: '',
  success: '',
  sort: {
    by: 'noSort',
    direction: 'asc',
  },
  filter: {
    status: 'all',
    priority: 'all',
  },
};

export default initialState;
