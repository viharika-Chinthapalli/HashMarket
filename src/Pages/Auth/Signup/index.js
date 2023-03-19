import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import validations from './validations'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

const Card = styled.div`
  width: 400px;
  padding: 30px 55px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  opacity: 1;
`

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Input = styled.input`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  color: black;
`
const Styledsignup = styled.div`
  text-align: center;
`

const StyledLink = styled(Link)`
  color: yellow;
`

const StyledsignupIcon = styled(IdentificationIcon)`
  width: 25px;
  text-align: center;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-top: 16px;
  background-color: yellow;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: lightyellow;
  }
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`



const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting
  } = useAuth()

  const navigate = useNavigate()
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    setErrors(validations(currentUser, users)) 
    setIsSubmitting(true)
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('users', JSON.stringify(users))
  }

  return (
    <Container >
      <Card >
        <div>
          <Title >Sign Up</Title>
        </div>
        <Form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
        >
          <div >
            <FormGroup>
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              {/* <label >First Name</label> */}
              <Input
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
              />
              
            </FormGroup>

            <FormGroup>
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              {/* <label>Last Name</label> */}
              <Input
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
              />
              
            </FormGroup>

            <FormGroup>
            {errors.email && <ErrorMessage >{errors.email}</ErrorMessage>}
              {/* <label>Email</label> */}
              <Input
                type="email"
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />
              
            </FormGroup>

            <FormGroup>
            {errors.password && <ErrorMessage >{errors.password}</ErrorMessage>}
              {/* <label >Password</label> */}
              <Input
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />
              
            </FormGroup>

            <FormGroup>
            {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>}
              {/* <label >Password Confirm</label> */}
              <Input
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
              />
              
            </FormGroup>

            <Styledsignup >
              <div >
                <span>
                  Already have an account? Login{" "}
                  <StyledLink to="/signin" >
                    {" "}
                    here.
                  </StyledLink>
                </span>
              </div>
            </Styledsignup>

            <div >
              <Button type="submit" >
                <StyledsignupIcon
                  aria1-hidden="true"
                />
                Sign Up
              </Button>
            </div>

          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default Signup
