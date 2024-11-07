import CustomButton from "components/buttons/CustomButton";
import excelIcon from "resources/img/excelIcon.png";
import style from "./ExcelDownloadButton.module.css";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

function ExcelDownloadButton(props) {
    const {header, list, fileName} = props;
    // const exportToExcel = () => {
    //     let array = new Array();
    //     list.map((row, index) => {
    //         let obj = {};
    //         header.map((headerCol) => {
    //             obj[headerCol.text] = row[headerCol.code];
    //         })
    //         array.push(obj);
    //     })
    //     const worksheet = XLSX.utils.json_to_sheet(array);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    //     function s2ab(s) {
    //         const buffer = new ArrayBuffer(s.length);
    //         const view = new Uint8Array(buffer);
    //         for (let i = 0; i < s.length; i++) {
                
    //             view[i] = s.charCodeAt(i) & 0xFF;
    //         }
    //         return buffer;
    //     }

    //     saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fileName}_${getToday()}.xlsx`);
    // };

    const exportToExcel = () => {
      let array = [];
      list.forEach((row) => {
        if (Array.isArray(row.orderProducts) && row.orderProducts.length > 0) {
          // orderProducts 배열의 첫 번째 상품에 대한 정보를 주문 정보에 추가
          let firstProduct = row.orderProducts[0];
          let baseObj = {};
          header.forEach((headerCol) => {
            if (headerCol.code) {
              baseObj[headerCol.text] = row[headerCol.code] !== undefined ? row[headerCol.code] : '';
            }
            if (headerCol.code === 'orderProducts') {
              baseObj['상품명'] = `${firstProduct.product.brandTitle} ${firstProduct.product.title}`;
              baseObj['수량'] = firstProduct.quantity !== undefined ? firstProduct.quantity : '';
            }
          });
          array.push(baseObj);
    
          // orderProducts 배열의 나머지 상품들에 대한 정보를 별도의 행으로 추가
          row.orderProducts.slice(1).forEach((product) => {
            let productObj = {};
            header.forEach((headerCol) => {
              if (headerCol.code === 'orderProducts') {
                productObj['상품명'] = `${product.product.brandTitle} ${product.product.title}`;
                productObj['수량'] = product.quantity !== undefined ? product.quantity : '';
              } else {
                productObj[headerCol.text] = row[headerCol.code] !== undefined ? row[headerCol.code] : '';
              }
            });
            array.push(productObj);
          });
        } else {
          // orderProducts 배열이 없는 경우는 기존 로우 정보를 그대로 사용합니다.
          let obj = {};
          header.forEach((headerCol) => {
            obj[headerCol.text] = row[headerCol.code] !== undefined ? row[headerCol.code] : '';
          });
          array.push(obj);
        }
      });
    
      
        // 변환된 배열을 이용하여 엑셀 파일을 생성합니다.
        const worksheet = XLSX.utils.json_to_sheet(array);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      
        // 이진 데이터를 Blob으로 변환하는 함수입니다.
        function s2ab(s) {
            const buffer = new ArrayBuffer(s.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buffer;
        }
      
        // Blob을 이용하여 사용자가 파일을 다운로드 할 수 있게 합니다.
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fileName}_${getToday()}.xlsx`);
      };



    const getToday = () => {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

    return (
        <CustomButton text={"엑셀 다운로드"} className={style.button} icon={<img src={excelIcon} />} onClick={exportToExcel}/>
    );
}

export default ExcelDownloadButton;


// 리스트 그대로 출력하기
// function ExcelDownloadButton(props) {
//     const {list, fileName} = props;

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(list);
//         console.log(worksheet);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//         const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

//         function s2ab(s) {
//             const buffer = new ArrayBuffer(s.length);
//             const view = new Uint8Array(buffer);
//             for (let i = 0; i < s.length; i++) {
//                 view[i] = s.charCodeAt(i) & 0xFF;
//             }
//             return buffer;
//         }

//         saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fileName}_${getToday()}.xlsx`);
//     };

//     const getToday = () => {
//         var date = new Date();
//         var year = date.getFullYear();
//         var month = ("0" + (1 + date.getMonth())).slice(-2);
//         var day = ("0" + date.getDate()).slice(-2);
    
//         return year + "-" + month + "-" + day;
//     }

//     return (
//         <CustomButton text={"엑셀 다운로드"} className={style.button} icon={<img src={excelIcon} />} onClick={exportToExcel}/>
//     );
// }

