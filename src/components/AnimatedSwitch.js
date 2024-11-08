// AnimatedSwitch.js
import React, { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "./AnimatedSwitch.css";  // 애니메이션 효과 CSS 파일

const AnimatedSwitch = ({
  children,
  animationClass = "fade",
  timeout = 200,
  mode = "out-in",
}) => {
  const location = useLocation();
  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const nodeRef = location.pathname === "/" ? currentRef : nextRef;

  return (
    <SwitchTransition mode={mode}>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={timeout}
        classNames={animationClass}
      >
        <div ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AnimatedSwitch;
