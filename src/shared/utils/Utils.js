import { getRoles } from "@testing-library/dom";
import _, { groupBy } from "lodash";
import { Buffer } from "buffer";
import imageCompression from 'browser-image-compression';
import { NIL, v4 as uuidv4 } from 'uuid';
import { fileRootPath } from "shared/constants/filePath";
import html2canvas from "html2canvas";
import deepdash from "deepdash";
import { catchClause } from "@babel/types";

deepdash(_);
export const clone = (obj) => (JSON.parse(JSON.stringify(obj)));

export const getUniqColumns = (list, column, seperator) => {
    let combined = "";
    list.map((item) => {
        combined += item[column];
    });
    let combinedList = combined.split(seperator).slice(1,);

    let set = new Set(combinedList);
    let uniqArray = [...set];

    return uniqArray;
};

export const deepFind = (list, columnName, condition) => {
    let result = [];
    _.mapDeep(list, (item, key, parentValue) => {
        if (item && item[columnName] && item[columnName] === condition) {
            let cloneItem = clone(item);
            cloneItem.children = null;
            result.push(cloneItem);
        }
    });
    return result;
}

export const getSpreadArray = (list, column, seperator, defaultValue) => {
    let resultList = [];
    list.map((item) => {
        if (!item[column]) {
            item[column] = seperator + defaultValue;
        }
        let needToSpread = item[column].split(seperator).slice(1,);
        needToSpread.map((splitedValue) => {
            let copiedItem = clone(item);
            copiedItem[column] = splitedValue;
            resultList.push(copiedItem);
        });
    });

    return resultList;
}

export const normalizeArrayHeight = (list, arrayCount) => {
    let lengths = new Array();
    for (let i = 0; i < arrayCount; i++) {
        lengths.push(0);
    }
    let resultArray = new Array();
    for (let i = 0; i < arrayCount; i++) {
        resultArray.push(new Array());
    }
    list.map((group) => {
        let array = [...lengths];
        let minIndex = array.indexOf(Math.min(...array));
        resultArray[minIndex].push(group);
        lengths[minIndex] += group.children.length + 1;

    });

    return resultArray;
}

export const getGroupedList = (list, columnBy, valuesName) => {
    const result = _.chain(list)
        .groupBy(columnBy)
        .map((value, key) => {
            let row = {};
            row[columnBy] = key;
            row[valuesName] = value;
            return row;
        })
        // .map((value, key) => ({ hashTag : key, items : value}))
        .value();

    return result;
}

export const getMultipleGroupedList = (list, columnBy, multipleColumns, valuesName) => {
    const result = _.chain(list)
        .groupBy(columnBy)
        .map((value, key) => {
            let row = {};
            multipleColumns.map((column) => {
                let firstItem = value[0];
                row[column] = firstItem[column];
            });
            if (valuesName) {
                row[valuesName] = value;
            }
            return row;
        })
        // .map((value, key) => ({ hashTag : key, items : value}))
        .value();

    return result;
}

export const rpad = (list, cols, initialData) => {
    let result = clone(list);
    let originLength = list.length;
    let resultLength = Math.ceil(list.length / cols) * cols;
    let needToPad = resultLength - originLength;
    for (let i = 0; i < needToPad; i++) {
        if (initialData) {
            result.push(initialData);
        } else {
            result.push({});
        }

    }

    return result;
}

export const rpad2D = (list, cols, initialData) => {
    var result = new Array(Math.ceil(list.length / cols));
    for (var i = 0; i < result.length; i++) {
        result[i] = new Array();
        for (var j = 0; j < cols; j++) {
            if (initialData) {
                result[i][j] = initialData;
            } else {
                result[i][j] = {};
            }

        }
    }
    for (var i = 0; i < list.length; i++) {
        result[parseInt(i / cols)][i % cols] = list[i];
    }

    return result;
}

export const getRoleFromTokenPayload = (tokenPayload) => {
    var roles = tokenPayload.sub.split(",");
    return roles;
}

export const getTokenPayload = (token) => {
    try {
        var base64Payload = token.split('.')[1];
        // //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE 
        var payload = decode(base64Payload);
        var result = JSON.parse(payload);
        return result;
    } catch (e) {
        return false;
    }
}

export const validateToken = (token) => {
    let isValid = false;
    var base64Payload = token.split('.')[1];
    // //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE 
    var payload = decode(base64Payload);
    var result = JSON.parse(payload);
    return result;
}

export const compressImage = async (image, fileName, maxSizeMb) => {
    let size = maxSizeMb || 0.1;
    try {
        const options = {
            maxSizeMB: 1, // 허용하는 최대 사이즈 지정
            maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
            useWebWorker: true // webworker 사용 여부
        }
        let compressed = await imageCompression(image, options);
        return await new File([compressed], fileName, { type: compressed.type });

    } catch (e) {

    }
}

export const dataURLtoBlob = (dataURL) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURL.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURL.split(',')[1]);
    else
        byteString = unescape(dataURL.split(',')[1]);
    // 마임타입 추출
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}

export const getExtFromFileType = (type) => {
    const parts = type.split('/');
    return parts[parts.length - 1];
};

const getExtFromFileName = (name) => {
    const parts = name.split('.');
    return parts[parts.length - 1];
};

export const getFilePath = (path, file) => {
    let seperator = "";
    let lastCharInPath = path.charAt(path.length - 1);
    if (lastCharInPath === "/") {
        seperator = "";
    } else {
        seperator = "/";
    }
    let filePath = fileRootPath + "/" + path + seperator + file.name;

    return filePath;
}

export const generateFileName = (blob) => {
    let fileExt = getExtFromFileType(blob.type);
    let fileName = uuidv4() + "." + fileExt;

    return fileName;
}

export const createImageFileFromDom = async (domRef) => {
    let result = "";
    try {
        return new Promise(function (resolve, reject) {
            html2canvas(domRef, { backgroundColor: null }).then((blob) => {
                let jsFile = dataURLtoBlob(blob.toDataURL());
                let fileName = generateFileName(jsFile);
                result = new File([jsFile], fileName, { type: jsFile.type });
            }).catch((ex) => {
                result = ex;
            }).finally(() => {
                resolve(result);
            });
        });
    } catch (e) {

    }
}

export const createImageFileFromDataUrl = (dataUrl) => {
    let result = "";
    let jsFile = dataURLtoBlob(dataUrl);
    let fileName = generateFileName(jsFile);
    result = new File([jsFile], fileName, { type: jsFile.type });
    return result;
}



export const getDifference = (a, b) => {
    let result;
    if (a.length > b.length) {
        return _.differenceWith(a, b, _.isEqual);
    } else {
        return _.differenceWith(b, a, _.isEqual);
    }
}

export const flattenTree = (treeData) => {
    let result = [];
    _.mapDeep(treeData, (item, key, parentValue) => {
        if (item && item.id && item.id !== "root") {
            let cloneItem = clone(item);
            cloneItem.children = null;
            result.push(cloneItem);
        }
    });
    return result;
}

export const validateInputs = async (inputs) => {
    return new Promise(async (resolve, reject) => {
        let result = true;
        let index = 0;
        
        for (let i = 0; i < inputs.length; i++) {
            index = i;
            let input = inputs[i];
            

            let validateFn = input.isValid;
            
            let isAsyncFn = validateFn.constructor.name === "AsyncFunction" ? true : false;
            let isValid = false;
            if (isAsyncFn) {
                await validateFn().then((validationResult) => {
                    isValid = validationResult;
                });
            } else {
                isValid = validateFn();
            }
            if (!isValid) {
                input.focus();
                result = false;
                break;
            }
        }
        resolve({ isValid: result, index: index });
    });
}


export const validateInput = async (input) => {
    return new Promise(async (resolve, reject) => {
        let result = true;
        let validateFn = input.isValid;
        let isAsyncFn = validateFn.constructor.name === "AsyncFunction" ? true : false;
        let isValid = false;
        if (isAsyncFn) {
            await validateFn().then((validationResult) => {
                isValid = validationResult;
            });
        } else {
            isValid = validateFn();
        }

        if (!isValid) {
            input.focus();
            result = false;

        }
        resolve(result);
    });
}

export const emptyInputs = async (inputs) => {
    return new Promise(async (resolve, reject) => {
        let result = true;
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let emptyFn = input.empty;
            let isAsyncFn = emptyFn.constructor.name === "AsyncFunction" ? true : false;
            let isEmpty = false;
            if (isAsyncFn) {
                await emptyFn().then((emptyResult) => {
                    isEmpty = emptyResult;
                });
            } else {
                isEmpty = emptyFn();
            }

            if (!isEmpty) {
                input.focus();
                result = false;
                break;
            }
        }
        resolve(result);
    });
}

export const getLocalStorage = (key) => {
    return window.localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
};

export const removeLocalStorage = (key) => {
    window.localStorage.removeItem(key);
}

export const encode = (payload) => {
    let encoded = Buffer.from(payload).toString("base64");
    return encoded;
}

export const decode = (encoded) => {
    let decoded = Buffer.from(encoded, "base64").toString();
    return decoded;
}

export const isEqual = (a, b) => {
    return _.isEqual(a, b);
}

Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

export const getCurrentLanguageCode = () => {
    let fullCode = getLocalStorage("i18nextLng");
    let split = fullCode.split('-')[1];
    if (split) {
        let result = split.charAt(0) + split.charAt(1).toLowerCase();
        return result;
    }


}

export const convertLanguageCode = (value) => {
    let fullCode = value;
    let split = fullCode.split('-')[1];
    // let result = split.charAt(0) + split.charAt(1).toLowerCase();
    return split;
}

export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const between = (x, min, max) => {
    return x >= min && x <= max;
}

export const calculateDeliveryFee = (totalPrice, num) => {
    // let productWeightStandard = 40;
    // let boxWeightStandard = 120;
    // let additionalBoxStandard = 10;

    // let productQuantity = num;
    // let productWeight = productQuantity * productWeightStandard;
    // let additionalBoxQuantity = Math.max(Math.floor((productQuantity - 1) / additionalBoxStandard), 0);
    // let boxWeight = (additionalBoxQuantity + 1) * boxWeightStandard;
    // let totalWeight = productWeight + boxWeight;

    // let deliveryFee = 0;

    // let exchangeRate = 0.0053;
    // if (productQuantity === 0) {
    //     deliveryFee = 0;
    // } else {
    //     if (between(totalWeight, 0, 100)) {
    //         deliveryFee = 4780;
    //     } else if (between(totalWeight, 100, 200)) {
    //         deliveryFee = 6120;
    //     } else if (between(totalWeight, 200, 300)) {
    //         deliveryFee = 7440;
    //     } else if (between(totalWeight, 300, 400)) {
    //         deliveryFee = 8770;
    //     } else if (between(totalWeight, 400, 500)) {
    //         deliveryFee = 10120;
    //     } else if (between(totalWeight, 500, 600)) {
    //         deliveryFee = 11200;
    //     } else if (between(totalWeight, 600, 700)) {
    //         deliveryFee = 12280;
    //     } else if (between(totalWeight, 700, 800)) {
    //         deliveryFee = 13370;
    //     } else if (between(totalWeight, 800, 900)) {
    //         deliveryFee = 14440;
    //     } else if (between(totalWeight, 900, 1000)) {
    //         deliveryFee = 15530;
    //     } else if (between(totalWeight, 1000, 1100)) {
    //         deliveryFee = 16500;
    //     } else if (between(totalWeight, 1100, 1200)) {
    //         deliveryFee = 17460;
    //     } else if (between(totalWeight, 1200, 1300)) {
    //         deliveryFee = 18430;
    //     } else if (between(totalWeight, 1300, 1400)) {
    //         deliveryFee = 19390;
    //     } else if (between(totalWeight, 1400, 1500)) {
    //         deliveryFee = 20400;
    //     } else if (between(totalWeight, 1500, 1600)) {
    //         deliveryFee = 21010;
    //     } else if (between(totalWeight, 1600, 1700)) {
    //         deliveryFee = 21640;
    //     } else if (between(totalWeight, 1700, 1800)) {
    //         deliveryFee = 22260;
    //     } else if (between(totalWeight, 1800, 1900)) {
    //         deliveryFee = 22870;
    //     } else if (between(totalWeight, 1900, 2000)) {
    //         deliveryFee = 23520;
    //     } else if (totalWeight > 2000) {
    //         deliveryFee = 23520;
    //     }
    // }
    // return Math.ceil(deliveryFee * exchangeRate);
    let deliveryFee = 0;

    if (totalPrice >= 50000) {
        deliveryFee = 0;
    } else if (totalPrice == 0) {
        deliveryFee = 0;
    } else {
        deliveryFee = 2500;
    }
    return deliveryFee;
}

export const getDepth = ({ children }) => 1 + (children && children.length > 0 ? Math.max(...children.map(getDepth)) : 0)

export const isBase64 = (str) => {
    if (str) {
        if (str === '' || str.trim() === '') { return false; }
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}

export const addCommas = (number) => {
    if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "";
    }
}


export const intersectionSize = (arr1, arr2) => {
    // arr1과 arr2의 중복된 요소를 찾아낸 후, Set으로 중복 제거
    const intersection = new Set(arr1.filter(element => arr2.includes(element)));

    // Set의 크기를 반환하면 교집합 크기가 됨
    return intersection.size;
}