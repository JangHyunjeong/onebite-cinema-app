import { MovieData } from "@/types";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { delay } from "@/util/delay";
import { Suspense, useEffect } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function SearchMovies({ q }: { q: string }) {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <>문제가 발생했습니다.</>;

  const movies: MovieData[] = await response.json();
  if (movies.length < 1) return <>검색 결과가 없습니다.</>;
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <Suspense key={q} fallback={<MovieListSkeleton count={3} />}>
      <SearchMovies q={q} />
    </Suspense>
  );
}
