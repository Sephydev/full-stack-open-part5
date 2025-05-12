import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [message, setMessage] = useState({ message: null, isError: false })
  const [showBlogForm, setShowBlogForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )

    const savedUser = JSON.parse(localStorage.getItem("userBlogListApp"))
    blogService.setToken(savedUser)
    setUser(savedUser)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    loginService.login({ ...credentials }).then(response => {
      setUser(response)
      blogService.setToken(response)
      localStorage.setItem("userBlogListApp", JSON.stringify(response))

      setMessage({ ...message, text: `${credentials.username} successfully logged in` })

      setTimeout(() => {
        setMessage({ ...message, text: null })
      }, 5000)
    }).catch((e) => {
      const error = e.response.data.error

      setMessage({ text: error, isError: true })

      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    })

    setCredentials({ username: '', password: '' })
  }

  const handleLogout = () => {
    localStorage.removeItem("userBlogListApp")
    setUser(null)
  }

  const handleCreateBlog = (newBlog) => {
    blogService.create(newBlog).then(response => {
      setBlogs(blogs.concat(response))
      setShowBlogForm(!showBlogForm)
      setMessage({ ...message, text: `a new blog '${newBlog.title}' by ${newBlog.author} added` })

      setTimeout(() => {
        setMessage({ ...message, text: null })
      }, 5000)
    }).catch((e) => {
      const error = e.response.data.error

      setMessage({ text: error, isError: true })

      setTimeout(() => {
        setMessage({ text: null, isError: false })
      }, 5000)
    })
  }

  const handleLike = (blogToUpdate) => {
    blogToUpdate.likes += 1
    blogService.update(blogToUpdate.id, blogToUpdate).then(response => {
      setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? response : blog))
    })
  }

  if (user !== null) {
    return (<Blogs
      user={user}
      handleLogout={handleLogout}
      handleCreateBlog={handleCreateBlog}
      blogs={blogs}
      message={message}
      showBlogForm={showBlogForm}
      setShowBlogForm={setShowBlogForm}
      handleLike={handleLike}
    />
    )
  }

  return (
    <LoginForm
      handleLogin={handleLogin}
      credentials={credentials}
      setCredentials={setCredentials}
      message={message}
    />
  )
}

export default App