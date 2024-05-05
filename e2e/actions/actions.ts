import { Page } from '@playwright/test';
import { Roles } from '../../src/types';

export async function selectRoles(page: Page, roles: Roles[]): Promise<void> {
    for (const role of roles) {
        await page.check(`input[name="${role}"]`);
    }
}