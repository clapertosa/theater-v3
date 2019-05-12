import { RECOVER_EMAIL_MUTATION } from "../../apollo/mutations";
import Message from "../../components/Message/Message";

const RecoverEmail = ({ message }) => {
  if (process.browser) {
    setTimeout(() => {
      window.location.href = "/user/signin";
    }, 3000);
  }
  return <Message>{message}</Message>;
};

RecoverEmail.getInitialProps = async ({ query, apolloClient }) => {
  let message;
  try {
    const res = await apolloClient.mutate({
      mutation: RECOVER_EMAIL_MUTATION,
      variables: {
        token: query.token
      }
    });
    message = res.data.recoverEmail;
  } catch (e) {
    if (query.token) {
      message = e.graphQLErrors[0].message;
    } else {
      message = "Invalid or expired token";
    }
  }
  return { message };
};

export default RecoverEmail;
