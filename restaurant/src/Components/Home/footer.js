import React from 'react';
import { CDBContainer, CDBBtn, CDBIcon,CDBBox } from 'cdbreact';
import logo from '../../background/logo.png'
export const Footer = () => {
  return (
    <CDBContainer className="transparent " style={{width:"100vw",marginTop:"40px"}}>
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <img 
              alt="logo"
              src={logo}
              width="100px"
            />
          </a>
          <small className="ms-2">&copy; Restaurant, 2024. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBContainer>
  );
};
export default Footer;