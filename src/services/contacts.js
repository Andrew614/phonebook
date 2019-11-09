import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newContact) => {
    axios.put(`${baseUrl}/${id}`, newContact)
}

export default { getAll, create, destroy, update }