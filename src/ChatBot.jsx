import { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.scss";
import classNames from "classnames";
import moment from "moment";
import sendIcon from "./icon/send_icon.svg";
import starIcon from "./icon/star_icon.svg";
import textingIcon from "./icon/texting_icon.gif";

const ChatBot = ({ summary }) => {
  const [chatHistory, setChatHistory] = useState([summary]);
  const [inputText, setInputText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCustomise, setIsCustomise] = useState(false);
  const sendRef = useRef();

  const questions = [
    "What is your favorite book, and why does it resonate with you?",
    "How do you typically spend your weekends, and what activities do you enjoy the most?",
    "What is your dream travel destination, and what attracts you to it?",
    "What motivates you to get out of bed every day and face the challenges ahead?",
    "Do you have a favorite hobby, and how did you get started with it?",
    "What is the last movie you watched, and what did you think about it?",
    "What type of music do you enjoy the most, and do you have a favorite artist or band?",
    "Do you prefer coffee or tea, and how do you like it prepared?",
    "Is there a skill you’ve always wanted to learn, and why is it important to you?",
    "What is your favorite way to relax after a long day or week, and why does it help you unwind?",
  ];

  const sendText = (text) => {
    setIsWaiting(true);
    setChatHistory([...chatHistory, text]);
    setTimeout(() => {
      setChatHistory([...chatHistory, text, "Response ..."]);
      setIsWaiting(false);
    }, 5000);
  };

  return (
    <div className={styles.chatBot}>
      <div className={styles.history}>
        {chatHistory.map((content, index) => (
          // <div>
          <div
            className={classNames(styles.chat, {
              [styles.userTalk]: Boolean(index % 2),
              [styles.botTalk]: Boolean(index % 2) - 1,
            })}
          >
            <span>{index % 2 ? "User" : "Chat Bot"}</span>
            <span className={styles.content}>{content}</span>
            <span>{moment().format("YYYY-MM-DD HH:mm")}</span>
          </div>
          // </div>
        ))}
        {isWaiting && (
          <div className={classNames(styles.botTalk)}>
            <div>
              <img className={styles.textingIcon} src={textingIcon} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.questionBlock}>
        <div className={styles.optionBlock}>
          <div className={styles.preDefinedQ}>
            <span
              className={classNames({ [styles.customise]: isCustomise })}
              onClick={() => setIsCustomise(!isCustomise)}
            >
              <img src={starIcon} />
              Customise - Fill in more details
            </span>
            {isCustomise ? (
              <div></div>
            ) : (
              questions.map((value) => (
                <span
                  onClick={() => {
                    // setInputText(value);
                    sendText(value);
                  }}
                >
                  {value}
                </span>
              ))
            )}
          </div>
        </div>
        <div className={styles.inputBlock}>
          <input
            value={inputText}
            placeholder="Text here ..."
            onChange={(e) => setInputText(e.target.value)}
            onKeyUp={(e) => e.key == "Enter" && sendRef.current.click()}
          />
          <img
            ref={sendRef}
            src={sendIcon}
            onClick={(e) => sendText(inputText)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
