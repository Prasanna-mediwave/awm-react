import React, { useReducer } from "react";
import { useEffect } from "react";
import Page from "../components/Page";
import axios from "axios";
import { apiSignUp } from "../service/api";
const initialState = {
  name: "",
  email: "",
  password: "",
  submit: false,
};

const SignUp = () => {
  const signUpReduce = (state, action) => {
    switch (action.type) {
      case "setName":
        return { ...state, name: action.value };
      case "setEmail":
        return { ...state, email: action.value };
      case "setPassword":
        return { ...state, password: action.value };
      case "setSubmit":
        return { ...state, submit: action.value };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(signUpReduce, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "setSubmit", value: true });
    console.log(state);
  };
  useEffect(() => {
    const request = axios.CancelToken.source();
    async function signUp() {
      try {
        await apiSignUp({
          payload: {
            name: state.name,
            email: state.email,
            password: state.password,
          },
          cancelToken: request.token,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (state.submit) {
      signUp();
    }

    return () => {};
  }, [state.submit, state.email, state.name, state.password]);

  return (
    <Page>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          onChange={(e) => dispatch({ type: "setName", value: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "setEmail", value: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "setPassword", value: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </Page>
  );
};

export default SignUp;
