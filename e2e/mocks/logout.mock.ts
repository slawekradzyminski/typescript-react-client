import { Page } from '@playwright/test';
import { backendUrl } from '../config/constants';

export async function mockLogout(page: Page): Promise<void> {
    await page.route(`${backendUrl}/users/logout`, route => route.fulfill({
        status: 200
    }));
}