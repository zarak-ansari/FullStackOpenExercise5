import axios from 'axios'
const baseUrl = '/api/blogs'

var token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
} 

const createNewBlog = async (newBlog) => {
  const config = { headers: { Authorization: token }, }
  console.log(token)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNewBlog, setToken }