import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/schemas";
import { logIn } from "../../api";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await logIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mb-2"
    >
      <Input
        {...register("email")}
        type="email"
        label="Email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        {...register("password")}
        label="Password"
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5 text-default-400" />
            ) : (
              <Eye className="w-5 h-5 text-default-400" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button type="submit" color="primary" className="w-full">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
