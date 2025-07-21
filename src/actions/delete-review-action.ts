"use server";

import { revalidatePath } from "next/cache";

export async function deleteReviewAction(_: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const reviewId = formData.get("reviewId")?.toString();

  if (!movieId || !reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰 ID와 영화 ID가 필요합니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidatePath(`/movie/${movieId}`);
    return {
      status: true,
      message: "리뷰가 성공적으로 삭제되었습니다.",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다. ${error}`,
    };
  }
}
