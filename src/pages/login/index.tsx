import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import LoginForm from "../../modules/auth/ui/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center my-auto h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
          <h2 className="text-2xl font-bold">Sign in to your account</h2>
        </CardHeader>
        <CardBody>
          <LoginForm />
          <div className="mt-4 text-center">
            <span className="text-default-400">Don't have an account? </span>
            <Link href="/register" className="text-primary">
              Sign up
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
