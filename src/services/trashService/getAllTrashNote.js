import axios from "axios"
import { toast } from "react-toastify";


const getAllTrashNotesHandler = async (token, trashNoteDispatch) => {
    try{const response = await axios.get("api/trash", {
        headers: { authorization: token },
      })

      if (response.status === 200) {
        trashNoteDispatch({ type: "GET_TRASH", payload: response.data.trash });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
}

export { getAllTrashNotesHandler };
