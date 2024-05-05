import { Page } from '@playwright/test';
import users from './json/users.json'
import { backendUrl } from '../config/constants';

export async function mockUsers(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users`, route => route.fulfill({
        status: 200,
        body: JSON.stringify(users)
    }));
}