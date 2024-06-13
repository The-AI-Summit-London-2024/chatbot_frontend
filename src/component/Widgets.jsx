import React, { useEffect, useRef, useState } from "react";
import styles from "./Widgets.scss";
import classNames from "classnames";
import closeIcon from "../icon/close_icon.svg";

export const ProcessBar = ({ realValue, targetValue }) => {
  return (
    <div className={styles.processBar}>
      <div className={styles.bar}>
        <div className={styles.full}></div>
        <div
          className={styles.range}
          style={{ width: (realValue / targetValue) * 100 + "%" }}
        />
      </div>
      <div className={styles.value}>
        <span>{realValue}</span>
        <span>/{targetValue}</span>
      </div>
    </div>
  );
};

export const Window = ({
  topicIcon,
  topicTitle,
  isShow = false,
  setIsShow,
  content,
}) => {
  return (
    <div
      className={classNames(styles.window, { [styles.hideWindow]: !isShow })}
    >
      <div className={styles.innerWindow}>
        <div className={styles.header}>
          <div className={styles.topic}>
            <img src={topicIcon} />
            <span>{topicTitle}</span>
          </div>
          <img
            className={styles.closeIcon}
            src={closeIcon}
            onClick={() => {
              setIsShow(false);
            }}
          />
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export const Selector = ({ options, result, setResult }) => {
  const [isExpand, setIsExpand] = useState(false);
  const selectorRef = useRef();

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!selectorRef.current.contains(e.target)) {
        setIsExpand(false);
      }
    };

    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div className={styles.selector} ref={selectorRef}>
      <div className={styles.result} onClick={() => setIsExpand(!isExpand)}>
        {options[result]}
      </div>
      {isExpand && (
        <div className={styles.list} onClick={() => setIsExpand(false)}>
          {options.map((value, index) => (
            <span onClick={() => setResult(index)}>{value}</span>
          ))}
        </div>
      )}
    </div>
  );
};
