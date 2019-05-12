const knex = require("../../config/db");
const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../../graphql/schema");
const resolvers = require("../../graphql/resolvers");
const {
  GET_FAVORITES_MOVIES_QUERY,
  GET_FAVORITES_SERIES_QUERY,
  IS_FAVORITE_QUERY
} = require("../../../client/apollo/queries");
const {
  ADD_TO_FAVORITES_MUTATION,
  REMOVE_FROM_FAVORITES_MUTATION,
  CHANGE_USERNAME_MUTATION,
  CHANGE_EMAIL_MUTATION,
  RECOVER_EMAIL_MUTATION,
  CHANGE_PASSWORD_MUTATION
} = require("../../../client/apollo/mutations");
const axios = require("../../axiosInstance");
const mail = require("../../utils/mail");
const tokenUtils = require("../../utils/token");

const tester = new EasyGraphQLTester(schema);

const getMockedReq = authenticated => {
  if (authenticated) {
    return {
      req: {
        user: {
          id: 1,
          username: "user",
          email: "email@email.com",
          password:
            "$2a$10$FwZO1J6lHo1CXVjOUXtv5uC31lQx3VApgsmJmNIeBo2Qq9w58dwJa"
        }
      }
    };
  } else return { req: {} };
};

const getFavoritesMoviesMethod = async authenticated => {
  return await tester.graphql(
    GET_FAVORITES_MOVIES_QUERY,
    resolvers,
    getMockedReq(authenticated)
  );
};

const getFavoritesSeriessMethod = async authenticated => {
  return await tester.graphql(
    GET_FAVORITES_SERIES_QUERY,
    resolvers,
    getMockedReq(authenticated)
  );
};

const addToFavoritesMethod = async (
  authenticated,
  media_id,
  media_type,
  title,
  poster_path
) => {
  return await tester.graphql(
    ADD_TO_FAVORITES_MUTATION,
    resolvers,
    getMockedReq(authenticated),
    { media_id, media_type, title, poster_path }
  );
};

const removeFromFavoritesMethod = async (authenticated, media_id) => {
  return await tester.graphql(
    REMOVE_FROM_FAVORITES_MUTATION,
    resolvers,
    getMockedReq(authenticated),
    { media_id }
  );
};

const isFavoriteMethod = async (authenticated, media_id) => {
  return await tester.graphql(
    IS_FAVORITE_QUERY,
    resolvers,
    getMockedReq(authenticated),
    { media_id }
  );
};

const changeUsernameMethod = async (authenticated, username) => {
  return await tester.graphql(
    CHANGE_USERNAME_MUTATION,
    resolvers,
    getMockedReq(authenticated),
    { username }
  );
};

const changeEmailMethod = async (authenticated, email, confirmEmail) => {
  return await tester.graphql(
    CHANGE_EMAIL_MUTATION,
    resolvers,
    getMockedReq(authenticated),
    { email, confirmEmail }
  );
};

const recoverEmailMethod = async token => {
  return await tester.graphql(
    RECOVER_EMAIL_MUTATION,
    resolvers,
    getMockedReq(false),
    { token }
  );
};

const changePasswordMethod = async (
  authenticated,
  oldPassword,
  password,
  confirmPassword
) => {
  return await tester.graphql(
    CHANGE_PASSWORD_MUTATION,
    resolvers,
    getMockedReq(authenticated),
    { oldPassword, password, confirmPassword }
  );
};

beforeAll(async () => {
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});

beforeEach(async () => {
  await knex("users").insert({
    username: "user",
    email: "email@email.com",
    password: "$2a$10$FwZO1J6lHo1CXVjOUXtv5uC31lQx3VApgsmJmNIeBo2Qq9w58dwJa"
  });
});

afterEach(async () => {
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});

describe("getFavoritesMovies method", () => {
  it("returns favorites media if user is signed in", async () => {
    const res = await getFavoritesMoviesMethod(true);
    expect(res.data.getFavoritesMovies).toEqual([]);
  });

  it("throws an error if user is not signed in", async () => {
    const res = await getFavoritesMoviesMethod(false);
    expect(res.errors[0].message).toEqual(
      "You must be signed in to get favorites"
    );
  });
});

describe("getFavoritesSeries method", () => {
  it("returns favorites media if user is signed in", async () => {
    const res = await getFavoritesSeriessMethod(true);
    expect(res.data.getFavoritesSeries).toEqual([]);
  });

  it("throws an error if user is not signed in", async () => {
    const res = await getFavoritesSeriessMethod(false);
    expect(res.errors[0].message).toEqual(
      "You must be signed in to get favorites"
    );
  });
});

describe("addToFavorites method", () => {
  it("successfully adds a media to favorites if user is signed in and data is correct", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { id: 597, title: "Titanic" } })
      );

    const res = await addToFavoritesMethod(
      true,
      597,
      "movie",
      "Titanic",
      "/ia8fhdausdsa.jpg"
    );

    expect(res.data.addToFavorites).toEqual(true);
  });

  it('throws an error if media_type !== "movie" or "tv', async () => {
    const res = await addToFavoritesMethod(
      true,
      597,
      "fake_type",
      "Titanic",
      "/ia8fhdausdsa.jpg"
    );
    expect(res.errors[0].message).toEqual("Invalid media type");
  });

  it("throws an error if user tries to add a media not existing in TMDB's db", async () => {
    jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.reject());

    const res = await addToFavoritesMethod(
      true,
      123,
      "movie",
      "Titanic",
      "/ia8fhdausdsa.jpg"
    );

    expect(res.errors[0].message).toEqual("Media not found");
  });

  it("throws an error if user is not signed in", async () => {
    const res = await addToFavoritesMethod(
      false,
      597,
      "movie",
      "Titanic",
      "/asuidahsdi.jpg"
    );
    expect(res.errors[0].message).toEqual(
      "You must be signed in to add a media to favorites"
    );
  });

  it("throws an error if media ID or Title is not equal to the TMDB ones", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: { id: 597, title: "Titanic" } })
      );

    let res = await addToFavoritesMethod(
      true,
      59721332,
      "movie",
      "Titanic",
      "/ia8fhdausdsa.jpg"
    );
    expect(res.errors[0].message).toEqual(
      "The media ID must be the same as the TMDB one"
    );

    res = await addToFavoritesMethod(
      true,
      597,
      "movie",
      "Titanic 2",
      "/ia8fhdausdsa.jpg"
    );
    expect(res.errors[0].message).toEqual(
      "The media title must be the same as the TMDB one"
    );

    jest.clearAllMocks();
  });

  it("throws an error if a user adds the same media more than one time ", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { id: 597, title: "Titanic" } })
      );

    await knex("favorites").insert({
      user_id: 1,
      media_id: 597,
      media_type: "movie",
      title: "Titanic",
      poster_path: "/ia8fhdausdsa.jpg"
    });

    let res = await addToFavoritesMethod(
      true,
      597,
      "movie",
      "Titanic",
      "/ia8fhdausdsa.jpg"
    );

    expect(res.errors[0].message).toEqual(
      "Media already saved to your favorites"
    );
  });
});

describe("removeFromFavorites method", () => {
  it('if user is signed in, it returns true (even if the media is not in the "favorites" table)', async () => {
    const res = await removeFromFavoritesMethod(true, 597);
    expect(res.data.removeFromFavorites).toBe(true);
  });

  it("throws an error if user is not authenticated ", async () => {
    const res = await removeFromFavoritesMethod(false, 123);
    expect(res.errors[0].message).toEqual(
      "You must be signed in to remove a media from favorites"
    );
  });
});

describe("isFavorite method", () => {
  it("throws an error if user is not signed in ", async () => {
    const res = await isFavoriteMethod(false, 597);
    expect(res.data.isFavorite).toEqual(false);
  });

  it("returns false if media is not in favorite db", async () => {
    const res = await isFavoriteMethod(true, 597);
    expect(res.data.isFavorite).toBe(false);
  });

  it("return true if media is in favorite db", async () => {
    await knex("favorites").insert({
      user_id: 1,
      media_id: 597,
      media_type: "movie",
      title: "Titanic"
    });
    const res = await isFavoriteMethod(true, 597);
    expect(res.data.isFavorite).toBe(true);
  });
});

describe("changeUsername method", () => {
  it("throws an error if user is not signed in", async () => {
    const res = await changeUsernameMethod(false, "new_username");
    expect(res.errors[0].message).toEqual(
      "You must be signed in to change your username"
    );
  });

  it("throws an error if username's checks fail", async () => {
    let res;
    // Required
    res = await changeUsernameMethod(true, "");
    expect(res.errors[0].message).toEqual("Username is required");
    // Length
    res = await changeUsernameMethod(true, "usr");
    expect(res.errors[0].message).toEqual(
      "Username must be between 4 and 16 characters"
    );
    // Lowercase
    res = await changeUsernameMethod(true, "User");
    expect(res.errors[0].message).toEqual("Username must be lowercase");
  });

  it("throws an error if username already in use", async () => {
    await knex("users").insert({
      username: "superuser",
      email: "newemail@email.com",
      password: "password"
    });

    const res = await changeUsernameMethod(true, "superuser");
    expect(res.errors[0].message).toEqual("Username already in use");
  });

  it("successfully changes username if data is valid", async () => {
    const res = await changeUsernameMethod(true, "superuser");
    expect(res.data.changeUsername).toBeTruthy();
  });
});

describe("changeEmail method", () => {
  beforeEach(() => {
    jest.spyOn(mail, "send").mockImplementationOnce(() => Promise.resolve());
  });

  it("throws an error if user is not signed in", async () => {
    const res = await changeEmailMethod(
      false,
      "newemail@email.com",
      "newemail@email.com"
    );
    expect(res.errors[0].message).toEqual(
      "You must be signed in to change your email"
    );
  });

  it("throws an error if email's checks fail", async () => {
    let res;
    // Required
    res = await changeEmailMethod(true, "", "");
    expect(res.errors[0].message).toEqual("Email is required");
    // Email valid
    res = await changeEmailMethod(true, "fakemail.com", "fakemail.com");
    expect(res.errors[0].message).toEqual("Email not valid");
    // Email and confirm email must be equal
    res = await changeEmailMethod(
      true,
      "email@email.com",
      "anotheremail@email.com"
    );
    expect(res.errors[0].message).toEqual(
      "Email and confirm email must be equal"
    );
  });

  it("throws an error if email already in the DB", async () => {
    const res = await changeEmailMethod(
      true,
      "email@email.com",
      "email@email.com"
    );
    expect(res.errors[0].message).toEqual(
      "Email already in use: if you don't remember your password, please reset it in the login page"
    );
  });

  it("successfully changes email if data is valid", async () => {
    const res = await changeEmailMethod(
      true,
      "newemail@email.com",
      "newemail@email.com"
    );

    expect(res.data.changeEmail).toBeTruthy();
  });
});

describe("recoverEmail method", () => {
  it("throws an error if token is not provided or invalid", async () => {
    let res;
    res = await recoverEmailMethod("");
    expect(res.errors[0].message).toEqual("Invalid or expired token");
    res = await recoverEmailMethod("eqoisujf8923uj32.f23f8923jh98f2j398f");
    expect(res.errors[0].message).toEqual("Invalid or expired token");
  });

  it("successfully recovers email if token is valid", async () => {
    await knex("users")
      .where({ id: 1 })
      .update({ email: "newemail@newemail.com" });
    const validToken = await tokenUtils.generateRecoverEmailToken(
      1,
      "email@email.com",
      "newemail@newemail.com"
    );
    const res = await recoverEmailMethod(validToken);
    expect(res.data.recoverEmail).toEqual("Old email recovered");
  });
});

describe("changePassword method", () => {
  it("throws an error if user is not signed in", async () => {
    const res = await changePasswordMethod(
      false,
      "password",
      "password",
      "password"
    );
    expect(res.errors[0].message).toEqual(
      "You must be signed in to change your password"
    );
  });

  it("throws an error if old password doesn't match the db one", async () => {
    const res = await changePasswordMethod(
      true,
      "anotherpass",
      "password",
      "password"
    );
    expect(res.errors[0].message).toEqual("The old password is wrong");
  });

  it("throws an error if password checks fail", async () => {
    let res;
    // Required
    res = await changePasswordMethod(true, "password", "", "");
    expect(res.errors[0].message).toEqual("Password is required");
    // Length
    res = await changePasswordMethod(true, "password", "pass", "pass");
    expect(res.errors[0].message).toEqual(
      "Password must be between 8 and 16 characters"
    );
    // Password and confirm password must be equal
    res = await changePasswordMethod(
      true,
      "password",
      "password",
      "anotherpassword"
    );
    expect(res.errors[0].message).toEqual(
      "Password and confirm password must be equal"
    );
  });

  it("successfully changes password if data is valid", async () => {
    const res = await changePasswordMethod(
      true,
      "password",
      "password",
      "password"
    );
    expect(res.data.changePassword).toBeTruthy();
  });
});
