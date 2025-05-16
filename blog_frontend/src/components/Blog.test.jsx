import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, vi } from 'vitest'

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

  screen.debug()

  expect(element).toBeDefined()
  expect(element).toHaveTextContent(blog.author)
  expect(element).not.toHaveTextContent(blog.url)
  expect(element).not.toHaveTextContent(blog.likes)
})