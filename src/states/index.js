import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import preloadReducer from './preload/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    preload: preloadReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
