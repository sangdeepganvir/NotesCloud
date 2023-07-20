import axios from "axios";
import { toast } from "react-toastify";

const getAllNotesHandler = async (token, noteDispatch) => {
  try {
    const response = await axios.get("/api/notes", {
      headers: { authorization: token },
    });

    if (response.status === 200) {
      noteDispatch({ type: "GET_NOTES", payload: response.data.notes });
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getAllNotesHandler };
