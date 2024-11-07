import axios from "axios";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

class MedusaRequester {
    instance = null;

    constructor() {
        axios.defaults.withCredentials = true;
        this.instance = axios.create({
            baseURL: "http://localhost:9000/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            origin: "http://localhost:9000/",
            withCredentials: true,
        });
    }

    setAuthTokenHeader(token) {
        this.instance = axios.create({
            baseURL: "http://localhost:9000/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
            origin: "http://localhost:9000/",
            withCredentials: true,
        });
    }

    async get(url) {
        let instance = this.instance;
        let result = "";
        // let params = "?" + new URLSearchParams(data).toString();
        try {
            return new Promise(function (resolve, reject) {
                instance.get(url)
                    // instance.get(url + params)
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
                        }
                        else if (error.request) {
                            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                            // Node.js의 http.ClientRequest 인스턴스입니다.

                        }
                        else {
                            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.

                        }
                    })
                    .finally(() => {
                        resolve(result);
                    });
            });
        } catch (e) {

        }
    }

    async post(url, data) {
        let instance = this.instance;
        let result = "";
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
                            } else {

                            }
                        }
                        else if (error.request) {

                        }
                        else {

                        }

                    })
                    .finally(() => {
                        resolve(result);
                    });
            });
        } catch (e) {

        }
    }

    async put(url, data) {
        let instance = this.instance;
        let result = "";
        try {
            return new Promise(function (resolve, reject) {
                instance.put(url, JSON.stringify(data))
                    .then((res) => {
                        result = res.data;
                    })
                    .catch((ex) => {
                        result = ex;
                    })
                    .finally(() => {
                        resolve(result);
                    });
            });
        } catch (e) {

        }
    }

    async testTossRequest(type, data) {
        const tossPayments = await loadTossPayments(clientKey);
        tossPayments
            .requestPayment(type, {
                // 결제 정보 파라미터
                amount: data.amount,
                orderId: data.orderId,
                orderName: data.orderName,
                customerName: data.customerName,
                successUrl: data.successUrl,
                failUrl: data.failUrl,
                // useInternationalCardOnly: true
            })
            .catch(function (error) {
                if (error.code === 'USER_CANCEL') {
                    // 결제 고객이 결제창을 닫았을 때 에러 처리
                } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드에 대한 에러 처리
                }
            })

    }

    // example ↓
    // async vendorSignUp(data, callback) {
    //     callback(await this.post("admin/vendor/signUp", data));
    // }


    // 두환 ↓
    async getAllProducts(data, callback) {
        callback(await this.get("store/products?expand=variants.prices&expand=events", data));
    }

    async getProductsById(data, callback) {
        callback(await this.get(`store/products/${data}?expand=variants.prices&expand=events&expand=images&expand=categories`, data));
    }

    async getProductsByVariantId(data, callback) {
        callback(await this.get(`store/variants?expand=product&id=${data}`, data));
    }

    async getProductsByTitle(data, callback) {
        callback(await this.get(`store/products?title=${data}`, data));
    }

    async getBestSellerProducts(data, callback) {
        callback(await this.get("store/products?expand=variants.prices&expand=events&limit=4", data));
    }

    async getDiscountsProducts(data, callback) {
        callback(await this.get(`store/discounts?code=${data}&expand=rule.conditions.products.variants.prices`, data));
    }

    async getAllCategories(data, callback) {
        callback(await this.get("store/product-categories", data));
    }

    async getCategoryProductById(data, callback) {
        callback(await this.get(`store/product-categories/${data}?expand=products`, data));
    }

    async customerSignIn(data, callback) {
        callback(await this.post('store/auth', data));
    }

    // 성재 ↓

}

export default MedusaRequester;