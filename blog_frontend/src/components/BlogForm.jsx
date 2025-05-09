const BlogForm = ({ handleCreateBlog, blogContent, setBlogContent }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
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