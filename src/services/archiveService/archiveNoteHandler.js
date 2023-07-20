import axios from "axios";
import { toast } from "react-toastify";

const archiveNoteHandler = async (
  note,
  token,
  archiveNoteDispatch,
  noteDispatch
) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );

    if (response.status === 201) {
      archiveNoteDispatch({
        type: "MOVE_TO_ARCHIVE",
        payload: response.data.archives,
      });

      noteDispatch({
        type: "DELETE_NOTE_FROM_HOME",
        payload: response.data.notes,
      });

      toast.success("Note Added to Archive");
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { archiveNoteHandler };
