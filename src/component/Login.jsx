import { useEffect, useState } from "react";
import styles from "./Login.scss";
import classNames from "classnames";
import circleIcon from "../icon/circle_icon.svg";
import circleCheckIcon from "../icon/circle_check_icon.svg";
import logoIcon from "../icon/logo.png";
import { Selector } from "./Widgets";

const Login = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    target: 0,
    weight: null,
    height: null,
    age: null,
    sex: null,
  });
  const [email, setEmail] = useState();
  const [isRegistered, setIsRegistered] = useState();

  const targetList = ["Regular", "Lose Weight", "Gain Weight"];

  const checkRegister = () => {
    fetch(`http://0.0.0.0:8000/users/get_id/${email}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
    setIsRegistered(false);
  };

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <img src={logoIcon} />
      </div>
      <div
        className={styles.form}
        style={{ "margin-top": isRegistered == false ? "unset" : "60px" }}
      >
        <div className={classNames(styles.row, styles.email)}>
          <span>Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {isRegistered == false && (
          <>
            <div className={styles.row}>
              <span>Name</span>
              <input
                type="text"
                value={personalInfo.name}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, name: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <span>Target</span>
              <div className={styles.selector}>
                <Selector
                  result={personalInfo.target}
                  setResult={(value) =>
                    setPersonalInfo({ ...personalInfo, target: value })
                  }
                  options={targetList}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span>Height</span>
              <input
                type="number"
                value={personalInfo.height}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, height: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <span>Weight</span>
              <input
                type="number"
                value={personalInfo.weight}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, weight: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <span>Age</span>
              <input
                type="number"
                value={personalInfo.age}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, age: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <span>Biological Sex</span>
              <div className={styles.options}>
                <span
                  onClick={() => setPersonalInfo({ ...personalInfo, sex: 1 })}
                >
                  <img
                    src={
                      (personalInfo.sex != null) & personalInfo.sex
                        ? circleCheckIcon
                        : circleIcon
                    }
                  />
                  Male
                </span>
                <span
                  onClick={() => setPersonalInfo({ ...personalInfo, sex: 0 })}
                >
                  <img
                    src={
                      (personalInfo.sex != null) & !personalInfo.sex
                        ? circleCheckIcon
                        : circleIcon
                    }
                  />
                  Female
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {isRegistered == false ? (
        <a href="/">
          <div className={styles.button}>Start</div>
        </a>
      ) : (
        <div className={styles.button} onClick={checkRegister}>
          Login / Register
        </div>
      )}
    </div>
  );
};

export default Login;
