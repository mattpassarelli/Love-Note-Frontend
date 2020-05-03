// let backendHost;
let backendHost;
const hostname = window.location.href

if(hostname.includes('localhost')) {
  backendHost = 'http://127.0.0.1:5000';

} else{
//   backendHost = 'https://api.streamn.live/'
}

const API_ENDPOINT = backendHost;


export {
  API_ENDPOINT,
} 