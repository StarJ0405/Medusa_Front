import CustomButton from "components/buttons/CustomButton";
import style from "./ExcelUploadButton.module.css";
import excelIcon from "resources/img/excelIcon.png";
import * as XLSX from 'xlsx';
import { useEffect, useRef, useState } from "react";
import FlexChild from "layouts/flex/FlexChild";
import Home from "routes/front/main/Home";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { requester } from "App";
import { toast } from "react-toastify";

function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const processedData = jsonData.map(row => ({
                id: row["상품ID"],
                quantity: row["수량"]
            }));

            resolve(processedData);
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);
    });
}

// 엑셀 업로드 버튼 컴포넌트
function ExcelUploadButton() {
    const fileInputRef = useRef();
    const [processedData, setProcessedData] = useState([]);
    const [fileName, setFileName] = useState(""); // 파일 이름 상태

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // 파일 이름 설정
            const data = await readExcelFile(file);
            setProcessedData(data);
        }
    };

    const onBulkUpdateClick = () => {
        if (processedData.length > 0) {
            requester.updateBulkProducts(processedData, (result) => {
                if (result.code === 0) {
                    setProcessedData([]);
                    setFileName(""); // 파일 이름 초기화
                    toast.success("데이터가 성공적으로 업데이트되었습니다.", {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            });
        } else {
            toast.error("엑셀 파일을 업로드해주세요");
        }
    };

    return (
        <FlexChild>
            <HorizontalFlex>
                <FlexChild>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </FlexChild>
                <FlexChild>
                    <CustomButton onClick={onBulkUpdateClick} text={"수정하기"} />
                </FlexChild>
            </HorizontalFlex>
        </FlexChild>
    );
}

export default ExcelUploadButton;