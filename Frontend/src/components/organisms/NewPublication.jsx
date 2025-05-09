import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../atoms/Input';
import { ImgUpload } from '../molecules/ImgUpload';
import { Status } from '../molecules/Status';
import toast from 'react-hot-toast';

export const NewPublication = () => {
    const preset_name = 'aslkfd';
    const cloud_name = 'dzydnoljd';
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);
        setLoading(true);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });
            const file = await response.json();
            setImage(file.secure_url);
            console.log(file.secure_url);
            setLoading(false);
            toast.success('Imagen subida con exito');
        } catch (e) {
            setLoading(false);
            toast.error('Error al subir la imagen');
            console.error(e);
        }
    };

    return (
      <Wrapper>
          <HeaderSection>
            <h2>Create new post</h2>
            <button>Guardar</button>
          </HeaderSection>
        <Container>
          <LeftColumn>
                <UserInfo>
                  <Input
                    text={'Usuario'}
                    type={'text'}
                  />
                </UserInfo>
                <PostForm>
                    <Input
                        text={'Title'}
                        type={'text'}
                    />
                    <Input
                        text={'Post text'}
                        type={'text'}
                    />
                    <AttachImageSection>
                        <h3>Attached Image</h3>
                        
                        <ImgUpload
                            onImageUpload={uploadImage}
                        />
                    </AttachImageSection>
                    <ConnectWebsiteSection>
                        <h3>Connect website</h3>
                        <Input
                            text={'http://'}
                            type={'url'}
                        />
                    </ConnectWebsiteSection>
                </PostForm>
          </LeftColumn>
          <RightColumn>
                  <h2>Preview</h2>
                  <PreviewArea>
                      <p>Network preview</p>
                    <Card>
                        <DataUser>
                            <ProfilePicture/>
                            <div className="text">
                                <Label></Label>
                                <Time>2 h</Time>
                            </div>
                        </DataUser>
                                  <Data>
                                    <Paragraph></Paragraph>
                                    <Hashtag href='#'></Hashtag>
                                  </Data>
                                  <Image>
                                    {loading ? (
                                        <p>Cargando...</p>
                                    ) : (
                                        <Img src={image}/>
                                    )}
                                  </Image>
                                  <Accions>
                                    <BtnContent>
                                      
                                    </BtnContent>
                                  </Accions>
                                </Card>
                  </PreviewArea>
          </RightColumn>
        </Container>
      </Wrapper>
    );
};

const Wrapper = styled.div`

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

const Container = styled.div`
    display: flex;
`;

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const LeftColumn = styled.div`
    flex: 1;
    margin-right: 20px;
    margin-left: 11px;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

const RightColumn = styled.div`
    flex: 1;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
`;

const UserInfo = styled.div`
    margin-bottom: 40px;
`;

const PostForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const AttachImageSection = styled.div`
  margin-top: -20px;
`;

const ConnectWebsiteSection = styled.div`
    margin-bottom: 1px;
`;

const PreviewArea = styled.div`
    
`;