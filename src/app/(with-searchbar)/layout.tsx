import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>Searbar Layout</div>
      {children}
    </>
  );
}
