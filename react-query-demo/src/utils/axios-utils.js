import axios from "axios";

// Axios Interceptor...
const client = axios.create({ baseURL: 'http://localhost:4000'})

// Spread operator (...) ka kaam sirf objects ya arrays ka copy banana hota hai, bina original data ko modify kiye.
export const request = ({ ...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = (response) => response
    const onError = (error) => {
        // optionally catch errors and additional logging here
        return error
    }

    return client(options).then(onSuccess).catch(onError)

}