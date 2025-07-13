import { MovieData } from "@/types";
import style from "./page.module.css";
import MovieItem from "@/app/components/movie-item";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <>문제가 발생했습니다.</>;
  else {
    const movies: MovieData[] = await response.json();

    if (movies.length < 1) return <>검색 결과가 없습니다.</>;
    else {
      return (
        <div
          className={style.movieList}
          style={{ "--items-per-row": "3" } as React.CSSProperties}
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      );
    }
  }
}
