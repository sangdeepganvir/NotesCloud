import axios from "axios";
import { toast } from "react-toastify";

const createNoteHandler = async (note, token, noteDispatch) => {
  try {
    const response = await axios.post(
      "/api/notes",
      { note: note },
      { headers: { authorization: token } }
    );

    if (response.status === 201) {
      noteDispatch({ type: "ADD_NOTES", payload: response.data.notes });
      toast.success("Note Successfully Added");
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { createNoteHandler };
