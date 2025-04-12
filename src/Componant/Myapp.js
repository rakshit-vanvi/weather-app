import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import clear from "../Images/Clear.png"
import cloud from "../Images/Clouds.png"
import rain from "../Images/Rain.png"
import error from "../Images/error.png"
import mist from "../Images/mist.png"
//import { clear } from '@testing-library/user-event/dist/clear';


const Myapp = () => {
   // const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
    const API_KEY = "cf63484eb69ce0d2a488249faf173ca8"
    const [search, setsearch] = useState("")
    const [data , setdata] = useState()
    const [err , seterr] = useState()
    const handleinput = (event) => {
        setsearch(event.target.value)
        console.log(event.target.value)
    }
    const myFun = async () => {
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        const jasonData = await get.json()
        //console.log(jasonData);
        setdata(jasonData)

        if(search === ""){
           // alert("enter name")
            seterr("please enter name")
        }
        else if(jasonData.cod == '404'){
            seterr("please enter valid name")
        }else{
            seterr("")
        }
        setsearch("")
    }
    return (
        <>
            <div className="container">
                <div className="inputs">
                    <input placeholder="enter city/country" value={search} onChange={handleinput}></input>
                    <button onClick={myFun}> <FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div>
                    {/* {
                        error ? 
                        <div className='errorPage'>
                            <p>{err}</p>
                            <img src={error}/>
                        </div> : ""
                    } aama error ni image rai jati ti e keje to kem */
                    }
                        {err && (
                        <div className="errorPage">
                            <p>{err}</p>
                            <img src={error} />
                        </div>
                    )}

                    {
                        data && data.weather ?
                        <div className='weathers'>
                            <h2 className='cityName'>{data.name}</h2>
                            <img src={data.weather[0].main == "Clouds" ? cloud : ""}/>
                            <img src={data.weather[0].main == "Rain" ? rain : ""}/>
                            <img src={data.weather[0].main == "Clear" ? clear : ""}/>
                            <img src={data.weather[0].main == "Mist" ? mist : ""}/>
                            <img src={data.weather[0].main == "Haze" ? cloud : ""}/>
                            <h2 className='temprature'>{Math.trunc(data.main.temp)}℃</h2>
                            <h2 className='climate'>{data.weather[0].description}</h2>
                        </div> : ""
                    }
                </div>
            </div>
        </>
    )
}
export default Myapp