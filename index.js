const carMakeElement = document.getElementById("car-make");
const carModelElement = document.getElementById("car-model");
const carImageElement= document.getElementById("car-image");
const carPriceElement= document.getElementById("car-price");
const carInventoryElement= document.getElementById("carInv");
const carSearchBarElement= document.getElementById("search");
const carSearchListElement= document.getElementById("list");
const carSearchSelectTextElement= document.getElementById("selectText");
const carSearchBarArrowDown= document.getElementById("selectText");
const carSearchModelOptionsElement= document.getElementsByClassName("options");
const carSearchInputFieldElement= document.getElementById("inputfield")
const carSearchBarButton = document.getElementsByClassName("searchButton")
const enquireNowButton = document.getElementById("enquireBtn")
const url=" http://localhost:3000/Cars"

document.addEventListener("DOMContentLoaded",function(){
    console.log("loadingDom")
    fetchDataById();

    console.log("loadedDom")
})

function fetchDataById() {

    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status +"Item not found!");
        }
        return response.json();
      })
      .then(carInfo => {
        // Display the fetched data
        displayData(carInfo);
      })
      .catch(error => {
        console.error('Error:', error);
        //Display error message in the container
        carNameElement.innerText = 'Item not found!';
      }); 
}

function displayData(carInfo) {

    if(carInfo.length ===0){
      console.error('Error: No car information found!'); 
    }
    carInventoryElement.innerHTML=""
  // Display the fetched data in the element containers
 for(let i=0;i<carInfo.length; i++){
    console.log("Displaying Cars")
    carInventoryElement.innerHTML+=`<div class="Car1">
    <img
        id="car-image"
        src=${carInfo[i].image}
        alt= ${carInfo[i].make} ${carInfo[i].model} class="imgCar1"/>
    <h3 id="car-make"> ${carInfo[i].make} </h3>
    <h4 id="car-model">${carInfo[i].model}</h4>
    <p id="car-price">${carInfo[i].price}</p>
    <button id="enquireBtn" type="button">
        Enquire Now
    </button>
</div>`
 }

}
carSearchSelectTextElement.onclick = function(){
    carSearchListElement.classList.toggle("open")
}

enquireNowButton.onclick = function(){
    console.log("enquring...");
}

for (option of carSearchModelOptionsElement){
    option.onclick = function(){
        selectText.innerHTML = this.innerHTML
        inputfield.placeholder = "Search car in " + selectText.innerHTML;
        console.log(selectText.innerHTML);
        searchCarsByModel(selectText.innerHTML);
    }
}


function searchCarsByModel(modelName){
    
    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status +"Item not found!");
        }
        return response.json();
      })
      .then(carInfo => {
        let searchedCars = [];
        if (modelName=="All models") {
            searchedCars = carInfo;
        } else {
            for (let index = 0; index < carInfo.length; index++) {
                if(carInfo[index].model==modelName){
                    searchedCars.push(carInfo[index]) 
                }   
            }
        }
        
        console.log(searchedCars);
        // Display the fetched data
        displayData(searchedCars);
      })
      .catch(error => {
        console.error('Error:', error);
      }); 

}

enquireNowButton.addEventListener("click",function(){
    console.log("enquring...");
})

