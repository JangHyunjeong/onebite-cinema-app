import style from "./review-editor.module.css";

export async function createReviewAction(formData: FormData) {
  "use server";

  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    console.log(response);
  } catch (error) {
    console.error(`error!!! : ${error}`);
    return;
  }
}

export function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <div className={style.formContainer}>
      <form action={createReviewAction}>
        <textarea
          className={style.textarea}
          name="content"
          placeholder="리뷰 내용을 입력해주세요."
        ></textarea>

        <div className={style.submitContainer}>
          <input type="hidden" name="movieId" value={movieId} />
          <input
            className={style.submitInput}
            type="text"
            placeholder="작성자"
            name="author"
          />
          <button type="submit" className={style.submitBtn}>
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
}
