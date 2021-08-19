import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updatePersonalDetails } from "../../actions/profileActions";

export default function EditProfile() {
    const dispatch = useDispatch();
    
    const [details, setDetails] = useState({});
    const handleFormChange = (e)=>{
        setDetails((prevDetails) => {
            return {
              ...prevDetails,
              [e.target.name.toString()]: e.target.value.toString().trim(),
            };
          });
    }
    const submitDetails = (e)=>{
        e.preventDefault();
        dispatch(updatePersonalDetails(details));
    }

  return (
    <section className="bg-white">
      <Form method="POST" onChange={handleFormChange} onSubmit={submitDetails}>
        <h1 style={{ fontSize: '24px' }} className="font-smaller">Personal details</h1>
        <div id="invalid"></div>
        <div className="controls_wrapper">
          <Form.Group className="p-2">
            <Form.Label className="font-weight-bold">Residence: </Form.Label>
            <Form.Control name="residence" placeholder="e.g Kenya"></Form.Control>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label className="font-weight-bold">School/university/college: </Form.Label>
            <Form.Control name="school" placeholder="e.g Harvard university"></Form.Control>
          </Form.Group>

        </div>
        <div className="button-wrapper">
          <Button type="submit" className="pink-button">
            Save details
          </Button>
        </div>
      </Form>
    </section>
  );
}
