import { useState } from "react";
import axios from "axios";

function Card() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState(null); // Initial value is null
    const [desc, setDesc] = useState('');

    function handleChange(evt) {
        setCity(evt.target.value);
    }

    function getWeather() {
        var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e17f7f13bd86610a5b01b7a6c383dc23`);

        weatherData.then(function (success) {
            console.log(success.data);
            setWeather(success.data.weather[0].main);
            setTemp(success.data.main.temp);
            setDesc(success.data.weather[0].description);
        });
    }

    // Simplified temperature conversion
    let temperature = '';
    if (temp) {
        temperature = (temp - 273.15).toFixed(2);
    }

    return (
        <div className="bg-black h-full p-20">
            <div className="bg-green-600 h-2/4 p-5 rounded-lg">
                <h1 className="font-medium">Weather Report</h1>
                <h1>I can give you a weather report about your city!</h1>
                <div className="flex flex-col items-start">
                    <div>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="rounded-md p-1 my-2 outline-none justify-start"
                            placeholder="Enter your city Name"
                        />
                    </div>
                    <div className="mb-3">
                        <button onClick={getWeather} className="bg-black text-white p-2 rounded-md">
                            Get Report
                        </button>
                    </div>
                    <h1 className="font-medium">Weather: {weather}</h1>
                    <h1 className="font-medium">
                        Temperature: {temperature && `${temperature}°C`}
                    </h1>
                    <h1 className="font-medium">Description: {desc}</h1>
                </div>
            </div>
        </div>
    );
}

export default Card;
    