import { notFound } from "next/navigation";
import style from "./page.module.css";
import type { MovieData } from "@/types";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id = "" } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
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
    <>
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

        <p className={style.subTitle}>{subTitle}</p>
        <p className={style.desc}>{description}</p>
      </div>
    </>
  );
}
