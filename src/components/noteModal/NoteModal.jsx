import { RichTextEditor } from "../richTextEditor/RichTextEditor";
import "./note-modal.css";
import { useAuth, useNote, useTag } from "../../context";
import { createNoteHandler, updateNoteHandler } from "../../services";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../../backend/utils/authUtils";
import { capitalizeStr } from "../../utils/capitalizeStr";

const NoteModal = ({ setCreateNoteModal, updateNote, setUpdateNote }) => {
  const [newNote, setNewNote] = useState(
    updateNote ?? {
      title: "",
      content: "",
      color: "Default",
      isPinned: false,
      priority: "Low",
      tag: "",
    }
  );

  const { noteDispatch } = useNote();
  const {
    authState: { token },
  } = useAuth();

  const {
    tagState: { tags },
  } = useTag();

  const inputHandler = (event) => {
    const { id, value } = event.target;
    setNewNote((prev) => ({ ...prev, [id]: value }));
  };

  const validateInput = () => {
    if (newNote.title === "") {
      toast.warning("Add Note Title");
    } else if (newNote.content === "") {
      toast.warning("Add Note Content");
    } else {
      return true;
    }
  };

  const callCreateNoteHandler = () => {
    const note = { ...newNote, date: formatDate() };
    if (validateInput()) {
      updateNote
        ? updateNoteHandler(note, token, noteDispatch)
        : createNoteHandler(note, token, noteDispatch);
      setUpdateNote(null);
      setCreateNoteModal(false);
    }
  };

  return (
    <div className="note-modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create Note</h2>
          <button
            className="close-note-btn"
            onClick={() => setCreateNoteModal(false)}
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="title"
            value={newNote.title}
            onChange={inputHandler}
          />
          <RichTextEditor
            newNote={newNote}
            setNewNote={setNewNote}
            className={newNote.color}
          />
        </div>
        <div className="note-modal-action-container">
          <div className="options">
            <label htmlFor="tag">Tags: </label>
            <select
              name="tag"
              id="tag"
              value={newNote.tag}
              onChange={inputHandler}
            >
              <option>None</option>

              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {capitalizeStr(tag)}
                </option>
              ))}
            </select>
          </div>
          <div className="options">
            <label htmlFor="tag">Priority: </label>
            <select
              name="priority"
              id="priority"
              value={newNote.priority}
              onChange={inputHandler}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="options">
            <label htmlFor="color">Color: </label>
            <select
              name="color"
              id="color"
              value={newNote.color}
              onChange={inputHandler}
            >
              <option>Default</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="grey">Grey</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn link-btn" onClick={callCreateNoteHandler}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export { NoteModal };
