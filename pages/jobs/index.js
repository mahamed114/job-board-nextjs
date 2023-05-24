export default function Jobs() {
  return (
    <>
      <main></main>
    </>
  );
}

export async function getServerSideProps() {
  if (true) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
