import { useState } from 'react';
import styled from 'styled-components';
import { CommentHeader } from '../molecules/CommentHeader';
import { CommentItem } from './CommentItem';

const ListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  width: 96%;
  padding: 16px;
  border: 1px solid #e0e0e0;
`;

const CommentsContainer = styled.div`
  margin-top: 16px;
  max-height: 400px; /* Altura máxima para permitir el desplazamiento */
  overflow-y: auto; /* Desplazamiento vertical solo para los comentarios */
  padding-right: 8px; /* Espacio para la barra de desplazamiento */
  
  /* Estilo para la barra de desplazamiento */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
`;

const LoadMoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #f28c38;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #d8701a;
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentsList = ({ comments = [], onReply }) => {
  const [sortOption, setSortOption] = useState('most_recent');
  const [visibleComments, setVisibleComments] = useState(3); // Número inicial de comentarios visibles
  const [isExpanded, setIsExpanded] = useState(false); // Estado para alternar entre "Show more" y "Show less"

  const sortComments = (commentsArray, option) => {
    const sorted = [...commentsArray];
    switch (option) {
      case 'most_recent':
        return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case 'most_liked':
        return sorted.sort((a, b) => b.likes.count - a.likes.count);
      default:
        return sorted;
    }
  };

  const sortedComments = sortComments(comments, sortOption);
  const initialCommentLimit = 3; // Límite inicial de comentarios

  // Determina cuántos comentarios mostrar según el estado de isExpanded
  const displayedComments = isExpanded 
    ? sortedComments 
    : sortedComments.slice(0, visibleComments);

  const handleToggleComments = () => {
    if (isExpanded) {
      // Si está expandido, colapsa a los comentarios iniciales
      setVisibleComments(initialCommentLimit);
      setIsExpanded(false);
    } else {
      // Si está colapsado, muestra todos los comentarios
      setVisibleComments(sortedComments.length);
      setIsExpanded(true);
    }
  };

  // Mostrar el botón solo si hay más comentarios para mostrar o si está expandido
  const showToggleButton = sortedComments.length > initialCommentLimit;

  return (
    <ListContainer>
      <CommentHeader
        commentCount={comments.length}
        currentSort={sortOption}
        onSortChange={setSortOption}
      />
      <CommentsContainer>
        {displayedComments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#757575' }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          displayedComments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={onReply}
            />
          ))
        )}
      </CommentsContainer>
      {showToggleButton && (
        <LoadMoreButton>
          <Button onClick={handleToggleComments} icon={<Icon />}>
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </LoadMoreButton>
      )}
    </ListContainer>
  );
};
