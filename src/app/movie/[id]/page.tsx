export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <h1>Movies/[id] : {id}</h1>
    </>
  );
}
