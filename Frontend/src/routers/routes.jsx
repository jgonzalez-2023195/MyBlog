import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../hooks/Layout"
import { DashboardPrincipal } from "../components/organisms/DashboardPrincipal"
import { NewPublication } from "../components/organisms/NewPublication"
import { DashboardFilters } from "../components/organisms/DashboardFilters"

const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: Layout,
            errorElement: <div>404</div>,
            children: [
                {
                    index: true,
                    Component: DashboardPrincipal,
                    errorElement: <div>Algo salio mal</div>
                },
                {
                    path: '/new',
                    Component: NewPublication,
                    errorElement: <div>otra vez salio mal</div>
                },
                {
                    path: '/filters',
                    Component: DashboardFilters,
                    errorElement: <div>otra vez salio mal de mal</div>
                }
            ],
            loader: async ()=> {
                return { message: 'Cargando datos' }
            }
        },
        {
            path: '*',
            errorElement: <div>404 NOT FOUND</div>
        }
    ]
)

const MyRoute = ()=><RouterProvider router={router}/>
export default MyRoute