import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (user) => {
  token = `Bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: { 'Authorization': token } })
  return request.then(response => response.data)
}

export default { getAll, setToken, create }