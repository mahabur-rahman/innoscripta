import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This uses localStorage

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
};

export default persistConfig;
