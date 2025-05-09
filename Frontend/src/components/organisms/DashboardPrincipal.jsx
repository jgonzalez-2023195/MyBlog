import React from 'react'
import styled, { keyframes } from 'styled-components'
import photo from '../../assets/F1-Logo.png'
import post from '../../assets/Prueba.jpg'
import { Icon } from '@iconify/react'
import { UserConnect } from '../molecules/UserConnect'

export const DashboardPrincipal = () => {
  const users = [
    {
        userName: 'apple',
        name: 'Apple',
        isFollowing: false
    },
    {
        userName: 'Android',
        name: 'Android',
        isFollowing: false,
    },
    {
        userName: 'meta.com',
        name: 'Meta',
        isFollowing: false,
    },
    {
        userName: 'microsoft',
        name: 'Microsoft',
        isFollowing: false,
    },
    {
      userName: 'kinal.org.gt',
      name: 'Fundación Kinal',
      isFollowing: false,
    },
    {
      userName: 'freecodecamp',
      name: 'FreeCodeCamp',
      isFollowing: false,
    },
]

  return (
    <Contetn>
      <CardSection>
        <Card>
          <DataUser>
            <ProfilePicture src={photo}/>
            <div className="text">
              <Label>F1</Label>
              <Time>2 h</Time>
            </div>
          </DataUser>
          <Data>
            <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque saepe recusandae harum perspiciatis nobis reprehenderit, ipsam nisi suscipit minima maiores molestias doloremque vel quos, voluptatum in commodi excepturi iure perferendis.</Paragraph>
            <Hashtag href='#'>#Formula1</Hashtag>
          </Data>
          <Image>
            <Img src={post}/>
          </Image>
          <Accions>
            <BtnContent>
              
            </BtnContent>
          </Accions>
        </Card>
        <Card>
          <DataUser>
            <ProfilePicture src={photo}/>
            <div className="text">
              <Label>F1</Label>
              <Time>2 h</Time>
            </div>
          </DataUser>
          <Data>
            <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque saepe recusandae harum perspiciatis nobis reprehenderit, ipsam nisi suscipit minima maiores molestias doloremque vel quos, voluptatum in commodi excepturi iure perferendis.</Paragraph>
            <Hashtag href='#'>#Formula1</Hashtag>
          </Data>
          <Image>
            <Img src={post}/>
          </Image>
          <Accions>
            <BtnContent>
              
            </BtnContent>
          </Accions>
        </Card>
      </CardSection>
      <ConnectPeopleSection>
        <LabelS>
          <Label>Basado en tu contenido</Label>
        </LabelS>
        {
          users.map(user => {
            const { userName, name, isFollowing } = user
            return (
            <UserConnect
            key={userName}
            username={userName}
            initialIsFollowing={isFollowing}
            >
              {name}
            </UserConnect>
            )
          })
        }
      </ConnectPeopleSection>
    </Contetn>
  )
}

const Contetn = styled.div `
  background-color: #858282;
  display: flex;
  gap: 60px;
`

const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: scroll;
  height: 850px;
  scrollbar-width: none;
  margin-left: 50px;
`

const ConnectPeopleSection = styled.section`
  margin: 0 20px;
  height: 25em;
`

const LabelS = styled.div`
  margin-bottom: 30px;
`

const Card = styled.div`
  width: 55rem;
  height: 45rem;
  background-color: #fff;
  border-radius: 30px;
`

const DataUser = styled.div`
  margin: 30px 30px;
  gap: 15px;
  display: flex;
  align-items: center;
  .text {
    display: flex;
    flex-direction: column;
  }
`

//Animaciones LikeBtn
const movingBorders = keyframes`
  0% {
    border-color: #fce4e4;
  }
  50% {
    border-color: #cc0d0d;
  }
  90% {
    border-color: #ff0404;
  }
`;

const beatingHeart = keyframes`
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.15);
  }
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.15);
  }
  60% {
    transform: scale(1);
  }
`;

const LikeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 25px 20px 22px;
  box-shadow: rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background-color: #e8e8e8;
  border-color: #ffe2e2;
  border-style: solid;
  border-width: 9px;
  border-radius: 35px;
  font-size: 25px;
  cursor: pointer;
  font-weight: 900;
  color: rgb(134, 124, 124);
  font-family: monospace;
  transition:
    transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5),
    border-color 400ms ease-in-out,
    background-color 400ms ease-in-out;
  word-spacing: -2px;
  position: relative; /* Necesario para posicionar los iconos .filled */

  &:hover {
    background-color: #eee;
    transform: scale(1.05);
    animation: ${movingBorders} 3s infinite;

    .empty {
      opacity: 0;
    }

    .filled {
      opacity: 1;
      animation: ${beatingHeart} 1.2s infinite;
    }
  }

  svg { /* Estilos para ambos iconos (empty y filled) */
    margin-right: 11px;
    color: rgb(255, 110, 110);
    transition: opacity 100ms ease-in-out;

    &.filled {
      position: absolute;
      opacity: 0;
      top: 20px;
      left: 22px;
      margin-right: 0; /* Evita el margen adicional para el icono posicionado absolutamente */
    }
  }
`

const Data = styled.div`
  margin: 40px 30px 5px 30px;
  background-color: #00ff40;
`

const Paragraph = styled.p`
  font-size: 18px;
`

const Hashtag = styled.a`
  font-size: 18px;
  font-style: italic;
  color: blue;
`

const Image = styled.div`
  background-color: yellow;
  width: 100%;
  height: 21em;
  display: flex;
  justify-content: center;
`

const Img = styled.img`
  width: auto;
  height: 21em;
  object-fit: contain;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
`

const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 20%;
  object-fit: contain;
`

const Label = styled.label`
  margin-top: 1px;
  font-size: 19px;
  font-weight: bold;
`

const Time = styled.span`
  font-size: 14px;
  color: gray;
`

const Accions = styled.div`
  background-color: peru;
  margin: 35px 0;
`

const BtnContent = styled.div`
  margin: 30px 30px;
`