import { useState } from 'react'
import styled from 'styled-components'

export function UserConnect({ children, username, initialIsFollowing  }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const handleClik = ()=> {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    return(
        <Card>
            <Header>
                <Picture 
                    src={`https://unavatar.io/${username}`} 
                    alt="Logo de verstappen.com" />
                <Info>
                    <strong>{children}</strong>
                    <Username>@{username}</Username>
                </Info>
            </Header>

            <aside>
                <FollowButton className={isFollowing ? 'is-following' : ''} onClick={handleClik}>
                    <span className='text'>{text}</span>
                    <span className='stopFollow'>Dejar de seguir</span>
                </FollowButton>
            </aside>
        </Card>
    )
}

const Card = styled.article`
    display: flex;
    align-items: center;
    color: #fff;
    font-size: .8rem;
    justify-content: space-between;
    gap: 50px;
    margin: 15px 0;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 4px;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
`

const Username = styled.span`
    opacity: .6;
`

const Picture = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 1000px;
`

export const FollowButton = styled.button`
  border: 1px solid #e8e8e8; /* Color de borde por defecto */
  background-color: #fff; /* Fondo por defecto */
  color: #000; /* Color de texto por defecto */
  width: 140px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  opacity: 1; /* Asegura que la opacidad no esté en 0 por defecto */

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Hover por defecto */
  }

  &.is-following {
    border: 1px solid #bbb;
    background: transparent;
    color: #fff;
  }

  &.is-following:hover {
    background-color: rgba(255, 0, 0, 0.178);
    color: red;
    border: 1px solid red;
    transition: 0.3s ease all;
    opacity: 1;

    .text {
      display: none;
    }

    .stopFollow {
      display: block;
    }
  }

  .text {
    display: block;
  }

  .stopFollow {
    display: none;
  }
`;

const Text = styled.span`
    display: block;
`