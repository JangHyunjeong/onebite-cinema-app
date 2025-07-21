"use client";
import style from "./movie-item-delete-button.module.css";
import { deleteReviewAction } from "@/actions/delete-review-action";
import { useActionState, useEffect, useRef } from "react";

export default function MovieItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(deleteReviewAction, null); // useActionState(서버액션함수, 초기값)

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input type="hidden" name="movieId" value={movieId} />
      <input type="hidden" name="reviewId" value={reviewId} />
      {pending ? (
        <div className={`${style.deleteButton} ${style.disabled}`}>...</div>
      ) : (
        <div
          className={style.deleteButton}
          onClick={() => formRef.current?.requestSubmit()}
        >
          삭제하기
        </div>
      )}
    </form>
  );
}
