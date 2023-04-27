import React from 'react';
import axios from 'axios';
import { hookContext } from '../../App';
import vals from '../../routing_info.js';

export const LoginPage = () => {
  const { setSession } = React.useContext(hookContext);
  const handleUserChange = (evt) => {
    setUsername(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }
  const handleLogin = async () => {
    if (username && password) {
      try {
        const payload = {
          username: username,
          password: password
        };
        const response = await axios.post(`${vals.root}/api/login`, payload);

        if (response.status === 200 && response.data.token) {
          setSession(response.data.token);
          setPassword("");
          setUsername("");
          setEmail("");
          setBadCredentials(false);
        }
      } catch (ex) {
        console.log(ex);
        setSession("");
        setBadCredentials(true);
      }
    }
  }
  const handleSignUp = async (evt) => {
    if (username && password && email) {
      const payload = {
        username: username,
        password: password,
        email: email
      }
      try{
        const response = await axios.post(`${vals.root}/api/signup`, payload)
        if(response.status === 200){
            setBadSignUp(true)
        } else if(response.status === 201) {
            setSignUp(false);
            setBadSignUp(false);
        }
      }
      catch(ex) {
        console.log(ex);
        setBadSignUp(true);
      }
    }
  }

  const [signUp, setSignUp] = React.useState(false);
  const [badSignUp, setBadSignUp] = React.useState(false);
  const [badLogin, setBadCredentials] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false)
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  return <div className={"loginFormCont"}>
    <form className={"formFlex"}>
      <h2>{signUp ? "Sign Up" : "Sign In"} </h2>
      <div className={"formJust"}>
        <FormLabel id={"username"} text={"Username or Email"} />
        <FormInput
          id={"username"}
          type={"text"}
          value={username}
          handler={handleUserChange}
        />
      </div>
      <div className={"formJust"}>
        <FormLabel id={"password"} text={"Password:"} />
        <FormInput
          id={"password"}
          value={password}
          type={showPass ? "text" : "password"}
          handler={handlePasswordChange}
        />
      </div>

      {signUp
        ? <div className={"formJust"}>
          <FormLabel text={"Email:"} id={"email"} />
          <FormInput
            value={email}
            id={"email"}
            type={"email"}
            handler={handleEmailChange}
          />

        </div>
        : <></>
      }
      {!signUp
        ? <FormButton text={"Login"} handler={handleLogin} />
        : <FormButton text={"Sign Up"} handler={handleSignUp} />
      }
        <p className={"formWarning"}>
          {!signUp && badLogin ? "Bad Username or Password Entered" : ""}
          {signUp && badSignUp ? "Email or Username already in use" : ""}
        </p>
      </form>
      <p onClick={setSignUp.bind(this, !signUp)} className={"signInSignUp"}>
        {signUp ? "Have an account? Sign in here" : "Need an account? Sign up"}
      </p>
  </div>
}
const FormInput = ({ handler, value, type, id }) => (
  <input
    type={type}
    className={"formInput loginForm"}
    value={value}
    id={id}
    onChange={handler}
  />
)
const FormButton = ({ handler, text }) => (
  <input
    type={"button"}
    className={"formButton loginForm"}
    value={text}
    onClick={handler}
  />
)
const FormLabel = ({ text, id }) => {
  return (
    <label htmlFor={id} className={"loginLabel"}>{text}</label>
  )
}