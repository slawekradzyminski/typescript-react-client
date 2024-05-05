import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EmailComponent } from './EmailComponent';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            user: {
                email: 'test@test.com',
            },
        },
    }),
}));

test('verifies that the Typography component is rendered with correct text', () => {
    render(
        <MemoryRouter>
            <EmailComponent />
        </MemoryRouter>
    );

    const typography = screen.getByRole('heading', { name: /email user/i });

    expect(typography).toBeInTheDocument();
});