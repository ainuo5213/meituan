import axios from 'axios'

axios.interceptors.response.use(resp => {
   if (resp.status === 200) {
       return resp.data.data
   } else {

   }
});

export const getData = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url).then(data => {
            resolve(data)
        }).catch(data => {
            reject(data)
        })
    })
};