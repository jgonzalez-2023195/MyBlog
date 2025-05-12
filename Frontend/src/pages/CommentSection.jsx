import { useEffect, useState } from 'react';
import { CommentInput } from '../components/organisms/CommentInput';
import { CommentsList } from '../components/organisms/CommentsList';
import { CommentSectionTemplate } from '../components/template/CommentSectionTemplate';
import styled from 'styled-components';
import { useComment } from '../hooks/useComment';
import { useComments } from '../hooks/useComments'

export const CommentSection = ({handleOpen, publicationId}) => {
  const { addcomments } = useComment()
  const { getComments: fetchedComments, isLoading: loadingComments, error: errorComments } = useComments(publicationId)
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  if (loadingComments) {
    return <p>Cargando comentarios...</p>;
  }

  if (errorComments) {
    return <p>Error al cargar los comentarios.</p>;
  }// Inicializa vacío

  const handleAddComment = async (data) => {
    const commentData = {
      text: data.text,
      user: data.user || 'current-user',
      publication: publicationId,
      parentComment: data.parentComment, // Si estás manejando respuestas desde aquí
    };
    console.log('enviando comentario', commentData);

    const response = await addcomments(commentData);
    if (response.success && response.comment) {
      const newComment = {
        ...response.comment, // Mantén las propiedades del comentario creado en el backend
        likes: { count: 0, userAction: false },
        dislikes: { count: 0, userAction: false },
        user: {
          id: commentData.user,
          name: data.user || 'AAA User',
          avatar: 'https://randomuser.me/api/portraits/men/43.jpg', // Simula datos de usuario
        },
        content: commentData.text, // Asegúrate de usar la propiedad correcta para el contenido
        timestamp: new Date(),
        timeAgo: 'Just now',
        replies: [], // Inicializa las respuestas si no vienen del backend
      };
      setComments([newComment, ...comments]);
    }
  }

  const handleReply = (commentId) => {
    const newReply = {
      
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