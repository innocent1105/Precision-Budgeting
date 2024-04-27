
//  let db = new Localbase('db')
let categoriesArray = [];

let categories1 = ["Bills","Food","Rent","Groceries","Taxes","Transportation"];
let categories2 = ["Leisure","Subcriptions","School","Tithe and Donations","Loans","Car service"];
function firstCategoryChoose(categories){

for(let i = 0; i < categories.length; i++){
    let catElement = document.createElement("button");
    catElement.setAttribute("class", "category");
    catElement.textContent = categories[i];
    let itemsTab = document.getElementById("items-tab");
    itemsTab.appendChild(catElement);
    if(i == 2){
        let br = document.createElement("br");
        itemsTab.appendChild(br)
    }
    catElement.addEventListener("click", function myFunc(){
        if(catElement.style.borderStyle != "hidden"){
              catElement.style.borderStyle = "hidden"
              catElement.style.backgroundColor = "rgb(161 185 255)"
              catElement.style.color = "#fff";
            categoriesArray.push(categories[i]);
            console.log(categoriesArray) 
        }else{
            categoriesArray.splice(categoriesArray.indexOf(categories[i]), 1)
            
            console.log(categoriesArray) 
              catElement.style.borderStyle = "solid"
              catElement.style.backgroundColor = "#fff"
              catElement.style.color = "royalblue";
        }
        
    })
  }
    
}

firstCategoryChoose(categories1)
function coins(){
    let coin = parseInt(window.localStorage.getItem("coins")) + 25;
    window.localStorage.setItem("coins", coin)  
    let coins = window.localStorage.getItem("coins");
    let coinDiv = document.getElementById("coins-value");

        coinDiv.innerHTML = coins +" coins";
}





function notifyMe(){
    let itemsTab = document.getElementById("items-tab");
    
        let categoriesNumber = categoriesArray.length;
//        console.log(categoriesNumber)
      let db = new Localbase('db')
      db.collection('allcategories').add({
            id: 32,
            allCategories: categoriesArray,
            allCategoriesLength: categoriesNumber
        }) 
    
    
    
    itemsTab.innerHTML = '';
    document.getElementById("loader").style.display = "block";
    document.getElementById("select-top-text").style.display = "none";
    setTimeout(function wait(){
         document.getElementById("loader").style.display = "none";
            document.getElementById("done").style.display = "flex";
    document.getElementById("select-top-text").style.display = "none";
    coins()
       document.getElementById("done-button").style.display = "block";
       document.getElementById("next1").style.display = "none";
    }, 1000)
    

}


document.getElementById("next1").addEventListener("click", ()=>{
     let itemsTab = document.getElementById("items-tab");
    itemsTab.innerHTML = " "; 
    firstCategoryChoose(categories2)
     document.getElementById("next1").setAttribute("onclick", "notifyMe()")
     document.getElementById("next1").textContent = "Save and continue";
    let coins = 25;
   window.localStorage.setItem("coins", coins)

    
  
})
 
document.getElementById("large-primary-btn").addEventListener("click", ()=>{
    for(let x = 0; x < categoriesArray.length; x++){
    let date = new Date();
        date = date.toDateString();
    let catName = categoriesArray[x];
    db.collection(catName)
        .add({
         id: 1,
         catName: catName,
         totalExpense: 0,
         currency: "K",
         decription: "no description so far.",
         comment: "no comment added.",
         pinned: false,
         dateModified: date
    }, 'Key : 1')
            .then(response => {
          console.log('Add successful')
        })
            .catch(error => {
                console.log('There was an error.')
        })

}

    coins()
   
})






















