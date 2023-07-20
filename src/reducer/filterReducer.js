const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_NOTES_BY_DATE":
      return { ...state, sortByDate: action.payload };
    case "SORT_NOTES_BY_PRIORITY":
      return { ...state, sortByPriority: action.payload };
    case "CLEAR":
      return { sortByDate: "", sortByPriority: "" };
    default:
      return state;
  }
};

export { filterReducer };
