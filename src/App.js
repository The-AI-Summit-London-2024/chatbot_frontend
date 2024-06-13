import styles from "./App.scss";
import menuIcon from "./icon/menu_icon.svg";
import cancelIcon from "./icon/cancel_icon.svg";
import { useState } from "react";
import UploadFile from "./UploadFile";

function App() {
  const [isMenuExpand, setIsMenuExpand] = useState(false);
  return (
    <div className={styles.app}>
      <UploadFile />
    </div>
  );
}

export default App;
