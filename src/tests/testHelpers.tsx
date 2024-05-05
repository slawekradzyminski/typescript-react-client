import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import { render } from '@testing-library/react';
import rootReducer from '../_reducers';
import React from 'react';

export function setupMockDispatch() {
    const mockDispatch = jest.fn().mockImplementation(() => Promise.resolve());
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    return mockDispatch;
}

type RenderWithReduxOptions = { initialState?: any, store?: any };

export const renderWithRedux = (
    component: React.ReactElement,
    { initialState, store }: RenderWithReduxOptions = {}
) => {
    initialState = initialState || {};
    store = store || configureStore({ reducer: rootReducer, preloadedState: initialState });
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};