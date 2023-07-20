const noteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTES":
      return { ...state, notes: action.payload };
    case "DELETE_NOTE_FROM_HOME":
      return { ...state, notes: action.payload };
    case "RESTORE_TRASHED_NOTE":
      return { ...state, notes: action.payload };
    case "RESTORE_ARCHIVED_NOTE":
      return { ...state, notes: action.payload };
    case "UPDATE_NOTES":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

export { noteReducer };
