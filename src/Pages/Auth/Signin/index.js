import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import { LoginIcon } from '@heroicons/react/outline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`
const Card = styled.div`
  width: 400px;
  padding: 55px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 3px solid yellow;
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
  color: black;
`
const Styledsignin = styled.div`
  text-align: center;
`

const StyledLink = styled(Link)`
  color: yellow;
`

const StyledlogginIcon = styled(LoginIcon)`
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

const Signin = () => {

  const { currentUser, login, setCurrentUser, setIsSubmitting, loggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      alert("Error!")
    }
    setIsSubmitting(false)
  }

  const navigate = useNavigate()
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  return (
    <Container>
      <Card>
        <div>
          <Title>Login</Title>
        </div>
        <Form
          autoComplete="off"
          onSubmit={handleSignIn}
        >
          <div>
            <FormGroup>
              {/* <label>Email</label> */}
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                placeholder="Email Address"
                required
              />
            </FormGroup>
            <FormGroup>
              {/* <label>Password</label> */}
              <Input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </FormGroup>

            <Styledsignin>
              <div>
                <span>
                  Don't have an account? Sign up{" "}
                  <StyledLink to="/signup">
                    {" "}
                    here.
                  </StyledLink>
                </span>
              </div>
            </Styledsignin>

            <div>
              <Button type="submit">
                <StyledlogginIcon aria1-hidden="true" />
                Login
              </Button>
            </div>

          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default Signin