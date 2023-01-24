import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setshowPassword] = useState(false)
  const [imgUploading, setimgUploading] = useState(false)

  const updateForm = e => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const uploadImage = file => {
    console.log(file)
  }

  const signup = e => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <VStack spacing='5px'>
      <form onSubmit={signup}>
        <FormControl id='name' isRequired>
          <FormLabel>Name</FormLabel>
          <Input name='name' placeholder='Enter your name' onChange={updateForm} value={formData.name} />
        </FormControl>

        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name='email'
            type='email'
            placeholder='Enter your email'
            onChange={updateForm}
            value={formData.email}
          />
        </FormControl>

        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={updateForm}
              value={formData.password}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setshowPassword(prev => !prev)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id='confirmPassword' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              name='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm your password'
              onChange={updateForm}
              value={formData.confirmPassword}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setshowPassword(prev => !prev)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id='pic'>
          <FormLabel>Profile Picture</FormLabel>
          <Input border='none' name='pic' type='file' onChange={e => uploadImage(e.target.files[0])} accept='image/*' />
        </FormControl>

        <Button colorScheme='blue' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={imgUploading}>
          Sign Up
        </Button>
      </form>
    </VStack>
  )
}

export default Signup
