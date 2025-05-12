import styled from 'styled-components';
import { Icon } from '@iconify/react'

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  
  &:hover {
    
  }
  
  &:focus {
    outline: none;
  }
`;

export const FormattingToolbar = ({ onFormatClick }) => {
  return (
    <ToolbarContainer>
      <ToolbarButton onClick={() => onFormatClick('bold')} title="Bold">
        <Icon icon="octicon:bold-24" width="18" height="18" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('italic')} title="Italic">
        <Icon icon="tabler:italic" width="18" height="18" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('underline')} title="Underline">
        <Icon icon="tabler:underline" width="18" height="18" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('link')} title="Link">
        <Icon icon="solar:link-broken" width="18" height="18" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('image')} title="Image">
        <Icon icon="ph:image-fill" width="256" height="256" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('emoji')} title="Emoji">
        <Icon icon="fa-solid:smile" width="496" height="512" />
      </ToolbarButton>
      
      <ToolbarButton onClick={() => onFormatClick('mention')} title="Mention">
        <Icon icon="bx:at" width="18" height="18" />
      </ToolbarButton>
    </ToolbarContainer>
  );
};
