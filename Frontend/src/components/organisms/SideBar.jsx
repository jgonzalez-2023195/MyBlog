import { NavLink } from 'react-router'
import React from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { useThemeStore } from "../../store/ThemeStore"
import logo from '../../assets/F1-Logo.png'
import Grid from "@mui/material/Grid"


export const SideBar = () => {
    const { setTheme } = useThemeStore()
    return (
        <Container container direction={'column'}>
            <Grid size={{ xs: 1, sm: 2, md: 4, lg: 12, xl: 12}}>
                <section className="sidebarSection1">
                    <Logo>
                        <Img src={logo}/>
                    </Logo>
                    <div className="options">
                        <NavLink to={'/'}>
                            <Icon icon="majesticons:home" className='Icon' />
                        </NavLink>
                        <NavLink to={'/new'}>
                            <Icon icon="arcticons:daily-dev" className='Icon' />
                        </NavLink>
                        <Icon icon="icon-park-outline:search" className='Icon' />
                    </div>
                </section>
            </Grid>
            <Divider />
            <Grid size={{ xs: 1, sm: 2, md: 4, lg: 12, xl: 12}}>
                <section className="sidebarSection2">
                    {/* <label htmlFor="">Explorar</label> */}
                    <div className="options">
                        <Icon icon="hugeicons:resources-add" className='Icon' />
                        <Icon icon="subway:video-1" className='Icon' />
                    </div>
                    <div className="subSide">
                        <Icon icon="tabler:user-filled" className='Icon' />
                        <Icon icon="mdi:post-it-note-add" className='Icon' />
                        <Icon icon="tabler:message-code" className='Icon' />
                        <Icon icon="lucide:settings-2" className='Icon' />
                    </div>
                    <ToggleSection>
                        <button onClick={()=> setTheme()}>Toogle</button>
                    </ToggleSection>
                </section>
            </Grid>
        </Container>
    )
}

const Container = styled(Grid)`
    padding-top: 25px;
    .sidebarSection1{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 50%;
        gap: 35px;
        margin-bottom: 50px;
    }

    .options{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .Icon{
        width: 30px;
        height: 30px;
        color: #d0ccd4;
    }

    .sidebarSection2{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 40vh;
        gap: 5px;
    }
    
    .subSide{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
        gap: 15px;
    }
`

const ToggleSection = styled.div`
    height: auto;
`

const Logo = styled.div`
    background-color: rgba(30, 30, 30, 0.636);
    backdrop-filter: blur(50px);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #eb0404, 0 0 0 4px #fff;
    `

const Img = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: contain;
`

const Divider = styled.div`
    height: 1px;
    width: 30%;
    background: ${({ theme }) => theme.divider};
    margin: 0 auto;
`;