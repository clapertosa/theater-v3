import axios from "../../axiosServerInstance";

const validateRegistration = user => {
  // NAME & SURNAME TOO LONG
  if (user.name && user.name.trim().length > 50) {
    return {
      error: true,
      message: "Name is longer than 50 chars"
    };
  }

  if (user.surname && user.surname.trim().length > 50) {
    return {
      error: true,
      message: "Surname is longer than 50 chars"
    };
  }

  // EMAIL & PASSWORD EMPTY
  if (!user.email) {
    return {
      error: true,
      message: "Email is required"
    };
  }

  if (!user.password) {
    return {
      error: true,
      message: "Password is required"
    };
  }

  if (!user.passwordConfirmation) {
    return {
      error: true,
      message: "Password confirmation is required"
    };
  }

  // CHECK EMAIL VALIDITY
  if (
    !user.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return { error: true, message: "Email is not valid" };
  }

  // CHECK PASSWORD MIN&MAX CHARS
  if (user.password.trim().length < 8 || user.password.trim().length > 16) {
    return {
      error: true,
      message: "Password length must be between 8 and 16 chars"
    };
  }

  // CHECK PASSWORD AND CONFIRMATION PASSWORD
  if (user.password !== user.passwordConfirmation) {
    return {
      error: true,
      message: "Password and confirmation password must be the same"
    };
  }

  // FINAL RETURN
  return { error: false, message: "Checked values" };
};

const validateMedia = async data => {
  if (!data.mediaId) {
    return {
      error: true,
      message: "Media ID is required"
    };
  }

  if (data.mediaType && data.mediaType.length <= 0) {
    return {
      error: true,
      message: "Media type is required"
    };
  }

  if (data.mediaType !== "movie" && data.mediaType !== "serie") {
    return {
      error: true,
      message: "Media type is not valid"
    };
  }

  if (data.mediaType === "movie") {
    try {
      let response = await axios.get(`/movie/${data.mediaId}`);
      if (data.mediaTitle !== response.data.title) {
        return { error: true, message: "Title must be the same in TMDB db" };
      }
      if (data.mediaPosterPath !== response.data.poster_path) {
        return {
          error: true,
          message: "Poster path must be the same in TMDB db"
        };
      }
      return { error: false, message: "TMDB validation completed" };
    } catch (error) {
      return { error: true, message: "Movie not found" };
    }
  }

  if (data.mediaType === "serie") {
    try {
      let response = await axios.get(`/tv/${data.mediaId}`);
      if (data.mediaTitle !== response.data.name) {
        return { error: true, message: "Title must be the same in TMDB db" };
      }
      if (data.mediaPosterPath !== response.data.poster_path) {
        return {
          error: true,
          message: "Poster path must be the same in TMDB db"
        };
      }
      return { error: false, message: "TMDB validation completed" };
    } catch (error) {
      return {
        error: true,
        message: "Serie not found"
      };
    }
  }

  return { error: false, message: "Checked values" };
};

export { validateRegistration, validateMedia };
