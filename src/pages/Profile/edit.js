<<<<<<< HEAD
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Form, Button } from "react-bootstrap";
import { resetUpdating, updatePersonalDetails } from "../../actions/profileActions";
import { useHistory } from "react-router-dom";

export default function EditProfile() {
    const dispatch = useDispatch();
    const {updating, updated} = useSelector(state => state.profile)
    const [details, setDetails] = useState({});
    const history = useHistory();
=======
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updatePersonalDetails } from "../../actions/profileActions";

export default function EditProfile() {
    const dispatch = useDispatch();
    
    const [details, setDetails] = useState({});
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
    const handleFormChange = (e)=>{
        setDetails((prevDetails) => {
            return {
              ...prevDetails,
              [e.target.name.toString()]: e.target.value.toString().trim(),
            };
          });
    }
<<<<<<< HEAD

    useEffect(()=>{
      if(updated){
        history.push('/profile');
      }
      return () => {
        dispatch(resetUpdating())
      }
    },[dispatch, history, updated]);

  return (
    <section className="bg-white">
      <Form method="POST" onChange={handleFormChange} onSubmit={(e) => {
        e.preventDefault();
        dispatch(updatePersonalDetails(details));
    }}>
=======
    const submitDetails = (e)=>{
        e.preventDefault();
        dispatch(updatePersonalDetails(details));
    }

  return (
    <section className="bg-white">
      <Form method="POST" onChange={handleFormChange} onSubmit={submitDetails}>
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
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
<<<<<<< HEAD
          <Button type="submit" className="pink-button" >
            {!updating ? `Save details` : `Updating`}
=======
          <Button type="submit" className="pink-button">
            Save details
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
          </Button>
        </div>
      </Form>
    </section>
  );
}
