import axios from "axios";
import { toast } from "react-toastify";

const getAllArchiveNotesHandler = async (token, archiveNoteDispatch) => {
  try {
    const response = await axios.get("api/archives", {
      headers: { authorization: token },
    });

    if (response.status === 200) {
      archiveNoteDispatch({
        type: "GET_ARCHIVE",
        payload: response.data.archives,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getAllArchiveNotesHandler };
