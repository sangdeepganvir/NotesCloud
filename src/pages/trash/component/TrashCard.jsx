import HtmlParser from "react-html-parser/lib/HtmlParser";
import { useAuth, useNote, useTrash } from "../../../context";
import { getDate } from "../../../utils/getDate";
import { restoreFromTrashHandler, deleteFromTrashHandler } from "../../../services"
import { capitalizeStr } from "../../../utils/capitalizeStr";
const TrashCard = ({ trashData }) => {
  const { noteDispatch } = useNote();
  const {
    trashNoteDispatch,
  } = useTrash();

  const {
    authState: { token },
  } = useAuth();  

//restoreFromTrashHandler

  const callRestoreFromTrashHandler = (event) => {
    event.preventDefault();
    restoreFromTrashHandler(
      token,
      trashData,
      noteDispatch,
      trashNoteDispatch
    );
  };


//deleteFromTrash

const callDeleteFromTrashHandler = (event) => {
  event.preventDefault();
  deleteFromTrashHandler(trashData, token, trashNoteDispatch)
}


  return (
    <>
      <div
        className={`note-card-container ${trashData.color}`}
        key={trashData._id}
      >
        <form>
          <div className="form-control">
            <div className="note-title">
              <h3>{trashData.title}</h3>
              <div className="note-title-action">
                <span className={`${trashData.priority}`}>{trashData.priority.toUpperCase()}</span>
                <button className="pin-btn" title="Pin">
                  <i
                    className={`${
                      trashData.isPinned ? "bx bxs-pin" : "bx bx-pin"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div className="form-control">
            <div className="form-control-content">{HtmlParser(trashData.content)}</div>
          </div>
          {trashData.tag !== "" ? (
            <div className="tagName">{capitalizeStr(trashData.tag)}</div>
          ) : null}
          <div className="note-date">
            <p>{getDate(trashData.date)}</p>
            <div className="note-action-container">
              <button onClick={callDeleteFromTrashHandler}>
                <i className="bx bx-trash-alt"></i>
              </button>
              <button onClick={callRestoreFromTrashHandler}>
                <i className="bx bx-upvote"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { TrashCard };
