import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./route-protection";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import { DashboardPage } from "../../pages/dashboard-page";
import { PostsPage } from "../../pages/post-page";
import { Layout } from "../../shared/ui/layout";
import {NotFound} from "../../shared/ui/not-found";
import { PostDetailsPage } from "../../pages/post-details-wrapper";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/posts",
                element: <PostsPage />,
            },
            {
                path: "/posts/:postId",
                element: <PostDetailsPage />,
            },
        ],
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);
