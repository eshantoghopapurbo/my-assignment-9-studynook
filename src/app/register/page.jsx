"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const RegisterPage = () => {  
      const handleGoogleSignIn =async()=>{
      await authClient.signIn.social({
    provider: "google",
  });
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      name: user.name,
      password: user.password,
      image: user.image,
    });
      
    console.log({data,error});

    // Error handle
    if (error) {
      toast.error(error.message || "Something went wrong");
      return;
    }

    // Success handle
    if (data) {
      toast.success("Registration successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome! Register Here
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create an account to access room booking features.
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">

          {/* Name */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">
              Name
            </Label>

            <Input
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Image URL */}
          <TextField
            isRequired
            name="image"
            type="url"
            validate={(value) => {
              if (!value.startsWith("http")) {
                return "Please enter a valid image URL";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">
              Image URL
            </Label>

            <Input
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">
              Email
            </Label>

            <Input
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">
              Password
            </Label>

            <Input
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            <Description className="text-xs text-gray-400">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          <div className="mt-2 flex flex-col w-full">

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-5 mb-5 rounded-none hover:bg-blue-500"
            >
              <Check className="h-5 w-5" />
              Create Account
            </Button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-t border-gray-300" />

              <span className="px-3 text-sm font-medium uppercase text-gray-500">
                OR
              </span>

              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google */}
            <Button
               onClick={handleGoogleSignIn}
              variant="bordered"
              className="w-full mt-5 mb-5 border-1 rounded-none hover:bg-blue-500"
            >
              <FcGoogle />
              Login with Google
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;