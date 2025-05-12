import styled from 'styled-components';

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Avatar = styled.img`
  width: ${props => (props.size === 'sm' ? '24px' : props.size === 'lg' ? '48px' : '32px')};
  height: ${props => (props.size === 'sm' ? '24px' : props.size === 'lg' ? '48px' : '32px')};
  border-radius: 50%;
  background-color: #e0e0e0; /* Fondo por si no hay imagen */
  ${props => !props.src && 'content: url("https://via.placeholder.com/40")'}; /* Imagen por defecto */
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserName = styled.div`
  font-size: ${props => (props.size === 'lg' ? '20px' : props.size === 'sm' ? '14px' : '16px')};
  font-weight: ${props => (props.weight === 'medium' ? '500' : props.weight === 'bold' ? '700' : '400')};
  color: #333333;
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
`;

const Timestamp = styled.div`
  font-size: ${props => (props.size === 'sm' ? '12px' : '14px')};
  color: #757575;
`;

export const UserInfo = ({ user, timestamp, size = 'md', weight = 'medium' }) => {
  console.log(user);
  
  return (
    <UserInfoContainer>
      <UserDetails>
        <UserNameContainer>
          <UserName size={size} weight={weight}>
            {user}
          </UserName>
          
        </UserNameContainer>
        <Timestamp size={size}>
          {timestamp}
        </Timestamp>
      </UserDetails>
    </UserInfoContainer>
  );
};

const Text = styled.p`
  text-align: center;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    
  }
`;

const Icon = styled.div`
  width: ${props => (props.size === 14 ? '14px' : '16px')};
  height: ${props => (props.size === 14 ? '14px' : '16px')};
  background-color: #1a73e8; /* Azul para el ícono de verificación */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;