import MovieItemSkeleton from "./movie-item-skeleton";
import style from "./movie-list-skeleton.module.css";

export default function MovieListSkeleton({ count }: { count: number }) {
  return (
    <div
      className={style.movieList}
      style={{ "--items-per-row": String(count) } as React.CSSProperties}
    >
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={`book-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
