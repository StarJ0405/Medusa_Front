import Center from 'layouts/wrapper/Center';
import { useState } from 'react';
import ReactLoading from 'react-loading';

function Loading(props) {
    const { isLoading } = props;

    return (
        <>
            {
                isLoading &&
                <div style={{ width: "100px", height: "100px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" , zIndex:20000}}>
                    <Center>
                        <ReactLoading type={"spin"} color="var(--main-color)" />
                    </Center>
            </div>
                // <div style={{ width: "100vw", height: "100vh", backgroundColor: "#00000050", position: "absolute", zIndex: 10003 }}>
                //     <div style={{ width: "100px", height: "100px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                //         <Center>
                //             <ReactLoading type={"spin"} color="var(--main-color)" />
                //         </Center>
                //     </div>
                // </div>
            }
        </>
    );
}

export default Loading;