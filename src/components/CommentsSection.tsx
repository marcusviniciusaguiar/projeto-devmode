import { useState } from "react";
import type { Comment } from "../types/Comment";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.background};
  padding-top: ${theme.spacing.sm};
`

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const TextArea = styled.textarea`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  border: none;
  border-radius: 6px;
  padding: ${theme.spacing.sm};
  font-family: inherit;
  resize: vertical;
`

const CharCount = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.primary};
`

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

const CommentItem = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.sm};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const CommentAuthor = styled.strong`
  color: ${theme.colors.primary};
  font-size: 0.9rem;
`

const CommentDate = styled.span`
  font-size: 0.7rem;
  opacity: 0.6;
`

const SubmitComment = styled.button`
  align-self: flex-start;
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 6px;
  cursor: pointer;
  &:hover { filter: brightness(1.2); }
`

const DeleteCommentButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  font-size: 0.75rem;
  text-decoration: underline;
`


function CommentsSection({ projectId } : {projectId: string}) {

    const [commentsArray, setCommentsArray] = useState<Comment[]>(JSON.parse(localStorage.getItem("comments") || "[]"));
    const currentProjectComments = commentsArray.filter((comment: Comment) => comment.projectId === projectId);
    const { user } = useAuth();
    const { showToast } = useToast();

    const [text, setText] = useState("");
    const [textLength, setTextLength] = useState(0);


    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setTextLength(event.target.value.length);
    }


    const handleDelete = (commentId: string) => {
        const newCommentsArray = commentsArray.filter(comment => comment.id !== commentId);

        setCommentsArray(newCommentsArray);
        localStorage.setItem("comments", JSON.stringify(newCommentsArray));
    }


    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const author = user ? user.name : "Anônimo";

        if(text.length > 300) {
            showToast("O comentário deve ter no máximo 300 caracteres");
            return;
        }

        const newComment = {
            id: Date.now().toString(),
            projectId: projectId,
            author: author,
            text: text,
            createdAt: Date.now().toString()
        }

        const newcommentsArray = [newComment, ...commentsArray];
        setCommentsArray(newcommentsArray);
        localStorage.setItem("comments", JSON.stringify(newcommentsArray));

        setText("");
    }


    return (
        <Comments>
            <h3>Comentários</h3>
            <CommentForm onSubmit={handleSubmit}>
                <TextArea onChange={handleText} value={text} maxLength={300} placeholder="Insira um novo comentário"/>
                <CharCount>{textLength} caracteres de 300 máximos permitidos</CharCount>
                <SubmitComment>Enviar comentário</SubmitComment>
            </CommentForm>
            {currentProjectComments.length === 0 ? (
                <h5>Sem comentários ainda</h5> 
            ) : (
                <>
                    <CommentList>
                        {currentProjectComments.map((comment) => 
                            <CommentItem key={comment.id}>
                                <CommentAuthor>{comment.author}</CommentAuthor>

                                <CommentDate>{new Date(Number(comment.createdAt)).toLocaleDateString("pt-BR")}</CommentDate>

                                <p>{comment.text}</p>

                                {user?.name === comment.author && 
                                    <DeleteCommentButton onClick={() => handleDelete(comment.id)}>Excluir comentário</DeleteCommentButton>
                                }
                            </CommentItem>
                        )}
                    </CommentList>
                </>
            )
            }
        </Comments>
    )
}

export default CommentsSection;