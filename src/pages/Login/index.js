import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { LoginWrapper } from "./style";
import { Link } from "react-router-dom";
import axios from "axios";
import Meta from "../../Components/Meta";

export default function Login() {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("#login-form");

    axios({
      method: "POST",
      url: `/login`,
      withCredentials: true,
      data: {
        ...formValues,
      },
    })
      .then((res) => {
        const loggedUser = res.data.username;
        const id = res.data.id;

        localStorage.setItem("loggedUser", loggedUser);
        localStorage.setItem("id", id);
        //reset errors
        setErrors({});
        //clear form if successfull
        form.reset();
        return window.location.pathname = "/";
      })
      .catch((error) => {
        const { response } = error;
        setErrors({ msgErr: response?.data?.msg });
      });
  };
  const handleChange = (e) => {
    setFormValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [e.target.name.toString()]: e.target.value.toString().trim(),
      };
    });
  };
  return (
    <LoginWrapper>
    <Meta title="Login" />
      <Form
        onSubmit={handleSubmit}
        onChange={handleChange}
        id="login-form"
        noValidate
        method="POST"
      >
        <span>Login Form</span>
        <div id="invalid">{errors.msgErr}</div>
        <div className="controls_wrapper">
          <Form.Group className="p-2">
            <Form.Label className="font-weight-bold">Username: </Form.Label>
            <Form.Control name="username" id="username"></Form.Control>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label className="font-weight-bold">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
            ></Form.Control>
          </Form.Group>
        </div>
        <div className="button-wrapper">
          <Button type="submit" className="pink-button">
            LOGIN
          </Button>
        </div>
        <p className="text-center font-weight-bold m-0">OR</p>
        <div className="text-center">
          <Link to="/register" className="font-weight-bold">
            Create an account
          </Link>
        </div>
      </Form>
    </LoginWrapper>
  );
}
