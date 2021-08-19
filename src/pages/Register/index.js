import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { RegisterWrapper, StepsWrapper } from "./style";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Meta from "../../Components/Meta";

const Register = () => {
  const {isLogged} = useSelector((state) => state.login);
  const [formValues, setFormValues] = useState({});
  const [registrationStep, setRegistrationStep] = useState(1);
  const [nextStepClicked, setNextStepClicked] = useState(false);
  const [errors, setErrors] = useState({
    fNameErr: "",
    lNameErr: "",
    uNameErr: "",
    emailErr: "",
    passErr: "",
    confirmErr: "",
    messageErr: "",
  });

  const history = useHistory();

  useEffect(()=>{

    if(registrationStep === 2 && !nextStepClicked && errors?.fNameErr?.length && errors?.lNameErr?.length && errors?.uNameErr?.length){
      setRegistrationStep(1);
    }

  },[errors, nextStepClicked, registrationStep]);

  if (isLogged) {
    history.goBack();
  }

  const handleRegistration = () => {
    setNextStepClicked(false);
    const form = document.querySelector("#registration-form");
    axios({
      method: "POST",
      url: "/register",
      data: {
        ...formValues,
      },
    })
      .then((res) => {
        
        //reset errors
        setErrors({});
        form.reset();
        history.replace('/login');
      })
      .catch(({ response, message, request }) => {
        console.log(response)
        //reset errors
        setErrors({});
        let responseErr = response?.data?.errors;

        //Check and set errors
        if (responseErr) {
          responseErr.forEach((e) => {
            if (e.param === "fName") {
              setErrors((prevErrors) => {
                return { ...prevErrors, fNameErr: e.msg };
              });
            }
            if (e.param === "lName") {
              setErrors((prevErrors) => {
                return { ...prevErrors, lNameErr: e.msg };
              });
            }
            if (e.param === "email") {
              setErrors((prevErrors) => {
                return { ...prevErrors, emailErr: e.msg };
              });
            }
            if (e.param === "username") {
              setErrors((prevErrors) => {
                return { ...prevErrors, uNameErr: e.msg };
              });
            }
            if (e.param === "password") {
              setErrors((prevErrors) => {
                return { ...prevErrors, passErr: e.msg };
              });
            }
            if (e.param === "passwordConfirm") {
              setErrors((prevErrors) => {
                return { ...prevErrors, confirmErr: e.msg };
              });
            }
          });
        }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration();
  };

  return (
    <RegisterWrapper>
    <Meta title="Registration" />
      <Form
        method="POST"
        id="registration-form"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <span>Registration Form</span>
        <div className="controls_wrapper">
          <StepsWrapper>
            <span className="step" onClick={() => setRegistrationStep(1)}>
              &nbsp;
            </span>
            <span className="step" onClick={() => {
              setNextStepClicked(true);
              setRegistrationStep(2);
              }}>
              &nbsp;
            </span>
          </StepsWrapper>
          <fieldset
            style={
              registrationStep === 1
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <Form.Group className="p-2">
              <Form.Label className="font-weight-bold" htmlFor="fName">
                First name:{" "}
              </Form.Label>
              <div className="invalid">{errors.fNameErr}</div>
              <Form.Control
                name="fName"
                id="fName"
                placeholder="Enter your first name"
                // required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label className="font-weight-bold" htmlFor="lName">
                Last name:{" "}
              </Form.Label>
              <div className="invalid">{errors.lNameErr}</div>
              <Form.Control
                name="lName"
                id="lName"
                placeholder="Enter your last name"
                // required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label className="font-weight-bold" htmlFor="email">
                Email:{" "}
              </Form.Label>
              <div className="invalid">{errors.emailErr}</div>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                // required
              ></Form.Control>
            </Form.Group>
          </fieldset>
          <fieldset
            style={
              registrationStep === 2
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <Form.Group className="p-2">
              <Form.Label className="font-weight-bold" htmlFor="username">
                Username:{" "}
              </Form.Label>
              <div className="invalid">{errors.uNameErr}</div>
              <Form.Control
                name="username"
                id="username"
                placeholder="Choose a username"
                // required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label className="font-weight-bold" htmlFor="password">
                Password:{" "}
              </Form.Label>
              <div className="invalid">{errors.passErr}</div>
              <Form.Control
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                // required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label
                className="font-weight-bold"
                htmlFor="passwordConfirm"
              >
                Confirm Password:{" "}
              </Form.Label>
              <div className="invalid">{errors.confirmErr}</div>
              <Form.Control
                name="passwordConfirm"
                type="password"
                id="passwordConfirm"
                placeholder="Confirm your password"
                // required
              ></Form.Control>
            </Form.Group>
          </fieldset>
        </div>
        <div
          className="button-wrapper"
          style={
            registrationStep === 1 ? { display: "flex" } : { display: "none" }
          }
        >
          <Button
            className={`pink-button`}
            onClick={() => {
              setNextStepClicked(true);
              setRegistrationStep(2);
            }}
          >
            Next
          </Button>
        </div>
        <div
          className="button-wrapper"
          style={
            registrationStep === 2 ? { display: "flex" } : { display: "none" }
          }
        >
          <Button type="submit" className="pink-button">
            Register
          </Button>
        </div>
        <div className="text-center">
          <Link to="/login" className="font-weight-bold">
            Already have account?
          </Link>
        </div>
      </Form>
    </RegisterWrapper>
  );
};

export default Register;
