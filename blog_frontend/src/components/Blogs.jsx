import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'

const Blogs = ({ user, handleLogout, handleCreateBlog, blogContent, setBlogContent, blogs, message, showBlogForm, setShowBlogForm }) => {
  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <div>
        {showBlogForm ?
          <div>
            <BlogForm
              handleCreateBlog={handleCreateBlog}
              blogContent={blogContent}
              setBlogContent={setBlogContent}
            />
            <button onClick={() => setShowBlogForm(!showBlogForm)}>cancel</button>
          </div>
          :
          <button onClick={() => setShowBlogForm(!showBlogForm)}>new note</button>
        }
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