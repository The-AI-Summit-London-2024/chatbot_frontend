import { useEffect, useRef, useState } from "react";
import styles from "./UploadFile.scss";
import classNames from "classnames";
import uploadIcon from "./icon/upload_file_icon.svg";
import uploadingIcon from "./icon/upload_icon.gif";
import ChatBot from "./ChatBot";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("START"); // START, UPLOADING, FINISH
  const [summary, setSummary] = useState("");
  const [tenQ, setTenQ] = useState([]);
  const uploadRef = useRef();

  const readFile = (e) => {
    setUploadStatus("UPLOADING");

    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      setFile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (file != null) {
      // do fetch
      fetch("http://0.0.0.0:9001/parsing/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_data: file }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          setSummary(data.response);
          await fetch("http://0.0.0.0:9001/parsing/get_ten_q", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file_path: data.file_path }),
          })
            .then((res) => res.json())
            .then((data) => {
              data = data.ten_q.split("```json")[1].split("```")[0];
              data = JSON.parse(data);
              console.log(data);
              setTenQ(data.map((x) => x.question));
            });
          setUploadStatus("FINISH");
        });
      //   setTimeout(() => {
      //     setUploadStatus("FINISH");
      //   }, 1500);
    }
  }, [file]);

  return (
    <div className={styles.uploadFile}>
      <div
        className={classNames(styles.uploadBlock, {
          [styles.chatBlock]: uploadStatus == "FINISH",
        })}
      >
        {uploadStatus == "START" && (
          <div
            className={styles.uploadButton}
            onClick={(e) => uploadRef.current.click(e)}
          >
            <img className={styles.uploadIcon} src={uploadIcon} />
            <span>Upload File</span>
            <input ref={uploadRef} type="file" onChange={readFile} />
          </div>
        )}
        {uploadStatus == "UPLOADING" && (
          <>
            <img className={styles.uploadingIcon} src={uploadingIcon} />
            <span>Uploading...</span>
          </>
        )}
        {uploadStatus == "FINISH" && (
          <ChatBot summary={summary} questions={tenQ} />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
