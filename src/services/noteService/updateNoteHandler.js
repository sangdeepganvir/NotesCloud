import axios from "axios";
import { toast } from "react-toastify";

const updateNoteHandler = async (note, token, noteDispatch) => {
  try {
    const response = await axios.post(
      `/api/notes/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      noteDispatch({ type: "UPDATE_NOTES", payload: response.data.notes });
      toast.success("Note Successfully Updated");
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { updateNoteHandler };
