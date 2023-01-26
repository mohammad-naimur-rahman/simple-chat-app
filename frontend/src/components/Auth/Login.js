import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { API_URL } from "../../configs";

const Login = () => {
  const { push, replace } = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const initFormData = {
    email: "",
    password: "",
  };
  const toast = useToast();
  const [formData, setformData] = useState(initFormData);
  const [showPassword, setshowPassword] = useState(false);

  const [loading, setloading] = useState(false);

  const updateForm = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      setloading(false);

      setformData(initFormData);

      if (data.token) {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });

        Cookies.set("token", data.token, { expires: 30 });
        Cookies.set(
          "user",
          JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            pic: data.pic,
          }),
          { expires: 30 }
        );
        replace(from);
      } else {
        setloading(false);
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      push("/chats");
    }
  }, [push]);

  return (
    <VStack spacing="10px">
      <form onSubmit={loginUser}>
        <FormControl id="loginEmail" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={formData.email}
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            onChange={updateForm}
          />
        </FormControl>
        <FormControl id="loginPassword" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={formData.password}
              name="password"
              onChange={updateForm}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setshowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          type="submit"
          width="100%"
          style={{ marginTop: 15 }}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          mt={2}
          onClick={() => {
            setformData({
              email: "guest@example.com",
              password: "123456",
            });
          }}
        >
          Get Guest User Credentials
        </Button>
      </form>
    </VStack>
  );
};

export default Login;
