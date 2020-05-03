let backendHost;
let IS_LOCAL;

const hostname = window.location.href

if(hostname.includes('localhost')) {
  backendHost = 'http://127.0.0.1:5000/';
  IS_LOCAL = true;

} else{
  backendHost = 'https://love-note-backend.herokuapp.com/'
  IS_LOCAL = false;
}

const API_ENDPOINT = backendHost;


export {
  API_ENDPOINT,
  IS_LOCAL
} 