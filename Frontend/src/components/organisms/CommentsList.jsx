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
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
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

const Replies = styled.div`
  margin-left: 20px;
  border-left: 2px solid #eee;
  padding-left: 10px;
`;

const Loading = styled.div`
  text-align: center;
  color: #757575;
  padding: 16px;
`;

const NoComments = styled.div`
  text-align: center;
  color: #757575;
  padding: 16px;
`;

export const CommentsList = ({
  comments = [],
  onReply,
  onLike,
  onDislike,
  isLoading,
}) => {
  const [sortOption, setSortOption] = useState('most_recent');
  const [visibleComments, setVisibleComments] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const sortComments = (commentsArray, option) => {
    const sorted = [...commentsArray];
    switch (option) {
      case 'most_recent':
        return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      case 'most_liked':
        return sorted.sort((a, b) => (b.likes.count || 0) - (a.likes.count || 0));
      default:
        return sorted;
    }
  };

  const sortedComments = sortComments(comments, sortOption);
  const initialCommentLimit = 3;

  const displayedComments = isExpanded
    ? sortedComments
    : sortedComments.slice(0, visibleComments);

  const handleToggleComments = () => {
    if (isExpanded) {
      setVisibleComments(initialCommentLimit);
      setIsExpanded(false);
    } else {
      setVisibleComments(sortedComments.length);
      setIsExpanded(true);
    }
  };

  const showToggleButton = sortedComments.length > initialCommentLimit;

  return (
    <ListContainer>
      <CommentHeader
        commentCount={comments.length}
        currentSort={sortOption}
        onSortChange={setSortOption}
      />
      <CommentsContainer>
        {isLoading ? (
          <Loading>Cargando comentarios...</Loading>
        ) : displayedComments.length === 0 ? (
          <NoComments>No hay comentarios aún. ¡Sé el primero en comentar!</NoComments>
        ) : (
          displayedComments.map((comment) => (
            
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={onReply}
                onLike={onLike}
                onDislike={onDislike}
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