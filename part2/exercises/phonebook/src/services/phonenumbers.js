import axios from 'axios'
const baseUrl = 'https://phonebook-backend-part3.onrender.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('getAll :>>');
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('create');
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('update');
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id, newObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll, create, update, remove}