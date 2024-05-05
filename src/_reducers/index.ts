import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducer, { AuthenticationState } from './authentication.reducer';

export type RootState = {
    authentication: AuthenticationState
};

const rootReducer = combineReducers({
    authentication: authenticationReducer,
});

export default rootReducer;