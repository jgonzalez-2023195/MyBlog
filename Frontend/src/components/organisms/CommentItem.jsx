import { useState } from 'react';
import styled from 'styled-components';
import { UserInfo } from '../molecules/UserInfo';
import { CommentActions } from '../molecules/CommentAction';
import { CommentInput } from './CommentInput';

const CommentContainer = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const CommentContent = styled.div`
  margin: 8px 0;
  margin-left: 44px; /* Alineación con el avatar (32px de avatar + 12px de gap) */
  color: #333333;
  font-size: 16px;
  line-height: 1.5;
`;

const RepliesContainer = styled.div`
  margin-left: 32px;
  margin-top: 16px;
  padding-left: 16px;
  border-left: 2px solid #e0e0e0;
`;

const ReplyInputContainer = styled.div`
  margin-top: 16px;
  margin-left: 44px;
`;

const Text = styled.p`
  text-align: left;
  margin: 0;
`;

export const CommentItem = ({ comment, onReply, onLike, onDislike }) => {
  const [replyVisible, setReplyVisible] = useState(false);

  const toggleReply = () => {
    setReplyVisible(!replyVisible);
  };

  const handleReplySubmit = (content) => {
    onReply(comment.id, content); // Llama a onReply con el ID del comentario y el contenido
    setReplyVisible(false);
  };
  console.log(comment.user);
  
  return (
    <CommentContainer>
      <UserInfo user={comment.user} timestamp={comment.timeAgo} />
      <CommentContent>
        <Text>{comment.textComment}</Text>
      </CommentContent>
      <CommentActions
  likes={comment.likes}
  dislikes={comment.dislikes}
  onLike={() => onLike(comment.id)}
  onDislike={() => onDislike(comment.id)}
  onReply={toggleReply}
  onMore={() => {}}
/>
      {replyVisible && (
        <ReplyInputContainer>
          <CommentInput
            placeholder="Write a reply..."
            onSubmit={handleReplySubmit}
            buttonText="Reply"
          />
        </ReplyInputContainer>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <RepliesContainer>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </RepliesContainer>
      )}
    </CommentContainer>
  );
};