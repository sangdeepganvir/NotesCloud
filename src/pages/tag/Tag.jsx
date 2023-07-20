import { useParams } from "react-router-dom";
import { useState } from "react";
import { Navbar, NoteCard, SideBar } from "../../components";
import { useNote } from "../../context";
import { NoteModal } from "../../components";
import { capitalizeStr } from "../../utils/capitalizeStr";

const Tag = () => {
  const {
    noteState: { notes },
  } = useNote();

  console.log(notes)
  const [updateNote, setUpdateNote] = useState(false);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const { tagName } = useParams();
  return (
    <>
      <Navbar />
      <div className="contaiiner">
        <div>
          <SideBar />
        </div>
        <div className="sub-container">
   
            <div className="notes-category ">
              <h3>{capitalizeStr(tagName)} Notes</h3>
              {notes
                .filter((note) => note.tag.includes(tagName))
                .map((note) => (
                  <div className="saved-notes">
                    <NoteCard
                      key={note._id}
                      note={note}
                      setCreateNoteModal={setCreateNoteModal}
                      setUpdateNote={setUpdateNote}
                    />
                  </div>
                ))}
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
    </>
  );
};

export { Tag };
