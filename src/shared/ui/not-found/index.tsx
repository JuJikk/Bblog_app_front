import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Home, AlertTriangle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-76px)] text-center px-4">
      <AlertTriangle size={64} className="text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button
          color="primary"
          variant="shadow"
          size="lg"
          startContent={<Home size={20} />}
          className="font-medium"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

