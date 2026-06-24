import { useState } from "react";
import type { Comment } from "../types/Comment";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

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
        <>
        <h3>Comentários</h3>
        <form onSubmit={handleSubmit}>
            <textarea onChange={handleText} value={text} maxLength={300} placeholder="Insira um novo comentário"/>
            <p>{textLength} caracteres de 300 máximos permitidos</p>
            <button>Enviar comentário</button>
        </form>
        {currentProjectComments.length === 0 ? (
            <h5>Sem comentários ainda</h5> 
        ) : (
            <>
                <div>
                    {currentProjectComments.map((comment) => 
                        <div key={comment.id}>
                            <h4>{comment.author}</h4>
                            <p>{comment.createdAt}</p>
                            <p>{comment.text}</p>
                            {user?.name === comment.author && 
                                <button onClick={() => handleDelete(comment.id)}>Excluir comentário</button>
                            }
                        </div>
                    )}
                </div>
            </>
        )
        }
    </>
    )
}

export default CommentsSection;