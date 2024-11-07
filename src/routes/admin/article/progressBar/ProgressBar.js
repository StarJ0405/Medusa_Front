import React from 'react';
import PropTypes from 'prop-types';
import style from './ProgressBar.module.scss';
import Inline from 'layouts/container/Inline';

function ProgressBar(props) {
    const { bgcolor, completed } = props;

    const fillerStyles = {
        width: `${completed}%`,
        backgroundColor: bgcolor
    }

    return (
        <div className={style.progressBarContainer}>
            <div className={style.progressBarFiller} style={fillerStyles}>

            </div>
            <p style={{color: bgcolor && bgcolor}} className={style.progressBarLabel1}>{`${completed}`}</p>
            <p className={style.progressBarLabel2}>%</p>
        </div>
    );
};

export default ProgressBar;