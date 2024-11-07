import { useEffect, useRef } from "react";
import style from "./Parallax.module.css"

function Parallax(props) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;

        const handleScroll = () => {
            const containerTop = container.getBoundingClientRect().top;
            const imageTop = image.getBoundingClientRect().top;
            const offset = (imageTop - containerTop) / 5; // 속도 조절을 위해 숫자 조정

            image.style.transform = `translateY(${offset}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={style.parallaxContainer} ref={containerRef}>
            <div className={style.parallaxImage} ref={imageRef} style={{ backgroundImage: `url(${props.imageSrc})` }} />
            <div className={style.parallaxText}>
                <h1>{props.title}</h1>
                <p>{props.subtitle}</p>
            </div>
        </div>
    );
}

export default Parallax;