const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Sephirah',
        username: 'Sephydev',
        password: 'secret'
      }
    })
    await request.post('http://localhost:3001/api.users', {
      data: {
        name: 'admin',
        username: 'admin',
        password: 'secret'
      }
    })

    await page.goto('http://localhost:5173')
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

  describe('Blog', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('Sephydev')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByTestId('blog-title').fill('Test Blog 1')
      await page.getByTestId('blog-author').fill('Sephydev')
      await page.getByTestId('blog-url').fill('http://www.test.com/1')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('can be deleted by the user who created it', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByTestId('Test Blog 1')).not.toBeVisible()
    })

    test('delete button is not visible by users who does\'t create the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'log out' }).click()

      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByTestId('Test Blog 1').getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
  })
})