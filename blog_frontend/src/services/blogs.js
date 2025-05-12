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

const update = (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog)
  return request.then(response => response.data)
}

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': token } })
}

export default { getAll, setToken, create, update, del }