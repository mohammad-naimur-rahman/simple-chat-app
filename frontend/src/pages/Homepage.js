import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import { Helmet } from 'react-helmet'

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Authentication | Chat App</title>
      </Helmet>
      <Container maxW='xl' centerContent>
        <Box
          d='flex'
          justifyContent='center'
          p={3}
          bg='white'
          w='100%'
          m='40px 0 15px 0'
          borderRadius='lg'
          borderWidth='1px'>
          <Text fontSize='4xl' fontFamily='Work sans' textAlign='center'>
            Chat App
          </Text>
        </Box>
        <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
          <Tabs isFitted variant='soft-rounded'>
            <TabList mb='1em'>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default Homepage
