// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import { LOGIN } from '../utils/mutations';
// import Auth from '../utils/auth';
// import {Container, Row, Col, Form, Button} from "react-bootstrap";

// function Login(props) {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error }] = useMutation(LOGIN);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const mutationResponse = await login({
//         variables: { email: formState.email, password: formState.password },
//       });
//       const token = mutationResponse.data.login.token;
//       Auth.login(token);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   //used react-bootstrap, feel free to change, just added the needed labels and handles
//   return (
    
//     <Container>
       
//         <Row className="no-gutters">
//           <Col lg={5} md={6} sm={12} className="p-5 m-auto">
//           <h1 className="mt-5 mb-5 text-left rounded text-color">Login</h1>
//             <form onSubmit={handleFormSubmit}>

//                 <Form.Group>
//                   <Form.Label className="mb-2">Email address</Form.Label>

//                   <Form.Control className="mb-2" name="email" type="email" id="email" placeholder="Enter email" onChange={handleChange} />
//                 </Form.Group>

                
//                 <Form.Group>
//                     <Form.Label className="mb-2">Password</Form.Label>

//                     <Form.Control className="mb-2" name="password" type="password" id="pwd" placeholder="Password" onChange={handleChange} />
//                 </Form.Group>

//                 {error ? (
//                   <Form.Group>
//                   <Form.Text className="mb-2">The provided credentials are incorrect.</Form.Text>
//                   </Form.Group> 
//                 ) : null}
                
//                 <br />
//                 <Button variant="success btn-block button-class" type="submit">
//                     Login
//                 </Button>
                
//             </form>
            
//             <div className="mt-5 text-left">Don't have an account? <Link to={'/signup'}> Register here</Link></div>
//           </Col>
//       </Row>
//     </Container>
    
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await login({
        variables: { ...formState }
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
    
  };

  



const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}
return (
// const Login = () => (
  <Form 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
      margin: '2% 30% 0 30%'
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    onSubmit={handleFormSubmit}
  >
    <h2 style={{margin: '0 0 10% 62%'}}>Login</h2>
    <Form.Item
      label="Email"
      name="email"
      onChange={handleChange}
      value={formState.email}
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      onChange={handleChange}
      value={formState.password}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
};
export default Login;