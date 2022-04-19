import React, { useEffect, useState } from "react";
import { firebaseApp, firebaseConfig } from "./config/firebaseConfig";
import "./App.css";
import { getAuth } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  login,
  logout,
  selectUser,
  setUser,
  signup,
} from "./features/auth/authSlice";
import { createTopic } from "./features/topic/topicSlice";

function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [topicHeading, setTopicHeading] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser(user?.toJSON()));
    });
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <input
        type="email"
        placeholder={"email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder={"pass"}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => dispatch(signup({ email, pass }))}>Signup</button>
      <button onClick={() => dispatch(login({ email, pass }))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>

      <br />
      <br />
      <br />

      <input
        type="text"
        placeholder="Topic başlığı"
        onChange={(e) => setTopicHeading(e.target.value)}
      />
      <br />
      <button
        onClick={() =>
          dispatch(createTopic({ heading: topicHeading, ownerID: user.uid }))
        }
      >
        Oluştur
      </button>
    </div>
  );
}

export default App;
