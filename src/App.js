import { Routes, Route } from "react-router-dom";
import { Archive, Login, Notes, Signup, Trash, Tag, Error404 } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequiresAuth } from "./RequireAuth";

function App() {
  return (
    <div className="App">
      <ToastContainer
        bodyClassName="toastBody"
        position="top-right"
        autoClose="500"
        limit="1"
        style={{ top: "1em", right: "0em" }}
      />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/notes"
          element={
            <RequiresAuth>
              <Notes />
            </RequiresAuth>
          }
        ></Route>
        <Route
          path="/archive"
          element={
            <RequiresAuth>
              <Archive />
            </RequiresAuth>
          }
        ></Route>
        <Route
          path="/trash"
          element={
            <RequiresAuth>
              <Trash />
            </RequiresAuth>
          }
        ></Route>

        <Route
          path="/tags/:tagName"
          element={
            <RequiresAuth>
              <Tag />
            </RequiresAuth>
          }
        ></Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
