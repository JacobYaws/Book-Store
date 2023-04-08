import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import {Container, Row, Col, Form, Button} from "react-bootstrap";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: ''});
  const [addUser] = useMutation(ADD_USER);
  // const [validated] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  //   const mutationResponse = await addUser({
  //     variables: {
  //       email: formState.email,
  //       password: formState.password,
  //       firstName: formState.firstName,
  //       lastName: formState.lastName,
  //     },
  //   });
  //   const token = mutationResponse.data.addUser.token;
  //   Auth.login(token);
  // };

  const mutationResponse = event.currentTarget;
    if (mutationResponse.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      const { data } = await addUser({
        variables: { ...formState },
      })
    
  Auth.login(data.addUser.token);
    } catch (err) {
      console.log(formState)
      console.error(err)
    }
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

    //used react-bootstrap, feel free to change, just added the needed labels and handles
  // used from other challenge

  return (
    <Container>
       
        <Row className="no-gutters">
          <Col lg={5} md={6} sm={12} className="p-5 m-auto">
          <h1 className="mt-5 mb-5 text-left rounded text-color">Signup</h1>
            <form noValidate onSubmit={handleFormSubmit}>

                <Form.Group>
                  <Form.Label className="mb-2">First Name:</Form.Label>

                  <Form.Control className="mb-2" name="firstName" type="firstName" id="firstName" placeholder="First name" onChange={handleChange} value={formState.firstName} required/>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="mb-2">Last Name:</Form.Label>

                  <Form.Control className="mb-2" name="lastName" type="lastName" id="lastName" placeholder="Last name" onChange={handleChange} value={formState.lastName} required/>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="mb-2">Email address</Form.Label>

                  <Form.Control className="mb-2" name="email" type="email" id="email" placeholder="Enter email" onChange={handleChange} value={formState.email} required/>
                </Form.Group>

                
                <Form.Group>
                    <Form.Label className="mb-2">Password</Form.Label>

                    <Form.Control className="mb-2" name="password" type="password" id="pwd" placeholder="Password" onChange={handleChange} value={formState.password} required/>
                </Form.Group>

                <br />
                <Button variant="success btn-block button-class" type="submit" onClick={handleFormSubmit}>
                    Signup
                </Button>
                
            </form>
            
            <div className="mt-5 text-left">Already registered? <Link to={'/login'}> Login here</Link></div>
          </Col>
      </Row>
    </Container>
  );
}

export default Signup;

// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
// const Signup = () => (
//   <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//       margin: '2% 30% 0 30%'
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <h2 style={{margin: '0 0 10% 62%'}}>Login</h2>
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Email"
//       name="email"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your email!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default Signup;