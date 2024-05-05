import { Page } from '@playwright/test';
import { backendUrl } from '../config/constants';
import { getRandomUser } from '../generator/userGenerator';
import { User } from '../../src/types';

export const failedLoginMessage = 'Invalid username/password supplied'

export async function mockLogin(page: Page): Promise<void> {
    await mockSuccessfulLoginForUser(page, getRandomUser())
}

export async function mockSuccessfulLoginForUser(page: Page, user: User): Promise<void> {
    await page.route(`${backendUrl}/users/signin`, route => route.fulfill({
        status: 200,
        body: JSON.stringify(user)
    }));
}

export async function mockFailedLogin(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users/signin`, route => route.fulfill({
        status: 422,
        body: JSON.stringify({
            message: failedLoginMessage
        })
    }));
}