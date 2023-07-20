import { Navbar, SideBar } from "../../components";
import { TrashCard } from "./component/TrashCard";
import { getAllTrashNotesHandler } from "../../services";
import { useAuth, useTrash } from "../../context";
import { useEffect } from "react";
import { EmptyTrash } from "./component/EmptyTrash";

const Trash = () => {
  const {
    trashNoteState: { trash },
    trashNoteDispatch,
  } = useTrash();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    getAllTrashNotesHandler(token, trashNoteDispatch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="contaiiner">
        <div>
          <SideBar />
        </div>
        <div className="sub-container">
          {trash.length !== 0 ? (
            <>
              <div className="notes-category">
                <h3>Trash Notes</h3>
                <div className="saved-notes">
                  {trash.map((trashData) => (
                    <TrashCard key={trashData._id} trashData={trashData} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <EmptyTrash />
          )}
        </div>
      </div>
    </>
  );
};

export { Trash };
