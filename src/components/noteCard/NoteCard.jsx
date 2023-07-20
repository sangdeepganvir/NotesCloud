import "./note-card.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import {
  archiveNoteHandler,
  notePinHandler,
  trashNoteHandler,
} from "../../services";
import { useArchive, useAuth, useNote, useTrash } from "../../context";
import { capitalizeStr } from "../../utils/capitalizeStr";
import { getDate } from "../../utils/getDate";

const NoteCard = ({ note, setUpdateNote, setCreateNoteModal }) => {
  const {
    authState: { token },
  } = useAuth();
  const { noteDispatch } = useNote();
  const { trashNoteDispatch } = useTrash();
  const { archiveNoteDispatch } = useArchive();

  const callTrashNoteHandler = (e) => {
    e.preventDefault();
    trashNoteHandler(note, token, trashNoteDispatch, noteDispatch);
  };

  const callArchiveNoteHandler = (e) => {
    e.preventDefault();
    archiveNoteHandler(note, token, archiveNoteDispatch, noteDispatch);
  };

  const updateNoteHandler = (e) => {
    e.preventDefault();
    setUpdateNote(note);
    setCreateNoteModal(true);
  };

  const callNotePinHandler = (e) => {
    e.preventDefault();
    notePinHandler(note, token, noteDispatch);
  };

  return (
    <>
      <div className={`note-card-container ${note.color}`} key={note._id}>
        <form>
          <div className="form-control">
            <div className="note-title">
              <h3>{note.title}</h3>
              <div className="note-title-action">
                <span className={`${note.priority}`}>
                  {note.priority.toUpperCase()}
                </span>
                <button
                  className="pin-btn"
                  title="Pin"
                  onClick={callNotePinHandler}
                >
                  <i
                    className={`${note.isPinned ? "bx bxs-pin" : "bx bx-pin"}`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="form-control-content">
              {HtmlParser(note.content)}
            </div>
          </div>
          {note.tag !== "" ? (
            <div className="tagName">{capitalizeStr(note.tag)}</div>
          ) : null}
          <div className="note-date">
            <p>{getDate(note.date)}</p>
            <div className="note-action-container">
              <button onClick={updateNoteHandler}>
                <i className="bx bx-pencil"></i>
              </button>
              <button onClick={callArchiveNoteHandler}>
                <i className="bx bx-archive-in"></i>
              </button>
              <button onClick={callTrashNoteHandler}>
                <i className="bx bx-trash-alt"></i>
              </button>
            </div>
          </div>
        </form>
        </div>
    </>
  );
};

export { NoteCard };
