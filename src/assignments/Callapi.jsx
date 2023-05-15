import { useState, useEffect } from "react";

export default function Callapi() {
  //Start call Api section
  const [listUser, setlistUser] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setlistUser(res))
      .catch(() => console.log("fail"));
  }, []);
  //End call Api section
  return (
    <div className="task">
      <h1>4. Call API</h1>
      <ul>
        {listUser.map((user) => (
          <li key={user.id}>
            <h5>Name: {user.name}</h5>
            <h5>Email: {user.email}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
