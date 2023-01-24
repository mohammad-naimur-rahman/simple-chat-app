import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setshowPassword] = useState(false)

  const [loading, setloading] = useState(false)

  const updateForm = e => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = e => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <VStack spacing='10px'>
      <form onSubmit={login}>
        <FormControl id='loginEmail' isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={formData.email}
            type='email'
            name='email'
            placeholder='Enter Your Email Address'
            onChange={updateForm}
          />
        </FormControl>
        <FormControl id='loginPassword' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size='md'>
            <Input
              value={formData.password}
              name='password'
              onChange={updateForm}
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setshowPassword(prev => !prev)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme='blue' width='100%' style={{ marginTop: 15 }} isLoading={loading}>
          Login
        </Button>
        <Button
          variant='solid'
          type='submit'
          colorScheme='red'
          width='100%'
          mt={2}
          onClick={() => {
            setformData({
              email: 'guest@example.com',
              password: '123456',
            })
          }}>
          Get Guest User Credentials
        </Button>
      </form>
    </VStack>
  )
}

export default Login
