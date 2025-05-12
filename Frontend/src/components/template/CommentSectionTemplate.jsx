import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputSection = styled.div`
  margin-bottom: 24px;
`;

export const CommentSectionTemplate = ({ commentInput, commentsList }) => {
  return (
    <Container>
      <InputSection>{commentInput}</InputSection>
      {commentsList}
    </Container>
  );
};