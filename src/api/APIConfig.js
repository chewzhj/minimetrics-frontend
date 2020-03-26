import axios from 'axios'

export default axios.create({
  baseURL: "http://localhost:8080/api/",
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Authorization': "00000000-0000-0000-0000-000000000000",
    // 'X-Authorization': sessionStorage.getItem('sessionKey'),
  }
})
