import { useState } from 'react';
import { CommentInput } from '../components/organisms/CommentInput';
import { CommentsList } from '../components/organisms/CommentsList';
import { CommentSectionTemplate } from '../components/template/CommentSectionTemplate';
import styled from 'styled-components';
import { useComment } from '../hooks/useComment';

export const CommentSection = ({handleOpen, publicationId}) => {
  const [comments, setComments] = useState([]); // Inicializa vacío
  const { addcomments } = useComment()

  const handleAddComment = async (data) => {
    const commentData = {
      text: data.text,
      user: data.user || 'current-user', // Usa el ID del usuario autenticado
      publication: publicationId,
    };
    console.log('recibido', publicationId);
    

    const response = await addcomments(commentData);
    if (response.success) {
      // Agregar el comentario localmente para mostrarlo inmediatamente
      const newComment = {
        id: response.comment._id || `comment-${Date.now()}`,
        user: {
          id: commentData.user,
          name: data.user || 'AAA User', // Ajusta según datos reales
          avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
        },
        content: commentData.text, // Usamos "content" en el frontend, pero enviamos "text" al backend
        timestamp: new Date(),
        likes: { count: 0, userAction: false },
        dislikes: { count: 0, userAction: false },
        replies: [],
        timeAgo: 'Just now',
      };
      setComments([newComment, ...comments]);
    }
  }

  const handleReply = (commentId, content) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      user: {
        id: 'current-user',
        name: 'AAAAAAAAAAAAAAAAAAAA User',
        avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      },
      content: content,
      timestamp: new Date(),
      likes: { count: 0, userAction: false },
      dislikes: { count: 0, userAction: false },
      timeAgo: 'Just now'
    };

    const updateReplies = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        } else if (comment.replies?.length) {
          return {
            ...comment,
            replies: updateReplies(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(updateReplies(comments));
  };

  return (
    <Container>
      <CommentSectionTemplate
        commentInput={<CommentInput handleOpen={handleOpen} onSubmit={handleAddComment} />}
        commentsList={<CommentsList comments={comments} onReply={handleReply} />}
      />
      
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(25px);
  height: 100vh;
  width: 100%;
  z-index: 100;
  top: 0;
  right: 0;
  
`