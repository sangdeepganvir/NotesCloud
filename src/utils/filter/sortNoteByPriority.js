const sortNoteByPriority = (notes, type) => {
  if (type === "") {
    return notes;
  }
  const lowPriority = notes.filter((note) => note.priority === "Low");
  const mediumPriority = notes.filter((note) => note.priority === "Medium");
  const highPriority = notes.filter((note) => note.priority === "High");
  if (type === "lowToHigh") {
    return [...lowPriority, ...mediumPriority, ...highPriority];
  } else {
    return [...highPriority, ...mediumPriority, ...lowPriority];
  }
};

export { sortNoteByPriority };
