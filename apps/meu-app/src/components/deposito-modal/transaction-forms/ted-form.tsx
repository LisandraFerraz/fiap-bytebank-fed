export const TedForm = ({ data }: { data: any }) => {
  return (
    <>
      <p>{data.valor}</p>
      <p>{data.tipo}</p>
    </>
  );
};
