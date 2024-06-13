let maindiv = document.createElement("div");
maindiv.classList.add("container");

let body = document.querySelector("#body");
body.appendChild(maindiv);

let title = document.createElement("h1");
title.classList.add("text-center");
title.innerText = "REST countries and Weather APIs";
title.id = "title";
maindiv.appendChild(title);

let desc = document.createElement("p");
desc.classList.add("text-center");
desc.innerText = "rest countries and weather API fetching using DOM";
desc.id = "description";
maindiv.appendChild(desc);

let row = document.createElement("div");
row.classList.add("row");
row.id = "row";
maindiv.appendChild(row);

let resturl = "https://restcountries.com/v3.1/all";

async function fetchrest() {
    let restresponse = await fetch(resturl);
    let restdata = await restresponse.json();
    return restdata;
}
fetchrest().then(res => {
    console.log(res);
    res.forEach(country => {
        let carddiv = document.createElement("div");
        carddiv.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4", "my-3");

        let card = document.createElement("div")
        card.classList.add("card", "h-100", "position-relative","border","border-dark");
        carddiv.appendChild(card);

        let cardimg = document.createElement("img");
        cardimg.classList.add("card-img-top", "cardimg", "h-100", "img-fluid", "d-flex", "justify-content-center", "align-items-center");
        cardimg.src = country.flags.svg;
        cardimg.style.background = "rgba(0,0,0,0.1)";
        card.appendChild(cardimg);

        let cardhead = document.createElement("div");
        cardhead.classList.add("card-header", "text-white", "text-center", "bg-dark", "fs-4");
        cardhead.innerText = country.name.common.toUpperCase();
        card.appendChild(cardhead);

        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        let cardtext = document.createElement("div");
        cardtext.classList.add("card-text", "text-center", "border", "border-dark", "m-2", "rounded", "p-2");
        cardtext.style.background = "rgba(0,0,0,0.1)";
        cardtext.innerHTML = `<p id="capital" class="fs-4">Capital : ${country.capital}</p> <p id="region">Region : ${country.region}</p> <p id="code"> Country Code : ${country.cca3}</p>`;

        let weatherbtn = document.createElement("button");
        weatherbtn.classList.add("weatherbtn");
        weatherbtn.id = country.name.common;
        weatherbtn.innerText = "click for weather";

       

        async function fetchweather() {
            let weatherresponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${(country.latlng)[0]}&lon=${(country.latlng)[1]}&appid=be97b5a6031117c9213cc8fb2ae49124`)
            let weatherjson = await weatherresponse.json();
            return weatherjson;
        }
        fetchweather().then(res => {
            console.log(res);

            let weathericon = document.createElement("img");
            weathericon.classList.add("img-fluid", "weathericon");
            weathericon.style.width = "80px";
            weathericon.src = `https://openweathermap.org/img/w/${(res.weather)[0].icon}.png`;
            weathercard.appendChild(weathericon);

          

            let w_desc = document.createElement("p");
            w_desc.innerText = `${country.name.common} will have ${(res.weather)[0].description}`;
            weathercardbody.appendChild(w_desc);

            let temp = document.createElement("p");
            let weathertemp = ((res.main.temp) - 272.15).toFixed(2);
            temp.innerHTML = `Temperature : ${weathertemp} &deg C`;
            weathercardbody.appendChild(temp);

            let windspeed = document.createElement("p")
            windspeed.innerText = `wind : ${res.wind.speed} Km/h`;
            weathercardbody.appendChild(windspeed);

            let closebtn = document.createElement("div");
            closebtn.classList.add("btn", "btn-secondary", "col-4");
            closebtn.textContent = "close";
            weathercard.appendChild(closebtn);

            weatherbtn.addEventListener('click', () => {

                weathercard.style.zIndex = "99";

                closebtn.addEventListener('click', () => {
                    weathercard.style.zIndex = "-1";
                })
            })
        })

        cardtext.appendChild(weatherbtn);
        cardbody.appendChild(cardtext);
        card.appendChild(cardbody);

        row.appendChild(carddiv);
    });
})