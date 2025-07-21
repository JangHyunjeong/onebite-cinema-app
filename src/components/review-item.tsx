import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import MovieItemDeleteButton from "./movie-item-delete-button";

export default function ReviewItem({
  id,
  createdAt,
  content,
  author,
  movieId,
}: ReviewData) {
  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewAuthor}>{author}</div>
      <div className={style.reviewContent}>{content}</div>
      <div className={style.reviewBottom}>
        <div>{new Date(createdAt).toLocaleString()}</div>
        <MovieItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
