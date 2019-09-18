import React, { useState } from "react";
import axios from "axios";

const Results = ({ countries, search }) => {
    const filetered = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filetered.length > 10) {
        return <div>Too many matches, specify another filter.</div>;
    }
    return filetered.map(country => (
        <div key={country.alpha3Code}>
            <Country country={country} />
        </div>
    ));
};

const Country = ({ country }) => {
    const [selected, setSelected] = useState(false);
    if (selected) {
        const apiKey = "private";
        let weather = <p>Data not available</p>;
        axios
            .get(
                `https://samples.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&units=metric&appid=${apiKey}`
            )
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    const weatherInfo = response.data;
                    weather = (
                        <div>
                            <p>
                                <b>temperature:</b>{" "}
                                {weatherInfo.list[0].main.temp} Celsius
                            </p>
                            <p>
                                <b>wind:</b> speed{" "}
                                {weatherInfo.list[0].wind.speed} m/s,{" "}
                                {weatherInfo.list[0].wind.deg} degrees
                            </p>
                        </div>
                    );
                }
            });
        return (
            <>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h3>languages</h3>
                <ul>
                    {country.languages.map(language => (
                        <li key={language.iso639_2}>{language.name}</li>
                    ))}
                </ul>
                <img src={country.flag} alt={country.name} width="150" />
                <h3>Weather in {country.capital}</h3>
                {weather}
            </>
        );
    } else {
        return (
            <div>
                {country.name}{" "}
                <button onClick={() => setSelected(true)}>show</button>
            </div>
        );
    }
};

export default Results;
