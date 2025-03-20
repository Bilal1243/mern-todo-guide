import axios from 'axios'

const todoInstance = axios.create({
    baseURL: 'http://localhost:3000/api/todos',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default todoInstance