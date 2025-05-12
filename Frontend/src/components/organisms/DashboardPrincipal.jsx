import React, { useState } from 'react'
import styled from 'styled-components'
import photo from '../../assets/F1-Logo.png'
// import post from '../../assets/Prueba.jpg'
import { UserConnect } from '../molecules/UserConnect'
import { usePublications } from '../../hooks/usePublications'
import { ActionsButtons } from '../molecules/ActionsButtons'
import { CommentSection } from '../../pages/CommentSection'

export const DashboardPrincipal = () => {
  const {publications, isLoading, error} = usePublications()
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
  };

  console.log(selectedPublicationId);
  

  if (isLoading) {
    return <p>Cargando eventos...</p>;
  }

  if (error) {
    return <p>Error al cargar los eventos: {error}</p>;
  }

  return (
    <>
      <Contetn>
        
        <CardSection>
          {publications.length > 0 ? (
            publications.map(publication => (
            <Card key={publication.id}>
              <DataUser>
                <ProfilePicture src={photo}/>
                <div className="text">
                  <Label>{publication.userPublication}</Label>
                  <Time>2 h</Time>
                </div>
              </DataUser>
              <Data>
                <Title>{publication.title}</Title>
                <Paragraph>{publication.text}</Paragraph>
                <Hashtag href='#'>#{publication.course?.name} </Hashtag>
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

const Contetn = styled.div `
  background-color: transparent;
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
  margin: 35px 0;
`

const BtnContent = styled.div`
  margin: 30px 30px;
  display: flex;
  justify-content: center;
`