import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState({ message: null, isError: false })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userBlogListApp"))

    setUser(savedUser)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    loginService.login({ username, password }).then(response => {
      setUser(response)
      localStorage.setItem("userBlogListApp", JSON.stringify(response))

      setMessage({ text: `${username} successfully logged in`, isError: false })

      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    }).catch((e) => {
      const error = e.response.data.error

      setMessage({ text: error, isError: true })

      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    })

    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem("userBlogListApp")
    setUser(null)
  }

  const handleCreateBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    blogService.setToken(user)

    blogService.create(newBlog).then(response => {
      setBlogs(blogs.concat(response))
      setMessage({ text: `a new blog '${response.title}' by ${response.author} added`, isError: false })

      setTimeout(() => {
        setSuccessMessage({ text: null, isError: false })
      }, 5000)
    }).catch((e) => {
      const error = e.response.data.error

      setMessage({ text: error, isError: true })

      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    })
  }

  const messageStyle = {
    borderStyle: "solid",
    borderColor: message.isError ? "red" : "green",
    borderRadius: 5,
    backgroundColor: message.isError ? "lightgray" : "lightgreen",
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    color: message.isError ? "red" : "green"
  }

  if (user !== null) {
    return (
      <div>
        {message.text ?
          <p style={messageStyle}>{message.text}</p>
          :
          null
        }
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

  return (
    <div>
      {message.text ?
        <p style={messageStyle}>{message.text}</p>
        :
        null
      }
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default App