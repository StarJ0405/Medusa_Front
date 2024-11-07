import { useEffect, useState } from "react";
import style from "./StarRate.module.css"

function StarRate (props) {
    const AVR_RATE = props.score ? props.score * 14 : 0;
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 75) / 75;
        let idx = 0;
        while (starVerScore > 14) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };
    useEffect(() => {
        setRatesResArr(calcStarRates);
    }, [])




    return(
        <div className={style.wrap}>
            {STAR_IDX_ARR.map((item, idx) => {
                return <span className='star_icon' key={`${item}_${idx}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 14 13' fill='#cacaca'>
                        <clipPath id={`${item}StarClip`}>
                            <rect width={`${ratesResArr[idx]}`} height='15' />
                        </clipPath>
                        <path
                            id={`${item}Star`}
                            d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                            transform='translate(-2 -2)'
                        />
                        <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='var(--main-color)'
                        />
                    </svg>
                </span>
            })
            }
        </div>
    );
}

export default StarRate;