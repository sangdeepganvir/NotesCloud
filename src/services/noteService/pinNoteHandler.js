import axios from "axios";

const notePinHandler = async (note, token, noteDispatch) => {
  try {
    const response = await axios.post(
      `api/notes/pin/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );

    if (response.status === 200) {
      noteDispatch({ type: "UPDATE_NOTES", payload: response.data.notes });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  } 
};

export { notePinHandler };
