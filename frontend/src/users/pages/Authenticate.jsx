import React, { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";

import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";

import { signUpUser, loginUser } from "../api/users";

import "./Authenticate.css";
import { AuthContext } from "../../shared/components/context/auth-context";

const Authenticate = (props) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);

  const switchModeHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const auth = useContext(AuthContext);

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token, data.username);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token, data.username);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      signUpUserMutation.mutate({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input id="username" ref={usernameRef} type="text" label="Username" />
        )}
        <Input id="email" ref={emailRef} type="text" label="Email" />
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
        />
        <Button type="submit" disable={signUpUserMutation.isLoading}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "Signup" : "Login"} instead?
      </Button>
    </Card>
  );
};

export default Authenticate;
