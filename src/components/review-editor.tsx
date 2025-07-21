"use client";
import { createReviewAction } from "@/actions/create-review-action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, pending] = useActionState(createReviewAction, null); // useActionState(서버액션함수, 초기값)

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <div className={style.formContainer}>
      <form action={formAction}>
        <textarea
          className={style.textarea}
          name="content"
          placeholder="리뷰 내용을 입력해주세요."
          disabled={pending}
        ></textarea>

        <div className={style.submitContainer}>
          <input type="hidden" name="movieId" value={movieId} readOnly />
          <input
            className={style.submitInput}
            type="text"
            placeholder="작성자"
            name="author"
            disabled={pending}
          />
          <button type="submit" className={style.submitBtn} disabled={pending}>
            {pending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
