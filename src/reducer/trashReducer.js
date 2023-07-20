const trashReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRASH":
      return { ...state, trash: action.payload };
    case "MOVE_TO_TRASH":
      return { ...state, trash: action.payload };
    case "DELETE_FROM_TRASH":
      return { ...state, trash: action.payload };
  }
};

export { trashReducer };
