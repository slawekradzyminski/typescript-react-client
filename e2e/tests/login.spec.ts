import { test, expect } from '@playwright/test';
import { mockLogout } from '../mocks/logout.mock';
import { mockUsers } from '../mocks/getUsers.mock';
import { failedLoginMessage, mockFailedLogin, mockSuccessfulLoginForUser } from '../mocks/login.mock';
import { getRandomUser } from '../generator/userGenerator';
import { mockRefreshForUser } from '../mocks/refresh.mock';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogout(page);
    await page.goto('http://localhost:8081/login');
  });

  test('successful login', async ({ page }) => {
    // given
    const user = getRandomUser();
    await mockSuccessfulLoginForUser(page, user);
    await mockRefreshForUser(page, user);
    await page.fill('#username', user.username);
    await page.fill('#password', user.password as string);

    // when
    await page.click('button[type="submit"]');

    // then
    await expect(page.locator('h1')).toContainText(user.firstName);
  });

  test('failed login', async ({ page }) => {
    // given
    await mockFailedLogin(page)
    await page.fill('#username', 'wrong')
    await page.fill('#password', 'wrong')

    // when
    await page.click('button[type="submit"]')

    // then
    await expect(page.locator('.MuiAlert-message')).toHaveText(failedLoginMessage);
  });
});