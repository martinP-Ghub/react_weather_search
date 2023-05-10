import React, { useState, useRef } from 'react';


const WeatherSearch = () => {
    // const [names, setNames] = useState([
    //     {id : 1, text : 'SnowMan'},
    //     {id : 2, text : 'Ice'},
    //     {id : 3, text : 'Snow'},
    //     {id : 4, text : 'Wind'}
    // ])

    const inputFocus = useRef();

    const [inputText, setInputText] = useState('');
    // const [nextId, setNextId] = useState(5);
    const [tempValue, setTempValue] = useState('');
    const [windValue, setWindValue] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');


    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        if(inputText ==='') return inputFocus.current.focus();
        // const nextNames = names.concat({
        //     id: nextId,
        //     text : inputText
        // });
        // setNextId(nextId + 1);
        // setNames( nextNames);
        // setInputText('');
        inputFocus.current.focus();

        const apiKey = "90cb06b83c940e70958d3d5537ac5507"; // 발급받은 API Key 입력
        const city = inputText; // 검색할 도시 이름 입력
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${encodeURIComponent(apiKey)}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.cod !== "404"){
                    setTempValue(data.main);
                    setWindValue(data.wind);
                    setWeatherDesc(data.weather[0].description);
                    setWeatherIcon(data.weather[0].main)
                    document.querySelector('.weatherInfo').classList.remove('none');
                }else{
                    document.querySelector('.weatherInfo').classList.add('none');
                }
            })
            .catch((error) => {
                console.log(error);
                return false;
            });




        // switch(){
        //     case "clouds":
        // }

    }

    const iconStyle = {
        width : '200px',
        margin : '40px 20px',
    }

    // const onRemove = id => {
    //     const nextNames = names.filter(name => name.id !== id);
    //     setNames(nextNames);
    // }

    // const namesList = names.map(name => <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>);

    return (
        <>
            <div className='weatherArea'>
                <div>
                    <input value={inputText} onChange={onChange} ref={inputFocus}/> 
                    <button onClick={onClick}>search</button>
                </div>
                {/* <ul>{namesList}</ul> */}
                <div className='weatherInfo none'>
                    <img src={`/icon/${weatherIcon}.png`} alt="icon" style={iconStyle}/>
                    <div>{weatherDesc}</div>
                    <div>{tempValue.temp}</div>
                    <div>{windValue.speed}</div>
                </div>
            </div>
        </>
    )
}
 
export default WeatherSearch;