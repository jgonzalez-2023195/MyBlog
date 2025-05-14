import React, { useState } from 'react'
import styled from 'styled-components'
// import post from '../../assets/Prueba.jpg'
import { UserConnect } from '../molecules/UserConnect'
import { usePublications } from '../../hooks/usePublications'
import { ActionsButtons } from '../molecules/ActionsButtons'
import { CommentSection } from '../../pages/CommentSection'
import { Avatar } from '../../utils/Avatar'
import { ScaleLoader } from 'react-spinners'

export const DashboardPrincipal = ({ publications: externalPublications }) => {
  const {publications: defaultPublication, isLoading, error} = usePublications()
  const publications = externalPublications || defaultPublication;
  const [open, setOpen] = useState(false)
  const [selectedPublicationId, setSelectedPublicationId] = useState(null)
  
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
      isFollowing: true,
    },
    {
      userName: 'freecodecamp',
      name: 'FreeCodeCamp',
      isFollowing: false,
    },
]

  const handleOpen = (publicationId) => { 
    setSelectedPublicationId(publicationId)// Guardar el ID de la publicación seleccionada
    setOpen(!open); // Abrir CommentSection
  }
  

  if (isLoading) {
    return <p><ScaleLoader color='white'/></p>;
  }

  if (error) {
    return <Msg>Error al cargar los eventos</Msg>;
  }

  function tiempoDesdeCreacion(createdAt) {
    const ahora = new Date();
    const diferencia = ahora - new Date(createdAt); // Diferencia en milisegundos
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    if (segundos < 60) {
        return "justo ahora";
    } else if (minutos < 60) {
        return `hace ${minutos} m`;
    } else if (horas < 24) {
        return `hace ${horas} h`;
    } else {
        return `hace ${Math.floor(horas / 24)} d`; // Opcional: días
    }
  }

  return (
    <>
      <TitleComponent>{externalPublications ? 'Publicaciones filtradas' : 'Todas las Publicaciones'}</TitleComponent>
      <Contetn>
        <CardSection>
          {publications.length > 0 ? (
            publications.map(publication => (
            <Card key={publication.id}>
              <DataUser>
                <ProfilePicture>
                  {Avatar(publication.userPublication)}
                </ProfilePicture>
                <div className="text">
                  <Label>{publication.userPublication}</Label>
                  <Time>{tiempoDesdeCreacion(publication.createdAt)}</Time>
                </div>
              </DataUser>
              <Data>
                <Title>{publication.title}</Title>
                <Paragraph>{publication.text}</Paragraph>
                <Hashtag href='#'>#{publication.course?.name || 'Curso_no_asignado'} </Hashtag>
                <Hashtag href='#'>{publication.hashtags}</Hashtag>
              </Data>
              <Image>
                <Img src={publication.mediaPicture}/>
              </Image>
              <Accions>
                <BtnContent>
                  <ActionsButtons
                    onClickHandler={() => handleOpen(publication._id)}
                  />
                </BtnContent>
              </Accions>
            </Card>
            ))
          ) : (
            <p>No hay nada</p>
          )
        }
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
      {open && <CommentSection
                  handleOpen={handleOpen}
                  publicationId={selectedPublicationId}// Pasar el publicationId
                />}
    </>
  )
}

const Msg = styled.p`
  color: ${({theme})=>theme.text};
  font-size: 30px;
  font-style: italic;
`

const Contetn = styled.div `
  background-color: transparent;
  display: flex;
  gap: 60px;
`

const TitleComponent = styled.h1`
  color: ${({theme})=>theme.text};
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
  color: ${({theme})=>theme.text}
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

const Data = styled.div`
  margin: 40px 30px 5px 30px;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
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

const ProfilePicture = styled.div`
  width: 60px;
  height: 60px;
  background-color: transparent;
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
  margin: 35px 0;
`

const BtnContent = styled.div`
  margin: 30px 30px;
  display: flex;
  justify-content: center;
`