import axios from "axios";
import { toast } from "react-toastify";

const trashNoteHandler = async (
  note,
  token,
  trashNoteDispatch,
  noteDispatch
) => {
  try {
    const response = await axios.post(
      `/api/notes/trash/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );

    if (response.status === 201) {
      trashNoteDispatch({
        type: "MOVE_TO_TRASH",
        payload: response.data.trash,
      });
      noteDispatch({
        type: "DELETE_NOTE_FROM_HOME",
        payload: response.data.notes,
      });

      toast.success("Note Added to Trash");
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0])
  }
};

export { trashNoteHandler };
