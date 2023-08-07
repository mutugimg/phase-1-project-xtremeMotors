const carMakeElement = document.getElementById("car-make");
const carModelElement = document.getElementById("car-model")
const carImageElement= document.getElementById("car-image")
const carPriceElement= document.getElementById("car-price")
const carInventoryElement= document.getElementById("carInv")
let carId=1
const url=" http://localhost:3000/Cars"

document.addEventListener("DOMContentLoaded",function(){
    console.log("loadedDom")
    fetchDataById(carId)
})

function fetchDataById(carId) {

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
    // carMakeElement.innerHTML = `<h3>${car.make}</h3>`;
    // carModelElement.innerHTML = `<h4>${car.model}</h4>`
    // carImageElement.src = `${car.image}`;
    // carImageElement.alt= car.make + car.model
    // carPriceElement.innerHTML = `<p>${car.price}</p>`
 }


    // for (let i=0; i<beer.reviews.length; i++){
    //     beerReviewListElement.innerHTML += ('<li>'+beer.reviews[i]+'</li>');
    // }

}