import { useState, useEffect } from "react";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    studentID: "",
    phone: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    studentID: false,
    phone: false,
  });
  function checkValidate(field) {
    console.log("haha");
    switch (field) {
      case "name":
        setError({ ...error, name: form.name.trim().length < 2 });
        break;
      case "email":
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        setError({ ...error, email: !regexEmail.test(form.email) });
        break;
      case "studentID":
        const regexStudentID = /^(SE|SS|SA|HE|HS|HA|se|ss|sa|he|hs|ha)\d{6}$/;
        setError({ ...error, studentID: !regexStudentID.test(form.studentID) });
        break;
      case "phone":
        setError({ ...error, phone: form.phone.length != 10 });
        break;
      default:
        console.log("Không tìm thấy field này");
    }
  }
  const onSubmit = () => {
    if (!(error.name || error.email || error.studentID || error.phone)) {
      alert(JSON.stringify(form));
    } else {
      alert("Invalid Form");
    }
  };
  return (
    <div className="task">
      <h1>2. K18 Recruitment</h1>
      {["name", "email", "studentID", "phone"].map((field) => (
        <div key={field} className="field">
          <h5>{field}</h5>
          <input
            type="text"
            onBlur={() => checkValidate(field)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
          {error[field] && <i>Invalid {field}</i>}
        </div>
      ))}
      <input type="button" value={"Submit"} onClick={onSubmit} />
    </div>
  );
}
