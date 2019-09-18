import React, { useState, useEffect } from "react";
import Countries from "./components/Results";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            setCountries(response.data);
        });
    }, []);

    const [search, setSearch] = useState("");

    const handleSearch = event => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <p>find countries</p>
            <input value={search} onChange={handleSearch} />
            <Countries countries={countries} search={search} />
        </div>
    );
};

export default App;
