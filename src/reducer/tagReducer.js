const tagReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return { ...state, tags: [...state.tags, action.payload] };
    case "REMOVE_TAG":
      return { ...state, tags: [...state.tags, action.payload] };
    default:
      return state;
  }
};

export { tagReducer };
