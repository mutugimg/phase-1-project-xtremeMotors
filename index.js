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
const carSearchBarButton = document.getElementById("search-button")
const enquireNowButton = document.getElementById("enquireBtn")
const contactUsSendButton = document.getElementById("send-button")
const url=" http://localhost:3000"
let carFilter;

document.addEventListener("DOMContentLoaded",function(){
    console.log("loadingDom")
    fetchDataById();
})

function fetchDataById() {

    fetch(`${url}/Cars`)
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
    <button id="enquireBtn" type="button" 
    <a href="#contact"> Enquire Now</a>
       
    </button>
</div>`
 }

}

carSearchSelectTextElement.onclick = function(){
    carSearchListElement.classList.toggle("open")
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
    
    fetch(`${url}/Cars`)
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

function searchCar(searchCar){
    
    fetch(`${url}/Cars`)
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
    console.log("enquring button...");
})

carSearchBarButton.addEventListener("click",function(){
    let searchCar =document.getElementById("contact-name").value
    console.log(searchCar);
    searchCar(searchCar);
})

contactUsSendButton.addEventListener("click",function(){
    
    console.log("sending message...");
    let message={
        name:document.getElementById("contact-name").value,
        email: document.getElementById("contact-email").value,
        message_text: document.getElementById("message-text").value
    }

    postMessage(message);
})

// Post new message to server
function postMessage(newMessage) {
    fetch(`${url}/messages`, {
        // Specify the HTTP method
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // convert the object from the input field and convert to JSON
        body: JSON.stringify(newMessage)
    })
        .then(res => res.json())
        .then(message => console.log(message))
}


    




