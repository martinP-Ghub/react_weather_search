import React, { useState, useRef } from 'react';


const WeatherSearch = () => {

    const inputFocus = useRef();

    const [inputText, setInputText] = useState('');
    const [cityName, setCityName] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [tempIcon, setTempIcon] = useState('');
    const [windValue, setWindValue] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');


    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        if(inputText ==='') {
            document.querySelector('.weatherInfo').classList.add('none');
            return inputFocus.current.focus();
        }
        inputFocus.current.focus();

        const apiKey = "90cb06b83c940e70958d3d5537ac5507"; // 발급받은 API Key 입력
        const city = inputText; // 검색할 도시 이름 입력
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${encodeURIComponent(apiKey)}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.cod !== "404"){
                    setCityName(inputText);
                    setTempValue((data.main.temp - 273.15).toFixed(1));
                    setWindValue(data.wind);
                    setWeatherDesc(data.weather[0].description);
                    setWeatherIcon(data.weather[0].main)

                    if((data.main.temp - 273.15) < 0){
                        setTempIcon('low');
                    }else if((data.main.temp - 273.15) > 30){
                        setTempIcon('high');
                    }else{
                        setTempIcon('good');
                    }


                    document.querySelector('.turbine').style.animationDuration = (10 - data.wind.speed) / 5 + 's';
                    document.querySelector('.windDirection').style.rotate = data.wind.deg  + 'deg';
                    document.querySelector('.weatherInfo').classList.remove('none');
                }else{
                    document.querySelector('.weatherInfo').classList.add('none');
                }
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    const iconStyle = {
        width : '200px',
        margin : '40px 20px 10px 20px',
    }

    const subIconStyle = {
        width : '30px',
        padding : '0 10px',
    }

    return (
        <>
            <div className='weatherArea'>
                <div className='searchInput'>
                    <input value={inputText} onChange={onChange} className='inputBox' ref={inputFocus}/> 
                    <button onClick={onClick} className='searchBtn'>GO</button>
                </div>
                <div className='weatherInfo none'>
                    <img src={`/icon/${weatherIcon}.png`} alt="icon" style={iconStyle}/>
                    <div className='cityName'>{cityName}</div>
                    <div className='desc'>{weatherDesc}</div>
                    {/* <div className='flag' style={subIconStyle}></div> */}
                    <div className='thermAndWind'>
                        <div><img src={`/icon/${tempIcon}-temperature.png`} alt="icon" style={subIconStyle}/><span>{tempValue}</span></div>
                        <div><img src="/icon/turbine.png" alt="icon" className='turbine' style={subIconStyle}/><span>{windValue.speed}</span><img src="/icon/direction.png" alt="icon" className='windDirection'/></div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default WeatherSearch;