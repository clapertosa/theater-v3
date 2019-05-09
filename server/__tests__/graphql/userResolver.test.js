const knex = require("../../config/db");
const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../../graphql/schema");
const resolvers = require("../../graphql/resolvers");
const { GET_FAVORITES_QUERY } = require("../../../client/apollo/queries");
const {
  ADD_TO_FAVORITES_MUTATION,
  REMOVE_FROM_FAVORITES_MUTATION
} = require("../../../client/apollo/mutations");
const axios = require("../../axiosInstance");

const tester = new EasyGraphQLTester(schema);

const getMockedReq = authenticated => {
  if (authenticated) {
    return {
      req: {
        user: {
          id: 1,
          username: "user",
          email: "email@email.com",
          password: "password"
        }
      }
    };
  } else return { req: {} };
};

const getFavoritesMethod = async authenticated => {
  return await tester.graphql(
    GET_FAVORITES_QUERY,
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

beforeAll(async () => {
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
  await knex("users").insert({
    username: "user",
    email: "email@email.com",
    password: "password"
  });
});

afterEach(async () => {
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
});

afterAll(async () => {
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
});

describe("getFavorites method", () => {
  it("returns favorites media if user is signed in", async () => {
    const res = await getFavoritesMethod(true);
    expect(res.data.getFavorites).toEqual([]);
  });

  it("throws an error if user is not signed in", async () => {
    const res = await getFavoritesMethod(false);
    expect(res.errors[0].message).toEqual(
      "You must be signed in to get favorites"
    );
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
