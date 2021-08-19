import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./style";

export default function Logout() {
  return (
    <Wrapper>
      <h1>BYE</h1>
      <p>Hoping to see you back</p>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Create new account</Link>
    </Wrapper>
  );
}
