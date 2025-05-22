const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

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
    await request.post('http://localhost:3001/api/users', {
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
      await helper.login(page, 'Sephydev', 'secret')

      await expect(page.getByText('Sephydev successfully logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.login(page, 'Sephydev', 'wrong')

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('Blog', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page, 'Sephydev', 'secret')

      await helper.createBlog(page, 'Test Blog 1', 'Sephydev', 'http://www.test.com/1')

      await helper.createBlog(page, 'Test Blog 2', 'Sephydev', 'http://www.test.com/2')

      await helper.createBlog(page, 'Test Blog 3', 'Sephydev', 'http://www.test.com/3')
    })

    test('can be liked', async ({ page }) => {
      await page.getByTestId('Test Blog 1').getByRole('button', { name: 'view' }).click()
      await page.getByTestId('Test Blog 1').getByRole('button', { name: 'like' }).click()

      await expect(page.getByTestId('Test Blog 1').getByText('likes 1')).toBeVisible()
    })

    test('can be deleted by the user who created it', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByTestId('Test Blog 1').getByRole('button', { name: 'delete' }).click()

      await expect(page.getByTestId('Test Blog 1')).not.toBeVisible()
    })

    test('delete button is not visible by users who does\'t create the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'log out' }).click()

      await helper.login(page, 'admin', 'secret')

      await expect(page.getByTestId('Test Blog 1').getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test('are sorted by likes. Most likes first', async ({ page }) => {
      await page.getByTestId('Test Blog 2').getByRole('button', { name: 'like' }).click()
      await page.getByTestId('Test Blog 2').getByRole('button', { name: 'like' }).click()

      await page.getByTestId('Test Blog 3').getByRole('button', { name: 'like' }).click()

      await page.reload()

      await page.getByText('Test Blog 1').waitFor()

      const test = await page.getByTestId(/Test Blog/).all()

      await expect(test[0]).toHaveText(/Test Blog 2/)
      await expect(test[2]).toHaveText(/Test Blog 1/)
    })
  })
})