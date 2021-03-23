export default function Home(props) {
  console.log(props);
  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum ea
      sapiente saepe totam deleniti aliquid, voluptates, consequatur dolor,
      asperiores in ducimus enim error commodi adipisci ipsum voluptatibus
      accusamus? Odio, harum.
    </div>
  );
}

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.js`.
  const res = await fetch("https://api.mock/api/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}
