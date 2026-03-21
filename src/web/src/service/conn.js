import axios from "axios"
const ConnApi = axios.create({
    //LOCALHOST
    baseURL: "http://localhost:3333"
    
})
export default ConnApi