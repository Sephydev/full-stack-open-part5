import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'

const Blogs = ({ user, handleLogout, handleCreateBlog, blogContent, setBlogContent, blogs, message }) => {
  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <div>
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          blogContent={blogContent}
          setBlogContent={setBlogContent}
        />
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