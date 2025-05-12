import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>view</button>
        <button onClick={() => handleLike(blog)}>like</button>
        {user.username === blog.user.username
          ? <button onClick={() => handleDelete(blog)}>delete</button>
          : null
        }
        {showDetails ?
          <div>
            {blog.url}<br />
            likes {blog.likes}<br />
            {blog.user.name}
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

export default Blog