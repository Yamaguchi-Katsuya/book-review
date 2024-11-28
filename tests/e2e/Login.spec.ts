import { test, expect } from '@playwright/test'

test('ログインページが表示されている', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
})

test('Emailフィールドが表示されている', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await expect(page.locator('input[id="email"]')).toBeVisible()
})

test('Passwordフィールドが表示されている', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await expect(page.locator('input[id="password"]')).toBeVisible()
})

test('Loginボタンが表示されている', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await expect(page.locator('button[type="submit"]')).toBeVisible()
})

test('Emailフィールドの入力値に不備がある場合、エラーが表示される', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/login')
  await page.locator('input[id="email"]').fill('invalid-email')
  await expect(page.locator('p[id="emailError"]')).toHaveText(
    'メールアドレスが不正です'
  )
})

test('Passwordフィールドの入力値に不備がある場合、エラーが表示される', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/login')
  await page.locator('input[id="password"]').fill('short')
  await expect(page.locator('p[id="passwordError"]')).toHaveText(
    'パスワードは8文字以上で入力してください'
  )
})
