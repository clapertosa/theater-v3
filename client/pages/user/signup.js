import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import Form from "../../components/Form/SignUp/Form";

const SignUp = () => {
  return <Form />;
};

SignUp.getInitialProps = async ctx => {
  // Check if user is already signed-in
  const { currentUser } = await checkLoggedIn(ctx.apolloClient);
  // if (currentUser) redirect(ctx, "/");

  return {};
};

export default SignUp;
