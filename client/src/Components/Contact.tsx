import React from "react";
import styled from "styled-components";
import blkphone from "../images/blkphone.jpg"
import Sidebar from "./Sidebar";
import Signup from "./Signup";

function Contact() {
  return (
    <BgCover>
      <Sidebar />
      <h1>this is contact page</h1>
      <Signup />
    </BgCover>
  );
}

export default Contact;
const BgCover = styled.div`
  background: linear-gradient(50deg, #2d2f48 0%, #001550a6 35%, #00155073 60%),
    url(${blkphone});
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
`;
