const getPinnedAndUnpinnedNotes = (notes) => {
  const pinNote = [];
  const unpinNote = [];
  notes.forEach((note) =>
    note.isPinned ? pinNote.push(note) : unpinNote.push(note)
  );
  return { pinNote, unpinNote };
};

export { getPinnedAndUnpinnedNotes };
