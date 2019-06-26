import axios from 'axios';

export default axios.create({
    baseURL : 'https://foxedo.herokuapp.com/api',
})