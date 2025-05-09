import Blog from './Blog'

const Blogs = ({ user, handleLogout, handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl, blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>
          log out
        </button>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title:
            <input type="text" name="Title" value={title} onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author:
            <input type="text" name="Author" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            url:
            <input type="text" name="Url" value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div >
    </div >
  )
}

export default Blogs