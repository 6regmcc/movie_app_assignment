import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "/src/routes/root.jsx"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import DiscoverPage from "./routes/discover";
import {loader as discoverLoader} from "./routes/discover.jsx"
import TemporaryDrawer from "./routes/testpage.jsx";
import {sampleMovie} from "./sampleData.js";
import App from "./App.jsx"
import DetailsPage from "./routes/detailsPage.jsx"
import sampleDetails from "./sampleMovieDetails.js"
import {loader as movieDetailsLoader} from "./routes/detailsPage.jsx"
import TestPage from "./routes/testpage.jsx";
import MoviesContextProvider from "./context/movieContext.jsx"
import { createClient } from '@supabase/supabase-js'
import SignIn from "./routes/login.jsx"
import SignUp from "./routes/signUp.jsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import Logout from "./routes/logout.jsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/discover",
                element: <DiscoverPage />,
                loader: discoverLoader
            },
            {
                path: "/movie/:id",
                element: <DetailsPage />,
                loader: movieDetailsLoader
            }
        ]
    },
    {
        path: "/testpage",
        element: <TestPage />
    },
    {
        path: "/login",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/logout",
        element: <Logout />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <MoviesContextProvider>
                <RouterProvider router={router} />
            </MoviesContextProvider>
        </React.StrictMode>
        <ReactQueryDevtools />
    </QueryClientProvider>
);