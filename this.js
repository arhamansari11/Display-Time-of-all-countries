let countryzone = document.getElementById('countryzone');
let regionList = document.getElementById("regions");
fetch("http://worldtimeapi.org/api/timezone")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element) => {
            let option = document.createElement("option");
            option.value = element;
            option.textContent = element;
            countryzone.appendChild(option);
        });
    })
    .catch((error) => {
        console.error("Error fetching regions:", error);
    });

countryzone.addEventListener("change", () => {
    let selectedRegion = countryzone.value;
    regionList.innerHTML = "";
    let regionLi = document.createElement("li");
    regionLi.textContent = `Selected Region: ${selectedRegion}`;
    regionLi.addEventListener("click", () => {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedRegion}`)
            .then((response) => response.json())
            .then((timeData) => {
                regionList.innerHTML = "";
                let timeLi = document.createElement("li");
                timeLi.textContent = `Time Zone for ${selectedRegion}: ${timeData.utc_datetime}`;
                regionList.appendChild(timeLi);
            })
            .catch((error) => {
                console.error("Error fetching time zone data:", error);
            });
    });

    regionList.appendChild(regionLi);
});
