import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [blogContent, setBlogContent] = useState({ title: '', author: '', url: '' })

  const [user, setUser] = useState(null)

  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const [message, setMessage] = useState({ message: null, isError: false })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    const savedUser = JSON.parse(localStorage.getItem("userBlogListApp"))
    setUser(savedUser)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    loginService.login({ ...credentials }).then(response => {
      setUser(response)
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

  const handleCreateBlog = (e) => {
    e.preventDefault()

    const newBlog = { ...blogContent }

    blogService.setToken(user)

    blogService.create(newBlog).then(response => {
      setBlogs(blogs.concat(response))
      setMessage({ ...message, text: `a new blog '${blogContent.title}' by ${blogContent.author} added` })

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

  if (user !== null) {
    return (<Blogs
      user={user}
      handleLogout={handleLogout}
      handleCreateBlog={handleCreateBlog}
      blogContent={blogContent}
      setBlogContent={setBlogContent}
      // title={title}
      // setTitle={setTitle}
      // author={author}
      // setAuthor={setAuthor}
      // url={url}
      // setUrl={setUrl}
      blogs={blogs}
      message={message}
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