import React, { useState, useRef } from 'react';


const WeatherSearch = () => {

    const inputFocus = useRef();

    const [inputText, setInputText] = useState('');
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [tempIcon, setTempIcon] = useState('');
    const [windValue, setWindValue] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');


    const onChange = e => setInputText(e.target.value);

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
          onClick(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };

    const onClick = () => {
        const searchInput = document.querySelector('.searchInput'); 

        console.log();
        console.log('123')

        if(inputText === '' && getComputedStyle(searchInput).display === 'none'){
            searchInput.style.display = 'block';
            return inputFocus.current.focus();
        }


        console.log('456')
        inputFocus.current.focus();

        const apiKey = "90cb06b83c940e70958d3d5537ac5507"; // 발급받은 API Key 입력
        const city = inputText; // 검색할 도시 이름 입력
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${encodeURIComponent(apiKey)}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.cod !== "400" && data.cod !== "404"){
                    setCityName(inputText);
                    setTempValue((data.main.temp - 273.15).toFixed(1));
                    setCountryName(data.sys.country);
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
                    document.querySelector('.weatherInfo.noData').classList.add('none');
                    document.querySelector('.weatherInfo').classList.remove('none');
                }else{
                    document.querySelector('.weatherInfo').classList.add('none');
                    document.querySelector('.weatherInfo.noData').classList.remove('none');
                    document.querySelector('.weatherInfo.noData .desc').textContent = data.message;
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

    const searchIconStyle = {
        width : '30px',
        height : '30px',
        padding : '5px',
    }

    const mainTitleStyle = {
        fontSize : '48px',
        fontWeight : '400',
        textAlign : 'center',
        padding : '30px 0 0 0 ',
    }

    return (
        <>
            <div style={mainTitleStyle}>WEATHER SEARCH</div>
            <div className='weatherArea'>
                <div className='searchBox'>
                    <input type='search' value={inputText} onChange={onChange} onKeyDown={handleOnKeyPress} placeholder='Please search in English' className='searchInput' ref={inputFocus}/> 
                    <button onClick={onClick} type='button' className='searchBtn'><img src={`/icon/search.png`} alt="icon" style={searchIconStyle} /></button>
                </div>
                <div className='weatherInfo none'>
                    <img src={`/icon/${weatherIcon}.png`} alt="icon" style={iconStyle}/>
                    <div className='cityName'>{cityName}({countryName}) </div>
                    <div className='desc'>{weatherDesc}</div>
                    <div className='thermAndWind'>
                        <div><img src={`/icon/${tempIcon}-temperature.png`} alt="icon" style={subIconStyle}/><span>{tempValue}</span></div>
                        <div><img src="/icon/turbine.png" alt="icon" className='turbine' style={subIconStyle}/><span>{windValue.speed}</span><img src="/icon/direction.png" alt="icon" className='windDirection'/></div>
                    </div>
                </div>
                <div className='weatherInfo noData none'>
                    <img src={`/icon/noData.png`} alt="icon" style={iconStyle}/>
                    <div className='desc'>{weatherDesc}</div>
                </div>
            </div>
        </>
    )
}
 
export default WeatherSearch;