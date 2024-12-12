import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {SubmitHandler, useForm} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {singUp} from "../../api";
import {useNavigate} from "react-router-dom";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormData>();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            await singUp(data.email, data.password);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-2">
            <Input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                    },
                })}
                type="email"
                label="Email"
                variant="bordered"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
            />
            <Input
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                })}
                label="Password"
                variant="bordered"
                endContent={
                    <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <EyeOff className="w-5 h-5 text-default-400"/>
                        ) : (
                            <Eye className="w-5 h-5 text-default-400"/>
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
            />
            <Input
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                })}
                label="Confirm Password"
                variant="bordered"
                type="password"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
            />
            <Button type="submit" color="primary" className="w-full">
                Create account
            </Button>
        </form>
    );
};

export default RegisterForm;
