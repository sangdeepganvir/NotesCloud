import { useState } from "react";
import { toast } from "react-toastify";
import { useTag } from "../../context";
import "./edit-tag-modal.css";
import { capitalizeStr } from "../../utils/capitalizeStr";

const EditTagModal = ({ tagModal, setTagModal }) => {
  const [newTag, setNewTag] = useState("");
  const {
    tagState: { tags },
    tagDispatch,
  } = useTag();

  const addNewTag = () => {
    const trimTag = newTag.trim().toLowerCase();
    if (trimTag !== "") {
      if (!tags.find((tag) => tag === trimTag)) {
        tagDispatch({
          type: "ADD_TAG",
          payload: newTag.trim().toLowerCase(),
        });
        setNewTag("");
        setTagModal(false);
      } else {
        toast.warning("Tag Already Exist");
      }
    } else {
      toast.warning("Enter a Tag Name");
    }
  };


  return (
    <>
      <div className="tagModal">
        <div className="edit-tag-container">
          <div className="modal-header">
            <h3>Edit Tag</h3>
            <button
              className="close-note-btn tag-cloase-btn"
              onClick={() => setTagModal(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-header">
              <input
                className="tag-name"
                type="text"
                placeholder="Enter new label..."
                autoFocus
                value={newTag}
                onChange={(event) => setNewTag(event.target.value)}
              />
              <button onClick={addNewTag}>
                <i className="bx bx-check"></i>
              </button>
            </div>
            <div>
              <ul className="tag-list">
                {tags.map((tag) => (
                  <li className="exist-list-item" key={tag}>
                    <p>{capitalizeStr(tag)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {tagModal ? <div onClick={() => setTagModal(false)}> </div> : null}    
    </>
  );
};

export { EditTagModal };
