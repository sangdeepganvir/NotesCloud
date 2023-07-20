import axios from "axios";
import { toast } from "react-toastify";

const restoreFromArchiveHandler = async (
  token,
  archiveData,
  noteDispatch,
  archiveNoteDispatch
) => {
  try {
    const response = await axios.post(
      `/api/archives/restore/${archiveData._id}`,
      { archiveData },
      {
        headers: { authorization: token },
      }
    );

    if (response.status === 200) {
      noteDispatch({
        type: "RESTORE_ARCHIVED_NOTE",
        payload: response.data.notes,
      });

      archiveNoteDispatch({
        type: "DELETE_FROM_ARCHIVE",
        payload: response.data.archives,
      });
      toast.success("Note Successfully Restored from Archive");
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { restoreFromArchiveHandler };
