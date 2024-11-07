import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "./DraftEditor.module.css";
import { useState, useCallback, useEffect } from "react";
import draftToHtml from 'draftjs-to-html';
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";

function DraftEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };
    
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    return (
        <HorizontalFlex flexStart={true}>
            <FlexChild>
                <div className={style.pure}>

                
                <Editor
                    toolbarClassName={style.toolbar}
                    wrapperClassName={style.wrapper}
                    editorClassName={style.editor}

                    placeholder="내용을 작성해주세요."
                    // 한국어 설정
                    localization={{
                        locale: 'ko',
                    }}
                    // 초기값 설정
                    editorState={editorState}
                    // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                    onEditorStateChange={onEditorStateChange}
                />
                </div>
            </FlexChild>
            <FlexChild>
                <div className={style.preview} dangerouslySetInnerHTML={{ __html: editorToHtml }} />
            </FlexChild>
        </HorizontalFlex>
    );
}

export default DraftEditor;