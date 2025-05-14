import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import { Input } from '../atoms/Input';
import { ImgUpload } from '../molecules/ImgUpload';
import { usePublication } from '../../hooks/usePublication';
import toast from 'react-hot-toast';
import Select from 'react-select'
import { SelectCourse } from '../molecules/SelectCourse';

export const NewPublication = () => {
    const preset_name = 'aslkfd';
    const cloud_name = 'dzydnoljd';
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const { publications } = usePublication();


    const { register, handleSubmit, watch, control, formState: { errors, isValid }, reset } = useForm();


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
    }

    const userPublication = watch('userPublication', '');
    const text = watch('text', '');
    const hashtags = watch('hashtags', '');
    const course = watch('course', null)
    const title = watch('title', '');

    const funcionPersonalizedSubmit = async (data) => {
        // Aquí puedes llamar a la función publications del hook// Suponiendo que tienes un campo para el usuario // Si tienes un curso, puedes obtenerlo de otra parte // Si tienes hashtags, puedes obtenerlos de otra parte
        // Llamar a la función publications
        const mediPicture = image;
        const courseId = data.course?.value
        await publications(data, mediPicture, courseId);
        reset();
    }

    const buttonDisabled = !isValid || loading

    return (
      <Wrapper>
          <HeaderSection>
            <h2>Create new post</h2>
            <Button type='submit' form='publicationForm' disabled={buttonDisabled}>Guardar</Button>
          </HeaderSection>
        <Container>
          <LeftColumn id='publicationForm' onSubmit={handleSubmit(funcionPersonalizedSubmit)}>
                <UserInfo>
                  <Input
                    text={'Usuario'}
                    type={'text'}
                    {...register('userPublication', { required: true})}
                    error={errors.userPublication}
                  />
                </UserInfo>
                <PostForm>
                    <Input
                        text={'Title'}
                        type={'text'}
                        {...register('title')}
                    />
                    <Input
                        text={'Post text'}
                        type={'text'}
                        {...register('text')}
                    />
                    <Input
                      text={'Hashtags'}
                      type={'text'}
                      {...register('hashtags')}
                    />
                    <SelectCourse
                      control={control}
                      name={'course'}
                      rules={{ required: true }}
                      error={errors.course}
                    />
                    <AttachImageSection>
                        <h3>Attached Image</h3>
                        
                        <ImgUpload
                            onImageUpload={uploadImage}
                        />
                    </AttachImageSection>
                </PostForm>
          </LeftColumn>
          <RightColumn>
                  <h2>Preview</h2>
                  <PreviewArea>
                    <Card>
                        <DataUser>
                            <ProfilePicture/>
                            <div className="text">
                                <Label>{userPublication || 'Usuario'}</Label>
                                <Time>2 h</Time>
                            </div>
                        </DataUser>
                                  <Data>
                                    <Title>{title || 'Titulo'}</Title>
                                    <Paragraph>{text || 'Texto'}</Paragraph>
                                    <Hashtag href="#">#{course?.label || 'Sin curso'} </Hashtag>
                                    <Hashtag href='#'>{hashtags || '#Hashtags'}</Hashtag>
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

const LeftColumn = styled.form`
    flex: 1;
    margin-right: 20px;
    margin-left: 11px;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;


const Wrapper = styled.div`

`

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  width: 100px;
  height: 50px;
  font-size: 15px;
  font-style: italic;
  &:hover {
    background-color: #2d2d2d;
    cursor: pointer;
  }
  &:disabled {
    background-color: #cccccc;
    color: black;
    cursor: not-allowed;
    opacity: 0.4;
  }
`

const Card = styled.div`
  width: 55rem;
  height: 40rem;
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
  background-color: transparent;
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
  background-color: transparent;
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


const RightColumn = styled.div`
    flex: 1;
    background-color: transparent;
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

const PreviewArea = styled.div`
    height: 50px;
`;