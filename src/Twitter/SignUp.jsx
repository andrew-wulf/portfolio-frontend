import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useState } from 'react';

import { FaTwitter } from 'react-icons/fa6';
import { RxTwitterLogo } from 'react-icons/rx';


export function SignUp(props) {

  const [userExists, setUserExists] = useState(false);
  const [userCache, setUserCache] = useState([]);

  const [emailExists, setEmailExists] = useState(false);
  const [emailCache, setEmailCache] = useState([]);

  const [userVal, setUserVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [displayVal, setDisplayVal] = useState("");

  const [page, setPage] = useState(1);


  const login = () => {
    axios.post('http://localhost:3000/sessions.json', {email: emailVal, password: passVal})
      .then(response => {
        console.log(response);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData();

    axios.post('http://localhost:3000/users.json', {username: userVal, email: emailVal, password: passVal, password_confirmation: passVal, display_name: displayVal})

      .then(response => {
        console.log(response);
        login(params);
        setPage(4);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const checkUserExists = (user) => {

    var params = new FormData();
    params.append("username", user);
    console.log(`user: ${user}`)

    axios.get('http://localhost:3000/users/exists.json', {params: {username: user}})
      .then(response => {
        console.log(response);
        setUserExists(response.data.user_exists);
        let c = userCache;
        c.push([user, response.data.user_exists]);
        setUserCache(c);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUserUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    if (val.length < 20) {
      val = val.replaceAll(/[^a-zA-Z0-9_]/g, '');
      setUserVal(val);

      if (val.length > 5) {
        let res = userCache.filter(arr => {return arr[0] === val});
        console.log('CACHE: ', userCache, 'RES: ', res)
        if (res.length > 0) {
          setUserExists(res[0][1]);
        }
        else {
          checkUserExists(val);
        }
      }
    }
  }

  const checkEmailExists = (email) => {
    var params = new FormData();
    params.append("email", email);
    console.log(`email: ${email}`)

    axios.get('http://localhost:3000/users/exists.json', {params: {email: email}})
      .then(response => {
        console.log(response);
        setEmailExists(response.data.user_exists);
        let c = emailCache;
        c.push([email, response.data.user_exists]);
        setEmailCache(c);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEmailUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;

    if (val.length < 60) {
      val = val.replaceAll(/[^a-zA-Z0-9._%+-@]/g, '')
      setEmailVal(val);
      
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(val)) {
        
        if (val.length > 5) {
          let res = emailCache.filter(arr => {return arr[0] === val});
          console.log('CACHE: ', emailCache, 'RES: ', res)
          if (res.length > 0) {
            setEmailExists(res[0][1]);
          }
          else {
            checkEmailExists(val);
          }
        }
      }
    }
  }

  const handlePasswordUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    val = val.replaceAll(/[ \0\n\r\t\\'";<>]/g, '');

    if (val.length < 40) {
      setPassVal(val);
    }
  }

  const handleDisplayUpdate = (e) => {
    console.log('updating')
    e.preventDefault();
    let val = e.target.value;
    val = val.replaceAll(/[^a-zA-Z0-9_]/g, '');

    if (val.length < 24) {
      setDisplayVal(val);
    }
  }


  let username = "";
  let emailPassword = "";
  let displayName = "";
  let avi = "";
  let banner = "";

  let emailExistsErr = "";
  let emailValidErr = "";

  let passValidErr = "";

  let userSuccess = "Nice name!"
  let userExistsErr = "";
  let userValidErr = "";


  if (userExists) {userExistsErr = "username is taken."; userSuccess = ""}
  if (userVal.length > 0 && userVal.length < 6) {userValidErr = "username must contain at least 6 characters."; userSuccess = ""}
  if (userVal.length < 1) {userSuccess = ""}

  if (emailExists) {emailExistsErr = "email is taken."}

  if (passVal.length > 0 && (passVal.length < 7 || /\d/.test(passVal) === false || /[A-Z]/.test(passVal) === false)) {
    passValidErr = "password must contain 8 or more characters, a number, and a capital letter.";
  }

 
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailVal) === false) {
    emailValidErr = "requires valid email address."
  }

  let emailButton = <Button disabled variant="secondary" type="button" onClick={() => {setPage(2)}}>Next</Button>
  if ((emailExists === false && emailValidErr === "" && emailVal.length > 8) && (passVal.length > 7 && /\d/.test(passVal) && /[A-Z]/.test(passVal))) {
    emailButton = <Button variant="primary" type="button" onClick={() => {setPage(2)}}>Next</Button>
  }

  let userButtons = 
                    <>
                    <Button disabled variant="primary" onClick={() => {setDisplayVal(userVal); setPage(3)}}>Continue</Button>
                    <Button variant="secondary" onClick={() => {setPage(1)}}>Back</Button>
                    </>
  if (userSuccess.length > 0) {
    userButtons = <>
                    <Button variant="primary" onClick={() => {setDisplayVal(userVal); setPage(3)}}>Continue</Button>
                    <Button variant="secondary" onClick={() => {setPage(1)}}>Back</Button>
                  </>
  }


  if (page === 1) {
    emailPassword = <>
              <p>{emailExistsErr}</p>
              <p>{emailValidErr}</p>
              
                <Stack gap={3}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="example@email.com" value={emailVal} onChange={(e) => {handleEmailUpdate(e)}}/>

                  <p>{passValidErr}</p>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" value={passVal} onChange={(e) => {handlePasswordUpdate(e)}}/>
                  {emailButton}
                </Stack>
        
            </>
  }

  if (page === 2) {
    username = <>
                  <h1>Make a Username</h1>
                  <h6>Must be unique. You can change this later!</h6>
                  <p>{userExistsErr}</p>
                  <p>{userValidErr}</p>
                  <p>{userSuccess}</p>
   
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" placeholder="@" value={userVal} onChange={(e) => {handleUserUpdate(e)}}/>
                  
                  <Stack gap={2}>
                    {userButtons}
                  </Stack>
              </>
  }

  if (page === 3) {
    displayName = <>
                    <h3>Display Name</h3>
                    <Stack gap={3}>
                      <Form.Control type="text" name="display_name" value={displayVal} onChange={(e) => {handleDisplayUpdate(e)}}/>
                      <Button type="submit">Finish</Button>
                    </Stack>
                  </>
  }

  if (page === 4) {
    avi = <>
            <h4>Add Profile Image</h4>
            <Stack gap={3}>
              <Form.Control type="text" name="avi" placeholder="Enter Link"/>
              <Button onClick={() => {setPage(5)}}>Next</Button>
            </Stack>
          </>
  }

  if (page === 5) {
    banner = <>
            <h4>Add Banner Image</h4>
            <Stack gap={3}>
              <Form.Control type="text" name="banner" placeholder="Enter Link"/>
              <Button onClick={() => {window.location.href = "/twitter/home"}}>Next</Button>
            </Stack>
          </>
  }

  return (
    <Container className='twitter-signup'>
      <h2>Sign Up</h2>

      <Form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

        {emailPassword}

        {username}

        {displayName}

        </Form.Group>

      </Form>

      <Form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

        {avi}

        {banner}

        </Form.Group>

      </Form>

    </Container>
  )
}
