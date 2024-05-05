import { test, expect } from '@playwright/test';
import { failedRegisterMessage, mockFailedSignup, mockSuccessfulSignup } from '../mocks/register.mock'
import { getRandomUser } from '../generator/userGenerator';
import { selectRoles } from '../actions/actions';
import { mockLogout } from '../mocks/logout.mock';

test.describe('Register', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8081/register');
        await mockLogout(page);
    });

    test('successful registration', async ({ page }) => {
        // given
        await mockSuccessfulSignup(page);
        const user = getRandomUser()

        // when
        await page.fill('#firstName', user.firstName);
        await page.fill('#lastName', user.lastName);
        await page.fill('#username', user.username);
        await page.fill('#password', user.password as string);
        await page.fill('#email', user.email);
        await selectRoles(page, user.roles);
        await page.click('button[type="submit"]');

        // then
        await expect(page).toHaveURL(/login/);
    });

    test('failed registration', async ({ page }) => {
        // given
        await mockFailedSignup(page);
        const user = getRandomUser()

        // when
        await page.fill('#firstName', user.firstName);
        await page.fill('#lastName', user.lastName);
        await page.fill('#username', user.username);
        await page.fill('#password', user.password as string);
        await page.fill('#email', user.email);
        await selectRoles(page, user.roles);
        await page.click('button[type="submit"]');

        // then
        await expect(page.locator('.MuiAlert-message')).toHaveText(failedRegisterMessage);
        await expect(page).toHaveURL(/register/);
    });
});