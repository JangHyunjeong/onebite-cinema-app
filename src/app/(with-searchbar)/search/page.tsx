import style from "./page.module.css";
import dummy from "@/dummy.json";
import MovieItem from "@/app/components/movie-item";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const movies = dummy.filter(({ title }) => title.includes(q)) || [];

  if (movies.length < 1) return <>검색 결과가 없습니다.</>;
  else
    return (
      <>
        <div
          className={style.movieList}
          style={{ "--items-per-row": "3" } as React.CSSProperties}
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </>
    );
}
