import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> initially render only title and author', () => {
  const blog = {
    title: 'Test Title',
    author: 'Sephydev',
    url: 'http://www.test.com/',
    likes: 0,
    user: {
      username: 'Sephydev',
    }
  }

  const mockUser = vi.fn()

  render(<Blog blog={blog} user={mockUser} />)

  const element = screen.getByText(/Test Title/)

  expect(element).toBeDefined()
  expect(element).toHaveTextContent(blog.author)
  expect(element).not.toHaveTextContent(blog.url)
  expect(element).not.toHaveTextContent(blog.likes)
})

test('<Blog /> show URL and Like when show button is clicked', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Sephydev',
    url: 'http://www.test.com/',
    likes: 0,
    user: {
      username: 'Sephydev'
    }
  }

  const user = userEvent.setup()

  const mockUser = vi.fn()

  render(<Blog blog={blog} user={mockUser} />)

  const element = screen.getByText(/Test Title/)
  const viewButton = screen.getByText('view')

  await user.click(viewButton)

  expect(element).toHaveTextContent(blog.url)
  expect(element).toHaveTextContent(blog.likes)
})