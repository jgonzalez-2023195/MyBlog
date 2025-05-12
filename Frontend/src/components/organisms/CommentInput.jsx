import styled from 'styled-components';
import { FormattingToolbar } from '../molecules/FormattingToolbar';
import { InputExtendible } from '../atoms/InputExtendible';
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form';

const InputContainer = styled.form`
  width: 97%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .Close{
    &:hover{
      color: red;
      cursor: pointer;
    }
  }
  .error-message {
    color: red; // Estilo para el mensaje de error
    font-size: 12px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentInput = ({
  placeholder = "Add comment...",
  buttonText = "Submit",
  onSubmit,
  handleOpen,
  error
}, ref) => {
  
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm()
  
  const formSubmit = (data)=> {
    console.log(data);
    
    onSubmit(data)
    reset()
  }

  const disabledButton = !isValid

  const handleFormatClick = (format) => {
    console.log(`Format ${format} applied`);
  };
  
  return (
    <InputContainer onSubmit={handleSubmit(formSubmit)}>
      <Icon icon="line-md:close" width="18" height="18" onClick={handleOpen} className='Close'/>
      <>
        <Input
          placeholder={'Usuario'}
          type={'text'}
          ref={ref}
          {...register('user', {required: true})}
          error={errors.user}
        />
        {error && <p className="error-message">{errors.user}</p>}

        <InputExtendible
          multiline
          placeholder={placeholder}
          ref={ref}
          rows={3}
          {...register('text', {required: true})}
          error={errors.text}
        />
        {error && <p className="error-message">{errors.text}</p>}
        <BottomSection>
          <FormattingToolbar onFormatClick={handleFormatClick} />
          
          <Button 
            type='submit'
            disabled={disabledButton}
          >
            {buttonText}
          </Button>
        </BottomSection>
      </>
    </InputContainer>
  );
};

const Button = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    
  }
  &:disabled {
    background-color: #cccccc;
    color: black;
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #F05123;
    box-shadow: 0 0 0 2px rgba(240, 81, 35, 0.2);
  }
  
  &:disabled {
    background-color: #F5F5F5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #999999;
  }
`