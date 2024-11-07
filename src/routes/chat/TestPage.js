import { CButton, CFormInput, CFormSelect, CInputGroup, CListGroup, CListGroupItem } from "@coreui/react";
import { Container } from "@mui/material";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { papagoRequester, requester, techtonicChainRequester } from "App";
import MobileSearchBar11 from "components/MobileSearchBar";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useState } from "react";
import loadZipCodeJp from "./loadZipCodeJp";
import axios from "axios";
import InputText from "components/inputs/InputText";
import CustomButton from "components/buttons/CustomButton";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import FileUpload from "components/inputs/image/FileUpload";



function TestPage() {
    const [zipCode, setZipCode] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [prefectures, setPrefectures] = useState([]);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [newProducts, setNewProducts] = useState();
    const [jsonData, setJsonData] = useState([]);
    const [isMounted, setMounted] = useState(false);

    const [text, setText] = useState();
    const inputRef = useRef();


    useEffect(() => {

        // axios.post('http://localhost:5000/papago/translate', {
        //     source: 'ko',
        //     target: 'en',
        //     text: '안녕하세요'
        // })
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });



        let translateData = { source: "ko", target: "ja", text: "안녕하세요" };
        // papagoRequester.translate(translateData, (result) => {
        //     console.log(result);
        // });
        let detectLangData = { text: "你好" }

        // papagoRequester.detectLanguage(translateData, (result) => {
        //     console.log(result);
        // })
        // let data = {type: 'Transfer', data: {from: "admin", to: "user2", amount: 50}}
        // let data = {type: "Balance", data: "bbb@bbb.com"}
        // let data = {type: "Register", data: "admin"}
        // techtonicChainRequester.userBalance(data, (result) => {
        //     console.log(result);
        // })

        setMounted(true);
        let data = { number: 6 };
        requester.getNewProducts((result) => {
            setNewProducts(result.data);
            console.log(result.data);
        });

    }, [])

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(newProducts);
        console.log(worksheet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        function s2ab(s) {
            const buffer = new ArrayBuffer(s.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buffer;
        }

        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "data.xlsx");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // 첫 번째 시트의 이름을 가져옵니다.
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // 시트를 JSON 형태로 변환합니다.
            const json = XLSX.utils.sheet_to_json(worksheet);
            setJsonData(json);
        };

        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        console.log(text);
    }, [text])

    const onClick = () => {
        setText(inputRef.current.getValue);
    }

    return (
        <Container>
            <Container maxWidth={1200}>
                <VerticalFlex gap={30}>

                    <FlexChild>
                        <P>해당 버튼을 누르면 엑셀 다운로드</P>
                        <CustomButton text={"엑셀 다운로드"} onClick={exportToExcel} />
                    </FlexChild>
                    <FlexChild>
                        <input type="file" onChange={handleFileUpload} />
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre> {/* JSON 데이터 출력 */}
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <FlexChild>
                                <InputText ref={inputRef} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>

                    </FlexChild>
                    <FlexChild>
                        <CustomButton onClick={onClick} text={"번역"} />
                    </FlexChild>
                </VerticalFlex>
            </Container>
        </Container>

    );


    // useEffect(() => {
    //     let isMounted = true;
    //     loadZipCodeJp().then((ZipCodeJp) => {
    //         if (isMounted) {
    //             window.ZipCodeJp = ZipCodeJp;
    //             ZipCodeJp.getPrefectures((err, data) => {
    //                 if (err) {
    //                     console.error(err);
    //                 } else {
    //                     console.log(data);
    //                     setPrefectures(data);

    //                 }
    //             });
    //         }
    //     });


    //     return () => {
    //         isMounted = false;
    //         delete window.ZipCodeJp;
    //     };
    // }, []);

    // const searchAddress = () => {
    //     window.ZipCodeJp.getAddressesOfZipCode(zipCode, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             console.log(data);
    //             setAddresses(data);
    //             setSelectedPrefecture(data[0].prefecture_name);
    //             setSelectedCity(data[0].city_name);
    //             setSelectedTown(data[0].town_name);
    //         }
    //     });
    // };
    // const handlePrefectureChange = (e) => {
    //     const prefecturesCode = e.target.value;
    //     console.log(prefecturesCode);
    //     if (!prefecturesCode) {
    //         setCities([]);
    //         setTowns([]);
    //         return;
    //     }
    //     window.ZipCodeJp.getCitiesOfPrefecture(prefecturesCode, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             console.log(data);
    //             setCities(data);
    //             setTowns([]);

    //         }
    //     })

    // };
    // const handleCityChange = (e) => {
    //     const cityCode = e.target.value;
    //     console.log(cityCode)
    //     if (!cityCode) {
    //         setTowns([]);
    //         return;
    //     }
    //     window.ZipCodeJp.getTownsOfCity(cityCode, (err, data) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(data);
    //             console.log(e.target);
    //             setTowns(data);

    //         }
    //     })
    // }
    // const handleTownChange = (e) => {
    //     console.log(e.target.value);
    //     setZipCode(e.target.value);

    //     window.ZipCodeJp.getAddressesOfZipCode(e.target.value, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             console.log(data);
    //             // setAddresses(data);
    //             setSelectedPrefecture(data[0].prefecture_name);
    //             setSelectedCity(data[0].city_name);
    //             setSelectedTown(data[0].town_name);
    //         }
    //     });
    // }


    // return (
    //     <VerticalFlex gap={50}>
    //         <FlexChild width={"50%"}>
    //             <CInputGroup>
    //                 <CFormInput
    //                     type="text"
    //                     size="10"
    //                     value={zipCode}
    //                     onChange={(e) => setZipCode(e.target.value)}
    //                 />
    //                 <CButton onClick={searchAddress}>search address</CButton>
    //             </CInputGroup>
    //             <CListGroup>
    //                 {addresses.map((address, i) => (
    //                     <CListGroupItem key={i}>{JSON.stringify(address)}</CListGroupItem>
    //                 ))}
    //             </CListGroup>
    //         </FlexChild>
    //         <FlexChild width={"50%"}>
    //             <CFormSelect onChange={handlePrefectureChange}>
    //                 <option value={""}>Select Prefecture</option>
    //                 {prefectures.length > 0
    //                     &&
    //                     prefectures.map((city) => (
    //                         <option key={city.prefecture_jis_code} value={city.prefecture_jis_code
    //                             && city.prefecture_jis_code
    //                                 .toString()}>
    //                             {city.prefecture_name}
    //                         </option>
    //                     ))}
    //             </CFormSelect>
    //         </FlexChild>
    //         <FlexChild width={"50%"}>
    //             <CFormSelect onChange={handleCityChange} >
    //                 <option value={""}>Select City</option>
    //                 {cities.length > 0
    //                     &&
    //                     cities.map((city) => (
    //                         <option key={city.city_jis_code} value={city.city_jis_code
    //                             && city.city_jis_code
    //                                 .toString()}>
    //                             {city.city_name}
    //                         </option>
    //                     ))}
    //             </CFormSelect>
    //         </FlexChild>
    //         <FlexChild width={"50%"}>
    //             <CFormSelect onChange={handleTownChange}>
    //                 <option value={""}>Select Town</option>
    //                 {towns.length > 0
    //                     &&
    //                     towns.map((town, index) => (
    //                         <option key={index} value={town.zip_code ? town.zip_code.toString() : ""}>
    //                             {town.town_name}
    //                         </option>
    //                     ))}
    //             </CFormSelect>
    //         </FlexChild>


    //         <FlexChild width={"20%"}>
    //             <CFormInput
    //                 type="text"
    //                 size="10"
    //                 value={zipCode}
    //                 readOnly
    //                 disabled
    //             />
    //         </FlexChild>
    //         <FlexChild></FlexChild>


    //         <FlexChild width={"70%"}>
    //             <HorizontalFlex>
    //                 <FlexChild>
    //                     <CFormInput
    //                         type="text"
    //                         size="10"
    //                         value={selectedPrefecture}
    //                         onChange={(e) => setZipCode(e.target.value)}
    //                     />
    //                 </FlexChild>
    //                 <FlexChild>
    //                     <CFormInput
    //                         type="text"
    //                         size="10"
    //                         value={selectedCity}
    //                         onChange={(e) => setZipCode(e.target.value)}
    //                     />
    //                 </FlexChild>
    //                 <FlexChild>
    //                     <CFormInput
    //                         type="text"
    //                         size="10"
    //                         value={selectedTown}
    //                         onChange={(e) => setZipCode(e.target.value)}
    //                     />
    //                 </FlexChild>
    //             </HorizontalFlex>
    //         </FlexChild>
    //         <FlexChild width={"70%"}>
    //             <CFormInput
    //                 type="text"
    //                 size="10"
    //                 placeholder="나머지 주소"
    //             />
    //         </FlexChild>
    //     </VerticalFlex>
    // );

}


export default TestPage;

