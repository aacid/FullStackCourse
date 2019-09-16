import React from "react";

const Search = ({ search, handleSearch }) => {
    return (
        <>
            {"filter with"}
            <input value={search} onChange={handleSearch} />
        </>
    );
};

export default Search;
