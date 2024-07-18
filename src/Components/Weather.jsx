import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';
import rainIcon from '../Assets/rain.png';
import searchIcon from '../Assets/search.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';

const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "10d": snowIcon,
    "10n": snowIcon
};

const useWeather = (initialCity) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        if (!city) {
            alert("Enter City name");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await axios.get(url);
            const { data } = response;

            const icon = allIcons[data.weather[0].icon] || clearIcon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon
            });
        } catch (error) {
            setError("Error in fetching weather data");
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(initialCity);
    }, [initialCity]);

    return { weatherData, loading, error, fetchWeather };
};

const Weather = () => {
    
    const inputRef = useRef();
    const { weatherData, loading, error, fetchWeather } = useWeather("Manila");

    return (
        <div className='place-self-center p-[40px] rounded-lg bg-custom-gradient flex flex-col items-center'>
            <div className='flex items-center gap-[12px]'>
                <input 
                    className='h-[50px] rounded-[40px] pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px] outline-none'
                    ref={inputRef}
                    type='text'
                    placeholder='Search'
                />
                <img 
                    className='w[50px] p-[15px] rounded-3xl bg-[#ebfffc] cursor-pointer'
                    onClick={() => fetchWeather(inputRef.current.value)}
                    src={searchIcon}
                    alt='search'
                />
            </div>

            {loading ? (<p>Loading...</p>) : error ? (<p className='text-red-500 mt-4'>{error}</p>) : weatherData 
            ? (
                <>
                    <img className='w-[150px] mx-[30px]' src={weatherData.icon} alt='weather icon' />
                    <p className='text-[#fff] text-[80px] leading-[1]'>{weatherData.temperature}°C</p>
                    <p className='text-[#fff] text-[40px]'>{weatherData.location}</p>
                    <div className='w-full mt-[40px] text-[#fff] flex justify-between'>
                        <div className='flex items-start gap-[12px] text-[22px]'>
                            <img className='w-[26px] mt-[10px]' src={humidityIcon} alt='humidity icon' />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span className='block text-[16px]'>Humidity</span>
                            </div>
                        </div>
                        <div className='flex items-start gap-[12px] text-[22px]'>
                            <img className='w-[26px] mt-[10px]' src={windIcon} alt='wind icon' />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span className='block text-[16px]'>Wind</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Weather;
