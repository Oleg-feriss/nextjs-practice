import { FC } from 'react';

import classes from './comment-list.module.css';
import { Comment } from '@/types/comment.interface';

type CommentListProps = {
  items: Comment[];
};

const CommentList: FC<CommentListProps> = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
