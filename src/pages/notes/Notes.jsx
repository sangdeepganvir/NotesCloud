import { useState, useEffect } from "react";
import { Navbar, NoteCard, SideBar, NoteModal, Filter } from "../../components";
import "./notes.css";
import { useAuth, useFilter, useNote } from "../../context";
import { getAllNotesHandler } from "../../services";
import { getPinnedAndUnpinnedNotes } from "../../utils/pinNote";
import { sortNoteByDate } from "../../utils/filter/sortNoteByDate";
import { sortNoteByPriority } from "../../utils/filter/sortNoteByPriority";


const Notes = () => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [updateNote, setUpdateNote] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const {
    noteState: { notes },
    noteDispatch,
  } = useNote();

  const {
    authState: { token },
  } = useAuth();

  const {
    filterState: { sortByDate, sortByPriority },
  } = useFilter();

  useEffect(() => {
    getAllNotesHandler(token, noteDispatch);
  }, []);

  //pinNote
  const { pinNote, unpinNote } = getPinnedAndUnpinnedNotes(notes);
  const sortedNoteByDate = sortNoteByDate(unpinNote, sortByDate);
  const sortedNoteByPriority = sortNoteByPriority(
    sortedNoteByDate,
    sortByPriority
  );

  return (
    <>
      <Navbar />
      <div className="contaiiner">
        <div>
          <SideBar />
        </div>
        <div className="sub-container">
          <div className="create-note-head">
            <div className="note-head-action">
              <button
                className="btn link-btn"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <i className="bx bx-filter"></i>
                Filter
              </button>
              <button
                className="btn link-btn note-btn"
                onClick={() => setCreateNoteModal(true)}
              >
                <i className="bx bx-plus"></i>Create Note
              </button>
              <div
                className={`filter-container ${
                  showFilter ? "filter-container-active" : ""
                }`}
              >
                <Filter />
              </div>
            </div>
          </div>
          <div className="notes-category-container">
            {pinNote.length > 0 ? (
              <div className="notes-category">
                <h3>Pinned Notes</h3>
                <div className="saved-notes">
                  {pinNote.map((note) => (
                    <NoteCard
                      key={note._id}
                      {...note}
                      note={note}
                      setCreateNoteModal={setCreateNoteModal}
                      setUpdateNote={setUpdateNote}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="notes-category">
              {unpinNote.length > 0 ? (
                <>
                  <h3>All Notes</h3>
                  <div className="saved-notes">
                    {sortedNoteByPriority.map((note) => (
                      <NoteCard
                        key={note._id}
                        {...note}
                        note={note}
                        setCreateNoteModal={setCreateNoteModal}
                        setUpdateNote={setUpdateNote}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {createNoteModal ? (
          <NoteModal
            setCreateNoteModal={setCreateNoteModal}
            updateNote={updateNote}
            setUpdateNote={setUpdateNote}
          />
        ) : null}
      </div>
    </>
  );
};

export { Notes };
