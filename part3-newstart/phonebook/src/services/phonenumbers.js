import axios from 'axios'
const baseUrl = 'https://phonebook-backend-part3.onrender.com/api/persons'
//its on babbyyyy


const getAll = () => {
    console.log('getAll :>>');
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    console.log('create, from axios');
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('update, from axios');
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id, newObject) => {
    console.log('remove, from axios')
    const request = axios.delete(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const numbersService = { getAll, create, update, remove}
export default numbersService

 //ao menos eu descobri que é um erro do meu react, agora o que exatamente?