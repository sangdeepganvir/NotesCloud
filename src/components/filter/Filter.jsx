import { useFilter } from "../../context";
import "./filter.css";

const Filter = () => {
  const { filterState, filterDispatch } = useFilter();
  const { sortByDate, sortByPriority } = filterState;


  return (
    <div className="filter">
      <div className="filter-header">
        <h4>Filter </h4>
        <button
          className="filter-clear-btn"
          onClick={() => filterDispatch({ type: "CLEAR" })}
        >
          Clear
        </button>
      </div>

      <div className="filter-ipt-container">
        <p>By time:</p>
        <div className="filter-ipt">
          <input
            type="radio"
            name="time-filter"
            id="new-to-old"
            checked={sortByDate === "newToOld"}
            onChange={() =>
              filterDispatch({
                type: "SORT_NOTES_BY_DATE",
                payload: "newToOld",
              })
            }
          />
          <label htmlFor="new-to-old">New to Old</label>
        </div>
        <div className="filter-ipt">
          <input
            type="radio"
            name="time-filter"
            id="old-to-new"
            checked={sortByDate === "oldToNew"}
            onChange={() =>
              filterDispatch({
                type: "SORT_NOTES_BY_DATE",
                payload: "oldToNew",
              })
            }
          />
          <label htmlFor="old-to-new">Old to New</label>
        </div>
      </div>
      <div>
        <p>By Priority:</p>
        <div className="filter-ipt">
          <input
            type="radio"
            name="priority-filter"
            id="high-to-low"
            checked={sortByPriority === "highToLow"}
            onChange={() =>
              filterDispatch({
                type: "SORT_NOTES_BY_PRIORITY",
                payload: "highToLow",
              })
            }
          />
          <label htmlFor="high-to-low">High to Low</label>
        </div>
        <div className="filter-ipt">
          <input
            type="radio"
            name="priority-filter"
            id="low-to-high"
            checked={sortByPriority === "lowToHigh"}
            onChange={() =>
              filterDispatch({
                type: "SORT_NOTES_BY_PRIORITY",
                payload: "lowToHigh",
              })
            }
          />
          <label htmlFor="low-to-high">Low to High</label>
        </div>
      </div>
    </div>
  );
};

export { Filter };
