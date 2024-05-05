import { Page } from '@playwright/test';
import { backendUrl } from '../config/constants';

export const failedRegisterMessage = 'Username is already in use'

export async function mockSuccessfulSignup(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users/signup`, route => route.fulfill({
        status: 201
    }));
}

export async function mockFailedSignup(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users/signup`, (route) => {
        route.fulfill({
            status: 422,
            body: JSON.stringify({
                message: failedRegisterMessage
            })
        });
    });
}