import { CURRENT_USER_QUERY } from "../apollo/queries";

export default apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER_QUERY
    })
    .then(({ data }) => {
      return { currentUser: data.currentUser };
    })
    .catch(() => {
      // Fail gracefully
      return { currentUser: {} };
    });
