import styled from "styled-components"
import { SideBar } from "../components/organisms/SideBar"
import Grid from "@mui/material/Grid"
import { Outlet } from "react-router"

export const Layout = ({children}) => {
    return (
        <Wrapper container direction={'column'}>
            <MainWrapper container spacing={2} direction={'row'} >
                <Grid  size={{xs: 1.5, sm: 1, md: 1.5, lg: 1, xl: .7}}>
                    <Sidebar size={{xs: 1.5, sm: 1, md: 1.5, lg: 11, xl: 12}}>
                        <SideBar/>
                    </Sidebar>
                </Grid>
                <BodyWrapper size={{xs: 12, sm: 2, md: 10.5, lg: 10.5, xl: 11}}>
                    <Outlet/>
                    {children}
                </BodyWrapper>
            </MainWrapper>
        </Wrapper>
    )
}

const Wrapper = styled(Grid)`
    display: flex;
    flex-direction: column;
    background-color: ${({theme})=>theme.bg};
    height: 100vh;
`

const MainWrapper = styled(Grid)`
    background: ${({theme})=>theme.bgd};
    align-items: center;
    height: 100vh;
`

const Sidebar = styled(Grid)`
    background-color: rgba(30, 30, 30, 0.645);
    backdrop-filter: blur(50px);
    height: 100vh;
`

const BodyWrapper = styled(Grid)`
    width: 100%;
    height: 93%;
    grid-column: 0;
`
