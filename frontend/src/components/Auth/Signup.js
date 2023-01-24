import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../configs'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const { push } = useHistory()
  const toast = useToast()
  const initFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setformData] = useState(initFormData)
  const [imgUrl, setimgUrl] = useState('')

  const [showPassword, setshowPassword] = useState(false)
  const [imgUploading, setimgUploading] = useState(false)

  const updateForm = e => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const uploadImage = async file => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

    if (file === undefined) {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

      try {
        setimgUploading(true)
        const res = await fetch(url, {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        setimgUploading(false)
        toast({
          title: 'Image upload completed!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        })
        setimgUrl(data.url.toString())
      } catch (error) {
        setimgUploading(false)
        console.log(error)
        toast({
          title: 'Error uploading image',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        })
      }
    }
  }

  const signup = async e => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, pic: imgUrl }),
      })
      const data = await res.json()
      setformData(initFormData)
      if (data.token) {
        toast({
          title: 'Signup successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        })

        Cookies.set('token', data.token, { expires: 30 })
        Cookies.set(
          'user',
          JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            pic: data.pic,
          }),
          { expires: 30 }
        )
        push('/chats')
      } else {
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  useEffect(() => {
    if (Cookies.get('token')) {
      push('/chats')
    }
  }, [push])

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
