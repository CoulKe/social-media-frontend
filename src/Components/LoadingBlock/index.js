import React from "react";
import SpinnerWrapper from "./style";
import { Spinner } from "react-bootstrap";

export default function LoadingBlock({text="Loading...",showSpinner=true, animation="border"}) {
  return (
    <SpinnerWrapper>
      {showSpinner ? <Spinner animation={animation} /> : ""}
      <p>{text}</p>
    </SpinnerWrapper>
  );
}
