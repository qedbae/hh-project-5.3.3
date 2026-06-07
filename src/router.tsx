import { createHashRouter, Navigate } from "react-router-dom";
import VacanciesPage from "./pages/VacanciesPage";
import VacancyPage from "./pages/VacancyPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Layout } from "./components/Layout/Layout";
import { AboutPage } from "./pages/AboutPage";

export const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {   
                index: true,
                element: <Navigate to="/vacancies/moscow" />,
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'vacancies',
                children: [
                    {
                        path: 'moscow',
                        element: <VacanciesPage />
                    },
                    {
                        path: 'petersburg',
                        element: <VacanciesPage />
                    },
                    {
                        path: ':id',
                        element: <VacancyPage />
                    }
                ]
            }
        ]
    }
])