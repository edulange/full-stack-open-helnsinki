import axios from 'axios'
const baseUrl = 'https://backend-separeted.onrender.com/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
  }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(reseponse => reseponse.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(reseponse => reseponse.data)
}

export default {
    getAll, // poderia ser getAll: getAll,
    create, // poderia ser create: create,
    update // poderia ser update: update,
}