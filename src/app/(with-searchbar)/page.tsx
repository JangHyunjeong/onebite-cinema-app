import dummyData from "@/dummy.json";
import style from "./page.module.css";
import MovieItem from "../components/movie-item";

export default function Home() {
  const randomMovies = dummyData.slice(0, 3);
  const allMovies = dummyData;

  return (
    <>
      <div className={style.container}>
        <h2 className={style.title}>지금 가장 추천하는 영화</h2>
        <div
          className={style.movieList}
          style={{ "--items-per-row": "3" } as React.CSSProperties}
        >
          {randomMovies?.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>

      <div className={style.container}>
        <h2 className={style.title}>등록된 모든 영화</h2>
        <div
          className={style.movieList}
          style={{ "--items-per-row": "5" } as React.CSSProperties}
        >
          {allMovies?.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  );
}
