const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".BTN");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // Prevents the page form from refreshing
    console.log("Working");
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(amtVal);
    console.log("Fromcurr",fromcurr.value);
    let URL = `${BASE_URL}${fromcurr.value.toLowerCase()}.json`;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("data",data);
            let exchangeRate = data[fromcurr.value.toLowerCase()];
            let toValue = (data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]);
            toValue*=amtVal
            document.querySelector('#showVal').innerHTML = `${toValue} is the converted amount`
            
        })
        
});

