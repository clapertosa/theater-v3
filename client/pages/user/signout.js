import redirect from "../../lib/redirect";
import { SIGNOUT_MUTATION } from "../../apollo/mutations";
import { CURRENT_USER_QUERY, GET_FAVORITES_QUERY } from "../../apollo/queries";

const SignOut = () => {
  return null;
};

SignOut.getInitialProps = async ctx => {
  // Sign-out user
  await ctx.apolloClient.mutate({ mutation: SIGNOUT_MUTATION });
  ctx.apolloClient.writeQuery(
    {
      query: CURRENT_USER_QUERY,
      data: { currentUser: null }
    },
    { query: GET_FAVORITES_QUERY, data: { getFavorites: null } }
  );

  redirect(ctx, "/");

  return {};
};

export default SignOut;
