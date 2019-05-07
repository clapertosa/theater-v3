import Form from "../../components/Form/PasswordReset/Form";

const PasswordReset = ({ token }) => {
  return <Form token={token} />;
};

PasswordReset.getInitialProps = async ({ query }) => {
  return { token: query.token };
};

export default PasswordReset;
