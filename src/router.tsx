import { createHashRouter, Outlet, Navigate } from "react-router-dom";
import VacanciesPage from "./pages/VacanciesPage";
import VacancyPage from "./pages/VacancyPage";
import { ErrorPage } from "./pages/ErrorPage";

function VacanciesLayout() {
    return <Outlet />
}

export const router = createHashRouter([
    {
        path: '/',
        element: <Navigate to="/vacancies/moscow" />
    },
    {
        path: '/vacancies',
        element: <VacanciesLayout />,
        errorElement: <ErrorPage />,
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
])