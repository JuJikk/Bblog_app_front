import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import { PlusSquare, BookOpen, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    const handleLeave = () => {
      localStorage.removeItem("user_access_token");
      window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar isBordered className="bg-white shadow-sm">
                <NavbarBrand>
                    <Link
                        to="/"
                        className="font-bold text-2xl text-primary hover:text-primary-dark transition-colors"
                    >
                        BlogApp
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavItem
                        to="/"
                        icon={<PlusSquare size={18} />}
                        label="New Post"
                    />
                    <NavItem to="/posts" icon={<BookOpen size={18} />} label="Posts" />
                    <NavbarItem>
                        <Button
                            color="default"
                            variant="light"
                            startContent={<LogOut size={18} />}
                            className="font-medium text-gray-700 hover:text-primary"
                            onClick={handleLeave} // Виклик функції
                        >
                            Leave
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

const NavItem = ({ to, icon, label }: any) => {
    const location = useLocation();
    const isActive =
        location.pathname === to ||
        (to === "/posts" && location.pathname.startsWith("/post/"));

    return (
        <NavbarItem isActive={isActive}>
            <Link to={to}>
                <Button
                    color={isActive ? "primary" : "default"}
                    variant={isActive ? "shadow" : "light"}
                    startContent={icon}
                    className={`font-medium ${
                        isActive ? "text-white" : "text-gray-700 hover:text-primary"
                    }`}
                >
                    {label}
                </Button>
            </Link>
        </NavbarItem>
    );
};
