import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import { FaRegCopyright } from 'react-icons/fa'
import { GiTechnoHeart } from 'react-icons/gi'
import { FaGithub } from 'react-icons/fa';


const Footer = () => {
  const date = new Date();

  return (
    <>
      <hr/>
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <GiTechnoHeart className="mr-2"/><a href="https://github.com/RussellSnyder" rel="noopener noreferrer" target="_blank">Russell Snyder</a>
            <br/>
            <FaRegCopyright/> {date.getFullYear()}
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <a href="https://github.com/RussellSnyder/decidedly"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size="24" className="mr-2" />
              Beta v0.0.4
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;