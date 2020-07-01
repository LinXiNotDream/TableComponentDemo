import axios from 'axios'

// 设置baseURL，判断当前环境是否为生产环境，若不是需设置自己的apiURL
let baseURL = process.env.NODE_ENV !== 'production' ? 'http://csra.adl.io/' : '/'
let config = {
  baseURL,
  timeout: 60 * 1000 // 请求超时时间
}

const _axios = axios.create(config)

// http request 拦截器
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config)
    config.headers.authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC91c2VyXC9yYW5nZS11c2VyXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTkzNTcwOTEzLCJleHAiOjE1OTM3ODY5MTMsIm5iZiI6MTU5MzU3MDkxMywianRpIjoiTmRyQWRXd1lqOXZtWGhXSCIsInN1YiI6NSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImxvZ2luX3Rva2VuIjoiMmJlZTg4YTFmNDAxOThkNjdiZjViYjE5M2I2OTY3YmUiLCJndWFyZCI6InVzZXIifQ.FWqvo45bf_FKN0eTZ3MlBST43OhRNCoA1PIjXcXyfGc'
    return config
  },
  function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// http response 拦截器
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log(response)
    return response.data
  },
  function (error) {
    // Do something with response error
    console.log(error)
    return Promise.reject(error)
  }
)

// 二次封装方法
/**
 * 接收三个参数，配置参数config可不传
 * @param {String} url 
 * @param {Object} data 
 * @param {Object} config 
 */
const getFn = async (url, data, config = {}) => {
  let params = { params: data, ...config }
  try {
    return _axios.get(url, params)
  } catch (error) {
    return handleError(error)
  }
}
/**
 * 接收三个参数，配置参数config可不传
 * @param {String} url 
 * @param {Object} data 
 * @param {Object} config 
 */
const postFn = async (url, data, config = {}) => {
  try {
    return _axios.post(url, data, config)
  } catch (error) {
    return handleError(error)
  }
}
const deleteFn = async (url, data) => {
  try {
    return _axios.delete(url, data)
  } catch (error) {
    return handleError(error)
  }
}
// 捕获请求错误
function handleError(error) {
  Promise.reject(error)
}

export default {
  get: getFn,
  post: postFn,
  delete: deleteFn
}
