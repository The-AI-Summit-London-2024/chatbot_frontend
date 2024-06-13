import { useEffect, useRef, useState } from "react";
import styles from "./Goals.scss";
import classNames from "classnames";
import { ProcessBar, Window } from "./Widgets";
import imageIcon from "../icon/image_icon.svg";
import uploadIcon from "../icon/upload_icon.gif";
import adviceIcon from "../icon/advice_icon.svg";

const Goals = () => {
  const [isAdviceShow, setIsAdviceShow] = useState(false);
  const [isUploadShow, setIsUploadShow] = useState(false);
  const imageFileRef = useRef();

  return (
    <>
      <div className={styles.goals}>
        <div className={styles.nutrition}>
          <div className={styles.element}>
            <span className={styles.text}>Protein</span>
            <span className={styles.range}>
              <ProcessBar realValue={42} targetValue={178} />
            </span>
          </div>
          <div className={styles.element}>
            <span className={styles.text}>Carbohydrate</span>
            <span className={styles.range}>
              <ProcessBar realValue={30} targetValue={60} />
            </span>
          </div>
          <div className={styles.element}>
            <span className={styles.text}>Fat</span>
            <span className={styles.range}>
              <ProcessBar realValue={144} targetValue={230} />
            </span>
          </div>
          <div className={styles.element}>
            <span className={styles.text}>Minerals</span>
            <span className={styles.range}>
              <ProcessBar realValue={12} targetValue={35} />
            </span>
          </div>
          <div className={styles.element}>
            <span className={styles.text}>Sugar</span>
            <span className={styles.range}>
              <ProcessBar realValue={215} targetValue={260} />
            </span>
          </div>
          <div className={styles.element}>
            <span className={styles.text}>Water</span>
            <span className={styles.range}>
              <ProcessBar realValue={213} targetValue={800} />
            </span>
          </div>
        </div>
        <div className={styles.operation}>
          <div
            className={styles.uploadImage}
            onClick={() => setIsUploadShow(true)}
          >
            <img src={imageIcon} />
          </div>
          <div className={styles.advice} onClick={() => setIsAdviceShow(true)}>
            <img src={adviceIcon} />
          </div>
        </div>
      </div>
      <Window
        topicIcon={adviceIcon}
        topicTitle="Advice to yesterday's meals"
        content=""
        isShow={isAdviceShow}
        setIsShow={setIsAdviceShow}
      />
      <Window
        topicIcon={imageIcon}
        topicTitle="Upload today's meals"
        content={<UploadMeal />}
        isShow={isUploadShow}
        setIsShow={setIsUploadShow}
      />
    </>
  );
};

const UploadMeal = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("START"); // START, UPLOADING, FINISH
  const imageFileRef = useRef();

  const readImage = (e) => {
    setUploadStatus("UPLOADING");

    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (image != null) {
      // do fetch
      setTimeout(() => {
        setUploadStatus("FINISH");
      }, 5000);
    }
  }, [image]);

  return (
    <div
      className={styles.uploadMeal}
      onClick={() => imageFileRef.current.click()}
    >
      {uploadStatus == "START" && (
        <>
          <span className={styles.button}>Upload Image</span>
          <input type="file" ref={imageFileRef} onChange={readImage} />
        </>
      )}
      {uploadStatus == "UPLOADING" && (
        <div className={styles.uploading}>
          <img src={uploadIcon} />
          Uploading...
        </div>
      )}
      {uploadStatus == "FINISH" && (
        <div className={styles.finish}>
          <div className={styles.overview}>
            <img src={image} />
            <div className={styles.description}>
              description description description description description
              description description description
            </div>
          </div>
          <hr />
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Goals;
