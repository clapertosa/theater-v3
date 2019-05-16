import React, { useState } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../../../apollo/queries";
import { CHANGE_AVATAR_MUTATION } from "../../../../apollo/mutations";
import Spinner from "../../../Spinner/Spinner";

const Container = styled.div`
  grid-area: avatar;
  display: grid;
  grid-template-areas: "avatar" "error";
  position: relative;
  max-width: 200px;
  max-height: 200px;
  min-height: 100px;
  margin: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

const Label = styled.label`
  cursor: pointer;
  display: block;
  transition: filter 0.3s;

  &:hover {
    filter: grayscale(50%);
    i {
      opacity: 1;
    }
  }

  i {
    opacity: 0;
  }
`;

const CameraIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  transition: opacity 0.3s;
`;

const Error = styled.div`
  grid-area: message;
  font-weight: bold;
  text-align: center;
  color: ${({ theme: { colors } }) => colors.candy};
  opacity: ${({ error }) => (error ? 1 : 0)};
  transition: opacity 0.3s;
`;

const Avatar = () => {
  const [error, setError] = useState("");

  return (
    <Mutation
      mutation={CHANGE_AVATAR_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      awaitRefetchQueries
    >
      {(changeAvatar, { loading }) => (
        <Query query={CURRENT_USER_QUERY}>
          {({ data: { currentUser } }) => (
            <>
              <Container>
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Label htmlFor="file">
                      <CameraIcon className="icon-camera" />
                      <img
                        src={
                          currentUser && currentUser.avatar
                            ? currentUser.avatar
                            : "/static/images/navbar/user.svg"
                        }
                        alt="Your avatar"
                      />
                    </Label>
                    <input
                      onChange={async ({
                        target: {
                          files: [file]
                        }
                      }) => {
                        try {
                          setError("");
                          await changeAvatar({ variables: { file } });
                        } catch (e) {
                          setError(e.graphQLErrors[0].message);
                        }
                      }}
                      id="file"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                    />
                  </>
                )}
                <Error error={error.length > 0}>{error}</Error>
              </Container>
            </>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Avatar;
