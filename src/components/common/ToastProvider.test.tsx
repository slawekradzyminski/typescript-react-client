import React, { useContext } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { ToastContext } from '../../context/ToastContext';
import { ToastProvider } from './ToastProvider';

describe('ToastProvider', () => {
    it('provides a function to set toast', () => {
        // given
        const TestComponent = () => {
            const setToast = useContext(ToastContext);
            return <button onClick={() => setToast({ type: 'success', message: 'Test message' })}>Set toast</button>;
        };

        const { getByText } = render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        // when
        fireEvent.click(getByText('Set toast'));

        // then
        expect(getByText('Test message')).toBeInTheDocument();
    });

    it('clears the toast after 3 seconds', async () => {
        // given
        jest.useFakeTimers();
        const TestComponent = () => {
            const setToast = useContext(ToastContext);
            return <button onClick={() => setToast({ type: 'success', message: 'Test message' })}>Set toast</button>;
        };
        const { getByText, queryByText } = render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        // when
        fireEvent.click(getByText('Set toast'));
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // then
        expect(queryByText('Test message')).toBeNull();
        jest.useRealTimers();
    });
});