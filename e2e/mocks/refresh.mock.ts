import { Page } from '@playwright/test';
import { backendUrl } from '../config/constants';
import { getRandomUser } from '../generator/userGenerator';
import { User } from '../../src/types';

export async function mockRefresh(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users/refresg`, route => route.fulfill({
        status: 200,
        body: JSON.stringify(getRandomUser())
    }));
}

export async function mockRefreshForUser(page: Page, user: User): Promise<void> {
    await page.route(`${backendUrl}/users/refresh`, route => route.fulfill({
        status: 200,
        body: JSON.stringify(user)
    }));
}