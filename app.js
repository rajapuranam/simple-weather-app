// API_KEY is stored in another javascript file
// as API_KEY = "YOUE API KEY";

window.addEventListener('load', () => {
	let longitude, latitude;
	let location = document.querySelector(".location-timezone");
	let icon = document.querySelector(".icon");
	let temperatureDescription = document.querySelector(".temperature-description");

	let kel = document.getElementById('kel');
	let cel = document.getElementById('cel');
	let faren = document.getElementById('faren');
	
	let cityToSearch = document.getElementById('tosearch');
	let submit = document.querySelector(".submit");

	let proxy = `http://cors-anywhere.herokuapp.com/`;
	let url;

	icon.src = `./icons/unknown.png`;

	fetchData = (url) => {
		fetch(url)
		.then(responce => responce.json())
		.then(data => {
			location.textContent = `${data["name"]} / ${data["sys"].country}`;
			temperatureDescription.textContent = data["weather"][0].description;
			icon.src = `./icons/${data["weather"][0].icon}.png`;
			let t = data["main"].temp;
			console.log(t);
			kel.textContent = (t+273.15).toFixed(2);
			cel.textContent = (t).toFixed(2);
			faren.textContent = ((t*1.8)+32).toFixed(2);
			 
		})
		.catch(err => console.log("Error: " + err))
	}

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;
			console.log(longitude, latitude);
			url = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
			fetchData(url);
		})
	}

	submit.addEventListener("click", (event) => {
		event.preventDefault();
		if(cityToSearch.value.length != 0){
			url = `${proxy}api.openweathermap.org/data/2.5/weather?q=${cityToSearch.value}&appid=${API_KEY}&units=metric`;
			fetchData(url);
		}
	});
});

