import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../hooks/Layout"
import { DashboardPrincipal } from "../components/organisms/DashboardPrincipal"
import { NewPublication } from "../components/organisms/NewPublication"

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
                }
            ],
            loader: async ()=> {
                return { message: 'Cargando datos' }
            }
        }
    ]
)

const MyRoute = ()=><RouterProvider router={router}/>
export default MyRoute