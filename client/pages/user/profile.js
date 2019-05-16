import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import UserProfile from "../../containers/UserProfile";

const Profile = () => {
  return <UserProfile />;
};

Profile.getInitialProps = async ctx => {
  const { currentUser } = await checkLoggedIn(ctx.apolloClient);

  if (!currentUser) {
    redirect(ctx, "/user/signin");
  }

  return {};
};

export default Profile;
