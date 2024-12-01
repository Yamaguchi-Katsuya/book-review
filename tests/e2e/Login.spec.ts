import { GetUserApiResponse, LoginApiResponse } from '@/types/user';
import { test, expect } from '@playwright/test';

test.describe('ログインページ 表示テスト', () => {
  test('ログインページが表示されている', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('Emailフィールドが表示されている', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[id="email"]')).toBeVisible();
  });

  test('Passwordフィールドが表示されている', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[id="password"]')).toBeVisible();
  });

  test('Loginボタンが表示されている', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('正常な入力値でログインボタンをクリックすると、トップページにリダイレクトされる', async ({
    page,
  }) => {
    const mockLoginResponse: LoginApiResponse = {
      token: 'sampleToken',
    };
    const mockGetUserResponse: GetUserApiResponse = {
      name: 'sampleUser',
      iconUrl: 'https://example.com/icon.png',
    };

    await page.route('**/signin', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockLoginResponse),
      });
    });
    await page.route('**/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGetUserResponse),
      });
    });

    await page.goto('http://localhost:5173/login');
    await page.waitForSelector('input[id="email"]');
    await page.locator('input[id="email"]').fill('test@example.com');
    await page.locator('input[id="password"]').fill('password');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });
});

test.describe('ログインページ 入力テスト', () => {
  test('Emailフィールドの入力値が空の場合、必須エラーが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');
    await page.locator('input[id="email"]').fill('');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('p[id="emailError"]')).toHaveText(
      'メールアドレスは必須です。'
    );
  });

  test('Emailフィールドの入力値が不正な場合、不正エラーが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');
    await page.locator('input[id="email"]').fill('invalid-email');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('p[id="emailError"]')).toHaveText(
      'メールアドレスが不正です'
    );
  });

  test('Passwordフィールドの入力値が空の場合、必須エラーが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');
    await page.locator('input[id="password"]').fill('');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('p[id="passwordError"]')).toHaveText(
      'パスワードは必須です。'
    );
  });

  test('Passwordフィールドの入力値が8文字未満の場合、短いエラーが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');
    await page.locator('input[id="password"]').fill('short');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('p[id="passwordError"]')).toHaveText(
      'パスワードは8文字以上で入力してください'
    );
  });
});
