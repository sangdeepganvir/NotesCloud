import "../archive.css"

const EmptyArchive = () => {
    return (
      <div className="emptyTrashContatiner flex-center">
        <ul>
          <li className="trash-list flex-center">          
            <h2>Archive is Empty!</h2>
          </li>
        </ul>
      </div>
    );
  };
  
  export { EmptyArchive };
