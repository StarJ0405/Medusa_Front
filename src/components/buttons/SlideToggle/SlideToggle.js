import { useState } from "react";
import style from "./SlideToggle.module.scss"
import clsx from "classnames"


export default function SlideToggle(props) {
    const { color, children, label, disabled, isToggled, onToggle } = props;
    const [toggled, setToggled] = useState(isToggled);
  
    function handleToggle(event) {
      const toggled = event.target.checked;
      setToggled(toggled);
    //   onToggle(toggled);
    }
  
    // const toggleClassName = [
    //   'SlideToggle',
    //   disabled ? 'SlideToggle--disabled' : ''
    // ];
    // const barClassName = [
    //   'SlideToggle__bar',
    //   toggled ? `SlideToggle__bar--${color}` : ''
    // ];
    // const handleClassName = [
    //   'SlideToggle__handle',
    //   toggled ? 'SlideToggle__handle--toggled' : ''
    // ];
  

    
    return (
      <div className={clsx(style.SlideToggle, {[style.SlideToggleDisabled]: disabled ? true : false})}>
        <label>
          <div className={clsx(style.SlideToggleBar, {[style.SlideToggleBarColor]: toggled ? true : false})}>
            <input
              type="checkbox"
              checked={toggled}
              onChange={disabled ? null : handleToggle}
              aria-checked={toggled}
              disabled={disabled}
            />
            <span className={clsx(style.SlideToggleHandle, {[style.SlideToggleHandleToggled]: toggled ? true : false})} />
          </div>
          <span className="SlideToggle__label">{children || label}</span>
        </label>
      </div>
    );
  }
   
//   SlideToggle.propTypes = {
//     isToggled: PropTypes.bool,
//     onToggle: PropTypes.func,
//     label: PropTypes.string,
//     color: PropTypes.oneOf([
//       'green',
//       'blue',
//       'yellow',
//       'gold',
//       'orange',
//       'pink',
//       'violet',
//       'red'
//     ])
//   };
//   SlideToggle.defaultProps = {
//     isToggled: false,
//     onToggle: () => {},
//     color: 'green',
//     label: ''
//   };