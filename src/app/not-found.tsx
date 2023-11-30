import Link from "next/link";
import style from "./not-found.module.css";

export default function NotFound() {
  return (
    <div
      className={`${style.section} flex flex-col items-center justify-center`}
    >
      <h1 className={style.error}>404</h1>
      <div className={style.page}>
        Ooops!!! The page you are looking for is not found
      </div>
      <Link className={style.backHome} href="/">
        Back to home
      </Link>
    </div>
  );
}
