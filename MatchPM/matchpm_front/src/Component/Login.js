import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
  }
  from 'mdb-react-ui-kit';
  import { useState } from 'react';

function Login() {
    return (
        <MDBContainer>
          <MDBCard className='mx-5 mb-5 p-5 shadow-5 my-5' style={{backgroundColor: 'lightblue'}}>
            <MDBCardBody className='p-5 text-center'>
    
              <h2 className="fw-bold mb-5">Sign in</h2>
    
              <MDBInput wrapperClass='mb-4' label='userid' id='userid' type='text'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password'/>
    
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='remember me?' />
              </div>
    
              <MDBBtn className='w-50 mb-4' size='lg'>sign in</MDBBtn>
              <div>
                <p className="mb-0">Don't have an account? <a href="/register" class="fw-bold">Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
    
        </MDBContainer>
      );

}

export default Login;