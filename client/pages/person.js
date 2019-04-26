import { default as PersonContainer } from "../containers/Person";
import { PERSON_QUERY } from "../apollo/queries";

const Person = ({ data }) => {
  return <PersonContainer data={data} />;
};

Person.getInitialProps = async ({ apolloClient, query }) => {
  const res = await apolloClient.query({
    query: PERSON_QUERY,
    variables: { id: query.id }
  });

  return { data: res.data.person };
};

export default Person;
