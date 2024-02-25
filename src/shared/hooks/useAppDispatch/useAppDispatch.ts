import { useDispatch } from 'react-redux';

import { AppDispatch } from 'app/providers/storeProvider/config/store';

export const useAppDispatch = useDispatch<AppDispatch>;
