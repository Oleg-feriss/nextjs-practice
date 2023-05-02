import { FC, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import { AddComment } from '@/types/add-comment.interface';

import classes from './comments.module.css';
import { Comment } from '@/types/comment.interface';

type CommentsProps = {
  eventId: string;
};

const Comments: FC<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data: { comments: Comment[] }) => {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = (): void => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData: AddComment): void => {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
