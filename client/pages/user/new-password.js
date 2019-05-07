import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import Form from "../../components/Form/NewPassword/Form";

const NewPassword = () => {
  return <Form />;
};

NewPassword.getInitialProps = async ctx => {
  const { currentUser } = await checkLoggedIn(ctx.apolloClient);
  if (currentUser) {
    redirect(ctx, "/");
  }

  return {};
};

export default NewPassword;
