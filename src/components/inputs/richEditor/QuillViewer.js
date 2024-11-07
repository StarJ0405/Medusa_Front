import ReactQuill, { Quill } from "react-quill";

function QuillViewer(props){
    return (
        <ReactQuill value={props.value} readOnly={true} theme={"bubble"} />
    );
}

export default QuillViewer;