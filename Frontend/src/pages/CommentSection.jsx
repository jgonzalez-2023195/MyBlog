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
          name: data.user || 'AAA User', // Simula datos de usuario
        },
        content: commentData.text,
        replies: [], // Inicializa las respuestas si no vienen del backend
      };
      setComments([newComment, ...comments]);
    }
  }

  const handleReply = async (commentId, data) => {
    const newReply = {
        text: data.text,
        user: data.user || 'current-user', // Puedes obtener el usuario actual de otra manera si es necesario
        publication: publicationId,
        parentComment: commentId
    };
    console.log('enviando respuesta', newReply);
    
    const response = await addcomments(newReply)

    if (response.success && response.comment) {
      const newReply = {
        ...response.comment,
        user: { id: newReply.user, name: newReply.user },
        textComment: response.comment.textComment,
        replies: []
      };

      const updateCommentsWithReply = (commentsList) => {
        return commentsList.map(comments => {
          if (comments._id === commentId) {
            return {
              ...comments,
              replies: [...(comments.replies || []), newReply],
            };
          } else if (comments.replies?.length) {
            return {
              ...comments,
              replies: updateCommentsWithReply(comments.replies),
            };
          }
          return comments;
        });
      };
      setComments(updateCommentsWithReply(comments));
    }
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