export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <>
      <h1>search 페이지: {q}</h1>
    </>
  );
}
