import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = ["bold", "italic", "underline", "strike", "image", "list"];

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [],
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["image"],
  ],
};

const RichTextEditor = ({ newNote, setNewNote }) => {
  return (
    <ReactQuill
      theme="snow"
      formats={formats}
      modules={modules}
      placeholder="Start writing here..."
      className={`rich-text-edior ${newNote.color}`}
      id="content"
      value={newNote.content}
      onChange={(value) => setNewNote((prev) => ({ ...prev, content: value }))}
    />
  );
};

export { RichTextEditor };
