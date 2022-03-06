import React, { useState, useEffect } from "react";
import logo from "./GitHub-Mark-Light-32px.png";
import textLogo from "./GitHub_Logo_White.png";
import userLogo from "./GitHub-Mark-32px.png";
import userIMG from "./Octocat.png";
import "./App.css";

function App() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [userLink, setUserLink] = useState("");
  const [error, setErorr] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/")
      .then((respond) => respond.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ avatar_url, name, login, html_url }) => {
    setAvatar(avatar_url);
    setName(name);
    setUsername(login);
    setUserLink(html_url);
  };

  const searchUser = (e) => setInput(e.target.value);

  const submit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${input}`)
      .then((respond) => respond.json())
      .then((data) => {
        if (data.message) {
          setErorr(data.message);
        } else {
          setData(data);
          setErorr(null);
        }
      });
  };

  return (
    <div>
      <div className="navBar">
        <img className="textLogo" src={textLogo} alt="Logo" height="32px" />
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="searchBar">
        <form className="UserSearch" onSubmit={submit}>
          <input
            className="input"
            placeholder="GitHub User"
            onChange={searchUser}
          ></input>
          <button className="searchBtn">Search</button>
        </form>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <div className="userInfo">
            <img className="userImg" src={avatar || userIMG} />
            <span className="fullName">{name}</span>
            <span className="userName">
              <img className="userLogo" src={userLogo} />
              <a className="userLink" href={userLink} target="_blank">
                {userName || "user"}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
