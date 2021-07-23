import React from "react";
import { useSelector } from "react-redux";
import { MobileMenu, BigMenu } from "./styles/mainStyles";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export default function MainLayout({ children }) {
  const isLogged = useSelector(state => state.isLogged);

  return (
    <>
    <MobileMenu className="fixed-bottom bg-light border w-100">
      <div>
        <p className="sr-only">Home</p>
        <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="12.448" height="11.352" viewBox="0 0 12.448 11.352"><path d="M6.224,0,0,6.1l1.519.8L6.184,2l4.746,4.9,1.519-.8L6.224,0ZM1.85,7.054h0L6.23,2.672,10.6,7.054h0v4.3H7.407V8.316H5.014v3.036H1.85v-4.3Z" fill="#c700d4" fillRule="evenodd"/></svg></Link>
      </div>
      <div>
      <p className="sr-only">Profile</p>
      <Link to="/profile"><svg xmlns="http://www.w3.org/2000/svg" width="13.513" height="13.352" viewBox="0 0 13.513 13.352"><g transform="translate(0 -0.009)"><path d="M0,13.361V11.2c1.155-.514,4.69-1.491,4.856-2.9A18.967,18.967,0,0,0,3.969,6.18a2.13,2.13,0,0,1-.1-2.145,4.487,4.487,0,0,0,.092-1.488c0-3.384,5.93-3.385,5.93,0,0,.428-.1,1.214.134,1.551a2.155,2.155,0,0,1-.14,2.082c-.21.613-1.01,1.772-.941,2.118.254,1.291,3.533,2.159,4.566,2.617V13.36Z" transform="translate(0 0)" fill="#c700d4" fillRule="evenodd"/></g></svg></Link>
      </div>
      <div>
      <p className="sr-only">Search</p>
      <Link to="/search"><svg xmlns="http://www.w3.org/2000/svg" width="15.081" height="16.912" viewBox="0 0 15.081 16.912"><g transform="translate(-3354.919 -1406)"><path d="M4.657,16.6l-.639-.475a1.643,1.643,0,0,1-.35-2.26L6.638,9.686A6.544,6.544,0,0,1,5.8,6.47,6.405,6.405,0,0,1,12.124,0a6.4,6.4,0,0,1,6.322,6.47,6.4,6.4,0,0,1-6.322,6.469A6.168,6.168,0,0,1,9.6,12.4l-2.73,3.845a1.568,1.568,0,0,1-1.281.667A1.551,1.551,0,0,1,4.657,16.6ZM9.147,6.47a2.978,2.978,0,1,0,2.977-3.046A3.015,3.015,0,0,0,9.147,6.47Z" transform="translate(3351.554 1406)" fill="#c700d4"/></g></svg></Link>
      </div>
      <div>
      <p className="sr-only">Messages</p>
      <Link to="/messages"><svg xmlns="http://www.w3.org/2000/svg" width="12.877" height="11.94" viewBox="0 0 12.877 11.94"><path d="M.4,0H12.482a.4.4,0,0,1,.4.4V8.482a.4.4,0,0,1-.4.4H6.438L3.389,11.144c-1.007.957-1.685,1.2-1.588-.1V8.878H.4a.4.4,0,0,1-.4-.4V.4A.4.4,0,0,1,.4,0Zm6.2,3.6a.745.745,0,1,1-.528.218A.746.746,0,0,1,6.594,3.6Zm2.849,0a.746.746,0,1,1-.745.745A.746.746,0,0,1,9.443,3.6Zm-5.7,0A.746.746,0,1,1,3,4.344.746.746,0,0,1,3.743,3.6Z" fill="#c700d4" fillRule="evenodd"/></svg></Link>
      </div>
      <div>
      <p className="sr-only">Notifications</p>
      <Link to="/notifications"><svg xmlns="http://www.w3.org/2000/svg" width="11.248" height="11.457" viewBox="0 0 11.248 11.457"><g transform="translate(0 0)"><path d="M6.355.642A3.715,3.715,0,0,1,9.328,4.271c0,2.107-.2,3.691,1.92,5.1H0c2.126-1.415,1.925-3.029,1.925-5.1a3.716,3.716,0,0,1,3-3.634A.719.719,0,0,1,6.355.642Zm.8,9.538a1.553,1.553,0,0,1-3.057,0Z" transform="translate(0 0)" fill="#c700d4" fillRule="evenodd"/></g></svg></Link>
      </div>
    </MobileMenu>
      <Navbar className="d-flex justify-content-between border mb-3">
        <Navbar.Brand href="/" className="font-weight-bold">Luteya Social</Navbar.Brand>
        {!isLogged && <Link to="/login">Join</Link>}
        {isLogged && <Link to="/logout">Logout</Link>}
      </Navbar>
      <BigMenu className="navbar navbar-expand-lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto mx-md-auto">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/messages">Messages</Link>
          </Nav>
        </Navbar.Collapse>
      </BigMenu>
      {children}
    </>
  );
}
