import styles from "./UserInfo.scss";

const UserInfo = () => {
  const [userInfo, setUserInfo] = {
    name: { label: "Name", value: "John Doe" },
    dob: { label: "Date of Birth", value: "1990-01-01", type: "date" }, //
    company_join_date: {
      label: "Company Join Date",
      value: "2010-01-01",
      type: "date",
    }, //
    gender: { label: "Gender", value: "F" },
    date_of_leaving: { label: "Date of Leaving", value: null, type: "date" },
    date_of_retirement: {
      label: "Date of Retirement",
      value: null,
      type: "date",
    },
    date_of_death: { label: "Date of Death", value: null, type: "date" },
    marital_status: { label: "Marital Status", value: "married" },
    marriage_date: {
      label: "Marriage Date",
      value: "2016-01-01",
      type: "date",
    },
    spouse_dob: {
      label: "Spouse Date of Birth",
      value: "1990-01-01",
      type: "date",
    },
    children: { label: "Number of Children", value: 2, type: "number" },
    children_dob: {
      label: "Children's Date of Birth",
      value: ["2010-01-01", "2012-01-01"],
      type: "dates",
    },
  };

  return <div>{Object.keys(userInfo).map()}</div>;
};

export default UserInfo;
