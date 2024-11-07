import axios from "axios";



class PapagoRequester {
  instance = null;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://techtonicsoft.cafe24.com:5000',
      headers: {
        'Content-Type': 'application/json',
      },
      origin: 'https://techtonicsoft.cafe24.com:5000',
      withCredentials: true,
    });
  }

  async post(url, data) {
    let instance = this.instance;
    let result = '';
    try {
      return new Promise(function (resolve, reject) {
        instance.post(url, JSON.stringify(data))
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              }
            }
            // If desired, add more error handling here
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {
      // Handle error
    }
  }



  async translate(data, callback) {
    callback(await this.post('/papago/translate', data));
  }
  async detectLanguage(data, callback) {
    callback(await this.post('/papago/detectLanguage', data));
  }



}

export default PapagoRequester;
