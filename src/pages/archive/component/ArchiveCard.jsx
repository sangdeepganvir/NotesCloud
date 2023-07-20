import HtmlParser from "react-html-parser/lib/HtmlParser";
import { getDate } from "../../../utils/getDate";
import {
  deleteFromArchivesHandler,
  restoreFromArchiveHandler,
} from "../../../services";
import { useArchive, useAuth, useNote, useTrash } from "../../../context";
import { capitalizeStr } from "../../../utils/capitalizeStr";

const ArchiveCard = ({ archiveData }) => {
  const {
    authState: { token },
  } = useAuth();
  const { archiveNoteDispatch } = useArchive();
  const { trashNoteDispatch } = useTrash();
  const { noteDispatch } = useNote();

  const callDeleteFromArchivesHandler = (e) => {
    e.preventDefault();
    deleteFromArchivesHandler(
      archiveData,
      token,
      archiveNoteDispatch,
      trashNoteDispatch
    );
  };

  const callRestoreFromArchiveHandler = (event) => {
    event.preventDefault();

    restoreFromArchiveHandler(
      token,
      archiveData,
      noteDispatch,
      archiveNoteDispatch
    );
  };
  return (
    <>
      <div
        className={`note-card-container ${archiveData.color}`}
        key={archiveData._id}
      >
        <form>
          <div className="form-control">
            <div className="note-title">
              <h3>{archiveData.title}</h3>
              <div className="note-title-action">
                <span className={`${archiveData.priority}`}>
                  {archiveData.priority.toUpperCase()}
                </span>
                <button className="pin-btn" title="Pin">
                  <i
                    className={`${
                      archiveData.isPinned ? "bx bxs-pin" : "bx bx-pin"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="form-control-content">
              {HtmlParser(archiveData.content)}
            </div>
          </div>
          {archiveData.tag !== "" ? (
            <div className="tagName">{capitalizeStr(archiveData.tag)}</div>
          ) : null}
          <div className="note-date">
            <p>{getDate(archiveData.date)}</p>
            <div className="note-action-container">
              <button onClick={callDeleteFromArchivesHandler}>
                <i className="bx bx-trash-alt"></i>
              </button>
              <button onClick={callRestoreFromArchiveHandler}>
                <i className="bx bx-upvote"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { ArchiveCard };
