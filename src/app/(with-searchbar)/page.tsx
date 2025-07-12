import style from "./page.module.css";
import MovieItem from "../components/movie-item";
import { MovieData } from "@/types";

async function RandomMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );

  if (!response.ok) return <>오류가 발생했습니다.</>;
  else {
    const randomMovies: MovieData[] = await response.json();
    return (
      <div
        className={style.movieList}
        style={{ "--items-per-row": "3" } as React.CSSProperties}
      >
        {randomMovies?.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    );
  }
}

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <>오류가 발생했습니다.</>;
  else {
    const allMovies: MovieData[] = await response.json();
    return (
      <div
        className={style.movieList}
        style={{ "--items-per-row": "5" } as React.CSSProperties}
      >
        {allMovies?.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    );
  }
}

export default async function Home() {
  return (
    <>
      <div className={style.container}>
        <h2 className={style.title}>지금 가장 추천하는 영화</h2>
        <RandomMovies />
      </div>

      <div className={style.container}>
        <h2 className={style.title}>등록된 모든 영화</h2>
        <AllMovies />
      </div>
    </>
  );
}
