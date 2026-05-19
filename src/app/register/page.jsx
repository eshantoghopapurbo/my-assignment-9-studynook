"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import React from 'react';
import { toast } from "react-toastify";

const RegisterPage = () => {
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const user = Object.fromEntries(formData.entries());
    const {data,error} =await authClient.signUp.email({
        email:user.email,
        name:user.name,
        password:user.password,
        image:user.image
    })
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
            <Label className="text-sm font-medium text-gray-700">Name</Label>
            <Input 
              placeholder="your name" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <FieldError className="text-xs font-medium text-red-500" />
          </TextField>

          <TextField
            isRequired
            name="image"
            type="url"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700 capitalize">Image</Label>
            <Input 
              placeholder="image url" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <FieldError className="text-xs font-medium text-red-500" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input 
              placeholder="john@example.com" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <FieldError className="text-xs font-medium text-red-500" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input 
              placeholder="Enter your password" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Description className="text-xs text-gray-400">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs font-medium text-red-500" />
          </TextField>

          <div className="mt-2 flex flex-col">
            <Button 
              type="submit" 
              variant="solid" 
              className="rounded-none mt-5 mb-5 border-1 hover:bg-blue-500 w-full"
            >
              <Check className="h-6 w-6" />
              Create Account
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;