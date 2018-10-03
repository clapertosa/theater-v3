export const test = () => {
  console.log("called");
  return dispatch => {
    return dispatch(console.log("test"));
  };
};
