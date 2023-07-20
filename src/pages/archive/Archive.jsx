import { Navbar, SideBar } from "../../components";
import { ArchiveCard } from "./component/ArchiveCard";
import { useEffect } from "react";
import { getAllArchiveNotesHandler } from "../../services";
import { useAuth, useArchive } from "../../context";
import { EmptyArchive } from "./component/EmptyArchive";

const Archive = () => {
  const {
    authState: { token },
  } = useAuth();
  const {
    archiveNoteState: { archive },
    archiveNoteDispatch,
  } = useArchive();

  useEffect(() => {
    getAllArchiveNotesHandler(token, archiveNoteDispatch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="contaiiner">
        <div>
          <SideBar />
        </div>
        <div className="sub-container">
          {archive.length !== 0 ? (
            <>
              <div className="notes-category">
                <h3>Archive Notes</h3>
                <div className="saved-notes">
                  {archive.map((archiveData) => (
                    <ArchiveCard
                      key={archiveData._id}
                      archiveData={archiveData}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <EmptyArchive />
          )}
        </div>
      </div>
    </>
  );
};

export { Archive };
