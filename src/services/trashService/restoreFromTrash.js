import axios from "axios";
import { toast } from "react-toastify";

const restoreFromTrashHandler = async (
  token,
  trashData,
  noteDispatch,
  trashNoteDispatch
) => {

  try {
    const response = await axios.post(
      `/api/trash/restore/${trashData._id}`,
      {trashData},
      {
        headers: { authorization: token },
      }
    );

    if (response.status === 200) {
      noteDispatch({
        type: "RESTORE_TRASHED_NOTE",
        payload: response.data.notes,
      });

      trashNoteDispatch({
        type: "DELETE_FROM_TRASH",
        payload: response.data.trash,
      });
      toast.success("Note successfully Restored from Trash");
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0])
  }
};

export { restoreFromTrashHandler };
