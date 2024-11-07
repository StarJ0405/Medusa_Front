import axios from "axios";
import { items, categories } from "InitialData/Items";
import { listData } from "InitialData/accounts/navBoxData";


class FileRequester {
    instance = null;

    constructor() {
        this.instance = axios.create({
            baseURL: "http://worldintrest1.cafe24.com:8090/file",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    }

    async upload(data) {
        try {
            let promise = new Promise((resolve, reject) => {
                let result = "";
                this.instance
                    .post("upload", data)
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
            let result = await promise;
            return result;
        } catch (e) {
            
        }
    }

}

export default FileRequester;
