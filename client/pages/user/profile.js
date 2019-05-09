import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import UserProfile from "../../containers/UserProfile";

const Profile = ({ user }) => {
  return <UserProfile user={user} />;
};

Profile.getInitialProps = async ctx => {
  const { currentUser } = await checkLoggedIn(ctx.apolloClient);

  if (!currentUser) {
    redirect(ctx, "/user/signin");
  }

  return { user: currentUser };
};

export default Profile;
