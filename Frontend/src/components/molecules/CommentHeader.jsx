import styled from 'styled-components';
import { useState } from 'react';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CommentCount = styled.span`
`;

const SortButton = styled.div`
  position: relative;
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  background-color: white;
  z-index: 10;
  overflow: hidden;
`;

const SortOptionButton = styled.div`
  
  &:hover {
    
  }
`;

export const CommentHeader = ({ commentCount, currentSort, onSortChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSortSelect = (sort) => {
    onSortChange(sort);
    setDropdownOpen(false);
  };
  
  const getSortLabel = (sort) => {
    switch (sort) {
      case 'most_recent': return 'Most recent';
      case 'most_liked': return 'Most liked';
      case 'oldest': return 'Oldest';
      default: return 'Most recent';
    }
  };
  
  return (
    <HeaderContainer>
      <LeftSection>
        <Text variant="h3" weight="bold">Comments</Text>
        <CommentCount>{commentCount}</CommentCount>
      </LeftSection>
      
      <SortButton>
        <Button 
          variant="text"
          icon={<Icon name="ArrowDownUp" size={16} />}
          onClick={toggleDropdown}
        >
          {getSortLabel(currentSort)}
        </Button>
        
        {dropdownOpen && (
          <SortDropdown>
            <SortOptionButton onClick={() => handleSortSelect('most_recent')}>
              <Text color={currentSort === 'most_recent' ? 'primary' : 'secondary'}>
                Most recent
              </Text>
            </SortOptionButton>
            <SortOptionButton onClick={() => handleSortSelect('most_liked')}>
              <Text color={currentSort === 'most_liked' ? 'primary' : 'secondary'}>
                Most liked
              </Text>
            </SortOptionButton>
            <SortOptionButton onClick={() => handleSortSelect('oldest')}>
              <Text color={currentSort === 'oldest' ? 'primary' : 'secondary'}>
                Oldest
              </Text>
            </SortOptionButton>
          </SortDropdown>
        )}
      </SortButton>
    </HeaderContainer>
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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;