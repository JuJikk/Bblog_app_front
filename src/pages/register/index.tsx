import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import RegisterForm from "../../modules/auth/ui/register-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
          <h2 className="text-2xl font-bold">Create your account</h2>
        </CardHeader>
        <CardBody>
          <RegisterForm />
          <div className="mt-4 text-center">
            <span className="text-default-400">Already have an account? </span>
            <Link href="/login" className="text-primary">
              Sign in
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
