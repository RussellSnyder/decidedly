import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import { AiOutlineMail } from 'react-icons/ai' 
import { FaKey } from 'react-icons/fa'

import {
  setLoginFormOpen,
  selectUI,
} from '../UI/UISlice'

import {
  logInUser
} from '../CurrentUser/CurrentUserSlice'

const showLoginSuccessMessage = () => (
  toast.info('Login Succesful', {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
)

function SignUpLogin() {
  const dispatch = useDispatch();

  const UI = useSelector(selectUI);
  const { loginFormOpen } = UI;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setIsSubmitting(false)
  }

  const close = () => {
    dispatch(setLoginFormOpen({open: false}))
    resetForm()
  }

  return (
    <div className="sign-up-login">
      <Modal isOpen={loginFormOpen} toggle={() => close()}>
        <ModalHeader>Login or SignUp</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const userData = {
                email,
                password
              };
              const options = {
                headers: {
                  'Content-Type': 'application/json'
                },
              } 

              axios.post("/api/auth/register_login", userData, options)
              .then(res => {
                  setIsSubmitting(false)                  
                  close()
                  const { email, id, isVerified } = res.data.user 
                  dispatch(logInUser({email, id, isVerified}))
                  showLoginSuccessMessage()
              })
              .catch(err => {
                  console.log(err);
                  console.log(err.response);
                  close()
              });              
            }}
          >
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <AiOutlineMail />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email" />
            </InputGroup>              
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FaKey />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" />
            </InputGroup>
            <InputGroup className="justify-content-between">
                <Button
                  className="pull-left"
                  outline color="secondary" onClick={() => {
                    close()
                  }}>
                  Cancel
                </Button>
                <Button disabled={isSubmitting} color="success" type="submit">
                  {isSubmitting ? "Submitting..." : "Login / Signup"}
                </Button>
            </InputGroup>

          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SignUpLogin;
