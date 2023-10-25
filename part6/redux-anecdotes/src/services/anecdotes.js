import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => Number(100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data;

  anecdote.votes += 1;

  const updatedResponse = await axios.put(`${baseUrl}/${id}`, anecdote)
  return updatedResponse.data;
}

// eslint-disable-next-line
export default { getAll, createNew, updateVote }
