import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import liff from "@line/liff";

function App() {
  const [lineProfile, setLineProfile] = useState({});
  useEffect(() => {
    async function lf() {
      await liff
        .init({
          liffId: "XXXXXXXX", // Use own liffId
        })
        .catch((err) => {
          throw err;
        });
      if (liff.isLoggedIn()) {
        const profile = liff.getProfile();
        return Promise.resolve(profile);
      } else {
        liff.login();
      }
    }
    lf().then((profile) => {
      console.log(profile);
      setLineProfile(profile);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Line id :{lineProfile?.userId}</p>
        <p>Display name :{lineProfile?.displayName}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          DEMO LIFF 
        </a>
      </header>
    </div>
  );
}

export default App;
