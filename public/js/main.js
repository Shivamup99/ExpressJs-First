const { localsAsTemplateData } = require("hbs");

const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_val = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo= async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal==="")
    {
        city_name.innerText=`Please name the City`;
        datahide.classList.add('data_hide');
    }
    else{
        try{
            let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=abde5cf7ea58dbe317957a27814af965`;
            const response = await fetch(url);
            const data = await response.json();
            //console.log(data);
            const arrData = [data];

            city_name.innerText =`${arrData[0].name},${arrData[0].sys.country}`;
            temp_val.innerText = arrData[0].main.temp;
            //temp_status.innerText = arrData[0].weather[0].main;
            const tempMood = arrData[0].weather[0].main;
            
            // condition to check
            if(tempMood == "Clear"){
                temp_status.innerHTML = 
                 "<i class = 'fas fa-sun' style ='color:#eccc68;'></i>";
            } else if (tempMood=="Clouds"){
                temp_status.innerHTML =
                 "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            } else if (tempMood=="Rain"){
                temp_status.innerHTML =
                 "<i class='fas fa-cloud-rain' style='color:#a4a0be;'></i>";
            }
            else {
                temp_status.innerHTML =
                 "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            datahide.classList.remove('data_hide');
        
        }
        catch{
            city_name.innerText=`Please enter the proper city`;
            datahide.classList.add('data_hide');
        }
    }
    alert('shivam');
}
submitBtn.addEventListener('click',getInfo);