import Link from "next/link";
import style from "./movie-item.module.css";
import { MovieData } from "@/types";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <div className={style.container}>
      <Link className={style.link} href={`/movie/${id}`}>
        <img className={style.img} src={posterImgUrl} alt={title} />
        <p className={style.title}>{title}</p>
      </Link>
    </div>
  );
}
