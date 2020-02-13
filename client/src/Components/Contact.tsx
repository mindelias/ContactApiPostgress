import React from "react";
import styled from "styled-components";
import blkphone from "../images/blkphone.jpg";
import man from "../images/man-phone.jpg";
import Sidebar from "./Sidebar";
import Signup from "./Signup";

function Contact() {
  return <BgCover></BgCover>;
}

export default Contact;
const BgCover = styled.div`
  background: linear-gradient(
      45deg,
      rgb(30, 144, 255, 0.5),
      rgb(30, 144, 255, 0.5),
      rgb(0, 24, 205, 0.5)
    ),
    url(${man});
  background-size: 100% 100%;
  /* background-image: */
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
`;

// 0A0AFF# 1414FF# 1E1EFF# 2828FF# 3232FF# 3C3CFF#4646FF#5050FF
