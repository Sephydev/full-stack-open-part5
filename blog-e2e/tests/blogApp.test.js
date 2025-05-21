const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Sephirah',
        username: 'Sephydev',
        password: 'secret'
      }
    })
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = await page.getByTestId('login-form')

    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Sephydev')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Sephydev successfully logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Sephydev')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})