import axios from 'axios';

const chatServiceApi=axios.create({
    baseURL:'http:localhost:8000'
})