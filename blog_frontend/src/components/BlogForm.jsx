import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [blogContent, setBlogContent] = useState({ title: '', author: '', url: '' })

  const createBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: blogContent.title,
      author: blogContent.author,
      url: blogContent.url
    }

    setBlogContent({ title: '', author: '', url: '' })
    handleCreateBlog(newBlog)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={blogContent.title}
            onChange={({ target }) => setBlogContent({ ...blogContent, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={blogContent.author}
            onChange={({ target }) => setBlogContent({ ...blogContent, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={blogContent.url}
            onChange={({ target }) => setBlogContent({ ...blogContent, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm