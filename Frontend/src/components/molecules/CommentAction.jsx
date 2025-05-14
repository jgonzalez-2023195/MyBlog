import styled from 'styled-components';
import { Icon } from '@iconify/react'

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  
  &:hover {
  }
`;

const ActionCount = styled.span`
`;

const Separator = styled.div`
  width: 1px;
  height: 16px;
`;

export const CommentActions = ({
  likes,
  dislikes,
  onLike,
  onDislike,
  onReply,
  onMore,
}) => {
  return (
    <ActionsContainer>
      <ActionButton onClick={onLike}>
        <Icon 
          icon={likes ? "weui:like-filled" : "weui:like-filled"} 
          size={18} 
          style={{color: likes ? 'red' : '#000'}}
        />
        <ActionCount>1</ActionCount>
      </ActionButton>
      
      <ActionButton onClick={onDislike} active={dislikes}>
        <Icon 
          icon={dislikes ? "weui:like-outlined" : "weui:like-outlined"} 
          size={18} 
          style={{color: dislikes ? 'red' : '#000'}}
        />
        <ActionCount>0</ActionCount>
      </ActionButton>
      
      <Separator />
      
      <Button variant="text" onClick={onReply}>
        <Text color="secondary">Reply</Text>
      </Button>
      
      <Separator />
      
      <Button variant="icon" onClick={onMore}>
        <Icon name="MoreHorizontal" size={16} />
      </Button>
    </ActionsContainer>
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
