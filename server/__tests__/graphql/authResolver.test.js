const knex = require("../../config/db");
const mockSendMail = require("../../utils/mail");
const { generateActivationToken } = require("../../utils/token");
const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../../graphql/schema");
const resolvers = require("../../graphql/resolvers");
const {
  SIGNUP_MUTATION,
  ACTIVATE_ACCOUNT_MUTATION,
  NEW_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION
} = require("../../../client/apollo/mutations");

const tester = new EasyGraphQLTester(schema);
const mockedReq = { req: { get: jest.fn() } };

const signUpMethod = async (
  username,
  email,
  confirmEmail,
  password,
  confirmPassword
) => {
  return await tester.graphql(SIGNUP_MUTATION, resolvers, mockedReq, {
    username,
    email,
    confirmEmail,
    password,
    confirmPassword
  });
};

const activateAccountMethod = async token => {
  return await tester.graphql(ACTIVATE_ACCOUNT_MUTATION, resolvers, mockedReq, {
    token
  });
};

const newPasswordMethod = async email => {
  return await tester.graphql(NEW_PASSWORD_MUTATION, resolvers, mockedReq, {
    email
  });
};

const resetPasswordMethod = async (token, password, confirmPassword) => {
  return await tester.graphql(RESET_PASSWORD_MUTATION, resolvers, mockedReq, {
    token,
    password,
    confirmPassword
  });
};

beforeAll(async () => {
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
  jest.spyOn(mockSendMail, "send").mockImplementation(() => Promise.resolve());
});

afterEach(async () => {
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
});

afterAll(async () => {
  await knex.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE favorites RESTART IDENTITY");
});

describe("Sign Up method", () => {
  it("will register user if data is correct", async () => {
    const res = await signUpMethod(
      "new_user",
      "email@email.com",
      "email@email.com",
      "password",
      "password"
    );
    expect(res.data.signUp).toEqual("User successfully registered");
  });

  it("won't register if username or email already exists", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password"
    });

    try {
      const res = await signUpMethod(
        "user",
        "newemail@email.com",
        "newemail@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual("Username already in use");
    } catch (e) {
      throw e;
    }

    try {
      const res = await signUpMethod(
        "new_user",
        "email@email.com",
        "email@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual("Email already in use");
    } catch (e) {
      throw e;
    }
  });

  it("will return an error if username checks fail", async () => {
    // Required
    try {
      const res = await signUpMethod(
        "",
        "newemail@email.com",
        "newemail@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual("Username is required");
    } catch (e) {
      throw e;
    }

    // Length
    try {
      const res = await signUpMethod(
        "us",
        "newemail@email.com",
        "newemail@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual(
        "Username must be between 4 and 16 characters"
      );
    } catch (e) {
      throw e;
    }

    // Lowercase
    try {
      const res = await signUpMethod(
        "User",
        "email@email.com",
        "email@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual("Username must be lowercase");
    } catch (e) {
      throw e;
    }
  });

  it("will return an error if email checks fail", async () => {
    // Required
    try {
      const res = await signUpMethod("user", "", "", "password", "password");
      expect(res.errors[0].message).toEqual("Email is required");
    } catch (e) {
      throw e;
    }
    // IsEmail
    try {
      const res = await signUpMethod(
        "user",
        "email",
        "email",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual("Email not valid");
    } catch (e) {
      throw e;
    }
    // email !== confirmEmail
    try {
      const res = await signUpMethod(
        "user",
        "email@email.com",
        "anotheremail@email.com",
        "password",
        "password"
      );
      expect(res.errors[0].message).toEqual(
        "Email and confirm email must be equal"
      );
    } catch (e) {
      throw e;
    }
  });

  it("will return an error if password checks fail", async () => {
    // Required
    try {
      const res = await signUpMethod(
        "user",
        "email@email.com",
        "email@email.com",
        "",
        ""
      );
      expect(res.errors[0].message).toEqual("Password is required");
    } catch (e) {
      throw e;
    }
    // Length
    try {
      const res = await signUpMethod(
        "user",
        "email@email.com",
        "email@email.com",
        "pw",
        "pw"
      );
      expect(res.errors[0].message).toEqual(
        "Password must be between 8 and 16 characters"
      );
    } catch (e) {
      throw e;
    }
    // password !== confirmPassword
    try {
      const res = await signUpMethod(
        "user",
        "email@email.com",
        "email@email.com",
        "password",
        "password2"
      );
      expect(res.errors[0].message).toEqual(
        "Password and confirm password must be equal"
      );
    } catch (e) {
      throw e;
    }
  });
});

describe("Activate Account method", () => {
  it("activates the account if token is valid", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password"
    });

    const activationToken = await generateActivationToken("email@email.com");
    const res = await activateAccountMethod(activationToken);
    expect(res.data.activateAccount).toEqual("Account activated");
  });

  it("re-send an email if token has expired", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password"
    });

    const expiredToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE1NTcwNzczNTIsImV4cCI6MTU1NzA3NzM3OSwiYXVkIjoiIiwic3ViIjoiIiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20ifQ.t0-I0sZ3cJ2LmEvjAZD3cXzpsVHc8-X0NLkWarli6oM";

    const res = await activateAccountMethod(expiredToken);
    expect(res.errors[0].message).toEqual(
      "Your previous token has expired, but a new email has been sent to email@email.com"
    );
  });

  it("returns an error if token has been compromised", async () => {
    const res = await activateAccountMethod("fake-token");
    expect(res.errors[0].message).toEqual("Token not valid");
  });

  it("doesn't re-activate the account if has already been activated", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password",
      activated: true
    });

    const activationToken = await generateActivationToken("email@email.com");
    const res = await activateAccountMethod(activationToken);

    expect(res.errors[0].message).toEqual("Account already activated");
  });

  it("returns an error if user doesn't exist", async () => {
    const activationToken = await generateActivationToken("email@email.com");
    const res = await activateAccountMethod(activationToken);

    expect(res.errors[0].message).toEqual("User not found");
  });
});

describe("New Password method", () => {
  it("returns false if user doesn't exist", async () => {
    const res = await newPasswordMethod("fakeEmail@email.com");

    expect(res.data.newPassword).toEqual(false);
  });

  it("return true if user exists", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password"
    });

    const res = await newPasswordMethod("email@email.com");

    expect(res.data.newPassword).toEqual(true);
  });
});

describe("Reset Password method", () => {
  it("throws an error if user doesn't exist ", async () => {
    const res = await resetPasswordMethod("faketoken", "password", "password");
    expect(res.errors[0].message).toEqual("Token not valid");
  });

  it("throws an error if password checks fail", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password",
      reset_password_token: "123"
    });

    let res;
    // Password required
    res = await resetPasswordMethod("123", "", "");
    expect(res.errors[0].message).toEqual("Password is required");
    // Password length
    res = await resetPasswordMethod("123", "pas", "pas");
    expect(res.errors[0].message).toEqual(
      "Password must be between 8 and 16 characters"
    );
    // Password and confirm password
    res = await resetPasswordMethod("123", "password", "betterPassword");
    expect(res.errors[0].message).toEqual(
      "Password and confirm password must be equal"
    );
  });

  it("send a new email and return true if token is valid but has expired", async () => {
    const date = new Date();
    date.setHours(date.getHours() - 24); // It's 24h old, so it has expired

    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password",
      reset_password_token: "123",
      reset_password_token_expiration: date
    });

    const res = await resetPasswordMethod("123", "newPassword", "newPassword");
    expect(res.data.resetPassword).toEqual(false);
  });

  it("successfully reset password if data is valid", async () => {
    await knex("users").insert({
      username: "user",
      email: "email@email.com",
      password: "password",
      reset_password_token: "123",
      reset_password_token_expiration: new Date()
    });

    const res = await resetPasswordMethod("123", "newPassword", "newPassword");
    expect(res.data.resetPassword).toEqual(true);
  });
});
