import { StoreWithPersist } from '@redux/index';

declare global {
  interface Window {
    __NEXT_REDUX_STORE__: StoreWithPersist;
  }
}
