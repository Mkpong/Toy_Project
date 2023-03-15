import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

function Register() {
    return (
        <MDBContainer>
          <MDBCard className='mx-5 mb-5 p-5 shadow-5 my-5' style={{backgroundColor: 'lightblue'}}>
            <MDBCardBody className='p-5 text-center'>
    
              <h2 className="fw-bold mb-5">Sign up</h2>


              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2 w-50' label='아이디' id='userid' type='text'/>
                </MDBCol>
              </MDBRow>
    
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2' label='비밀번호' id='password' type='password'/>
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2' label='비밀번호 확인' id='password_check' type='password'/>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2 w-50' label='이름' id='name' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol col='6'>
                <Form.Select aria-label="year">
                  <option>year</option>
                  <option value="1">1990</option>
                  <option value="2">1991</option>
                  <option value="3">1992</option>
                </Form.Select>
                </MDBCol>

                <MDBCol col='6'>
                <Form.Select aria-label="year">
                  <option>month</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                </MDBCol>

                <MDBCol col='6'>
                <Form.Select aria-label="year">
                  <option>day</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                </MDBCol>

                <MDBCol col='6'>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2' label='전화번호( - 제외하고 입력)' id='form1' type='text'/>
                </MDBCol>
                </MDBCol>
              </MDBRow>



              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2 w-50' label='전화번호( - 제외하고 입력)' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-2 w-50' label='이메일' id='email' type='text'/>
                </MDBCol>
              </MDBRow>


    
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>
    
              <MDBBtn className='w-50 mb-4' size='lg'>sign up</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
}

export default Register;