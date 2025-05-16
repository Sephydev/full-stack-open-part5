import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> call handleCreateBlog with right data', async () => {
  const mockHandleCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreateBlog={mockHandleCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter the title of the blog')
  const authorInput = screen.getByPlaceholderText('Enter the author of the blog')
  const urlInput = screen.getByPlaceholderText('Enter the url of the blog')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Sephydev')
  await user.type(urlInput, 'http://www.test.com/')
  await user.click(createButton)

  expect(mockHandleCreateBlog.mock.calls).toHaveLength(1)
  expect(mockHandleCreateBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(mockHandleCreateBlog.mock.calls[0][0].author).toBe('Sephydev')
  expect(mockHandleCreateBlog.mock.calls[0][0].url).toBe('http://www.test.com/')
})