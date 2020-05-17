import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import { FaRegCopyright } from 'react-icons/fa'
import { GiTechnoHeart } from 'react-icons/gi'

const Footer = () => {
  const date = new Date();

  return (
    <>
      <hr/>
      <Container>
        <Row className="text-center">
          <Col>
            <GiTechnoHeart className="mr-2"/><a href="https://github.com/RussellSnyder" rel="noopener noreferrer" target="_blank">Russell Snyder</a>
            <br/>
            <FaRegCopyright/> {date.getFullYear()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;