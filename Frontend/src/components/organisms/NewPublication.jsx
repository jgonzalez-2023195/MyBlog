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
                      <Status
                        loadin={loading}
                        image={image}
                      />
                      {/* Aquí se mostraría la simulación de la publicación */}
                  </PreviewArea>
          </RightColumn>
        </Container>
      </Wrapper>
    );
};

const Wrapper = styled.div`

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
    /* Estilos para el área de vista previa */
`;