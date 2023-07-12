import axios from 'axios'
const baseUrl = '/api/blogs'

var token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createNewBlog = async (newBlog) => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog, blogId) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const removeBlog = async (blogId) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, createNewBlog, updateBlog, setToken, removeBlog }