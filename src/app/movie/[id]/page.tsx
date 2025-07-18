import { notFound } from "next/navigation";
import style from "./page.module.css";
import type { MovieData, ReviewData } from "@/types";
import { ReviewEditor } from "@/components/review-editor";
import ReviewItem from "@/components/review-item";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) notFound();
    return <>문제가 발생했습니다.</>;
  }
  const movie: MovieData = await response.json();
  const {
    posterImgUrl,
    title,
    releaseDate,
    runtime,
    company,
    subTitle,
    description,
  } = movie;

  return (
    <section>
      <div
        className={style.thumbWrap}
        style={
          {
            "--poster-img-url": `url(${posterImgUrl})`,
          } as React.CSSProperties
        }
      >
        <img src={posterImgUrl} alt={title} className={style.img} />
      </div>
      <div className={style.content}>
        <p className={style.title}>{title}</p>
        <div className={style.infos}>
          <p>
            {releaseDate} / {releaseDate} / {runtime}분
          </p>
          <p>{company}</p>
        </div>

        <p className={style.subtitle}>{subTitle}</p>
        <p className={style.desc}>{description}</p>
      </div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id = "" } = await params;

  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
