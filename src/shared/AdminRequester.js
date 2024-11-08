import axios from "axios";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

class AdminRequester {
  instance = null;

  constructor() {
    axios.defaults.withCredentials = true;
    this.instance = axios.create({
      baseURL: "http://localhost:9000/admin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      origin: "http://localhost:9000/",
      withCredentials: true,
      // baseURL: "http://localhost:8080/api",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      // origin: "http://localhost:8080/",
      // withCredentials: true,
    });
  }

  setAuthTokenHeader(token) {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/admin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      origin: "http://localhost:9000/",
      withCredentials: true,
    });
  }

  async get(url, data) {
    let instance = this.instance;
    let result = "";
    let params = "?" + new URLSearchParams(data).toString();
    try {
      return new Promise(function(resolve, reject) {
        instance
          .get(url + params)
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              } else {
              }
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }
  async delete(url, data) {
    let instance = this.instance;
    let result = "";
    let params = "?" + new URLSearchParams(data).toString();
    try {
      return new Promise(function(resolve, reject) {
        instance
          .delete(url + params)
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              } else {
              }
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }

  async post(url, data) {
    let instance = this.instance;
    let result = "";
    try {
      return new Promise(function(resolve, reject) {
        instance
          .post(url, JSON.stringify(data))
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              } else {
              }
            } else if (error.request) {
            } else {
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }
  async getUser(callback) {
    callback(await this.get("auth"));
  }
  async getOrders(data, callback) {
    callback(await this.get("orders", data));
  }
  async getOrderStatus(data, callback) {
    callback(await this.get("orders/status", data));
  }
  async Login(data) {
    await this.post("auth", data);
  }
  async Logout() {
    await this.delete("auth");
  }
  async getProductStatus(callback) {
    callback(await this.get("products/status"));
  }
  async getStatistic(data, callback) {
    callback(await this.get("statistic", data));
  }
  async getLayout(data, callback) {
    callback(await this.get("layout", data));
  }
  async postLayout(data, callback) {
    callback(await this.post("layout", data));
  }
  async deleteLayout(data, callback) {
    callback(await this.delete("layout", data));
  }
}

export default AdminRequester;
