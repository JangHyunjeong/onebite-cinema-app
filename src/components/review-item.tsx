import { ReviewData } from "@/types";
import style from "./review-item.module.css";

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
        <button type="button" className={style.delBtn}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
