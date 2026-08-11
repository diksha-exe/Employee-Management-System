import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

function SearchBar({
  searchTerm,
  setSearchTerm,
  department,
  setDepartment,
  departments,
}) {
  return (
    <div className="search-bar-container">

      <div className="search-input-wrapper">

        <Search size={18} />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search employees by name..."
        />

      </div>

      <div className="filter-wrapper">

        <SlidersHorizontal size={17} />

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        >
          {departments.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item === "All"
                ? "All Departments"
                : item}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}

export default SearchBar;