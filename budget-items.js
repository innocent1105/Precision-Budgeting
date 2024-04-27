let db = new Localbase('db')


// notification tab
   let noteTab = document.getElementById("notifications-div");
            function showNote(h1, p){
                
                noteTab.style.display = "block";
                document.getElementById("note-h1").textContent = h1;
                document.getElementById("note-p").textContent = p;
                setTimeout(function hide(){
                    noteTab.style.display = "none";
                    window.location.reload()
                } ,1000)
            }
           



let categoryArray = []
db.collection('allcategories').orderBy('dateModified', 'desc').get().then(allcategories => {
    document.getElementById("itab").style.display = "block"
  categoryArray = allcategories[0].allCategories;
   for(let i = 0; i < categoryArray.length; i++){
       let name = categoryArray[i];
       
       db.collection(name).doc({ id: 1 }).get().then(name => {
           
function addItemTab(){
    document.getElementById("itab").style.display = "block"
    let addTab = document.createElement("div");
         addTab.setAttribute("class","add-new-itm")
         addTab.setAttribute("id","add-new-itm")
    addTab.style.display = "block";
    let h1 = document.createElement("h1");
    h1.textContent = "Add new item";
    addTab.appendChild(h1);
    
    let editCat = document.createElement("div");
    editCat.setAttribute("class", "edit-cat-items");
    let pName = document.createElement("p");
    pName.setAttribute("class","item-data");
    pName.textContent = "Name";
    
    let iName = document.createElement("input");
    iName.setAttribute("id","new-item-add-name");
    
    let pDes = document.createElement("p");
    pDes.setAttribute("class","item-data");
    pDes.textContent = "Description";
    
    let iDes = document.createElement("input");
    iDes.setAttribute("id","new-item-add-des");
    
    let pAmt = document.createElement("p");
    pAmt.setAttribute("class","item-data");
    pAmt.textContent = "Amount";
    
    let iAmt = document.createElement("input");
    iAmt.setAttribute("id","new-item-add-amt");
    iAmt.setAttribute("type","number");
      
    let pNote = document.createElement("p");
    pNote.setAttribute("class","item-data");
    pNote.textContent = "Note or Comment";
    
    let noteArea = document.createElement("textarea");
    noteArea.setAttribute("id","new-item-add-note");
    
    let addBtn = document.createElement("button");
    addBtn.setAttribute("class","add-btn");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", ()=>{
       // add new item here
        let itemName = iName.value;
        let itemDes = iDes.value;
        let itemAmt = iAmt.value;
        let itemNote = noteArea.value;
        
        db.collection(name.catName).add({
            id: 2,
            itemName: itemName,
            itemDes: itemDes,
            itemAmt: itemAmt,
            itemNote: itemNote
        })
        let pp = "One item has been added successfully"
        let h = "Added successfully"
         showNote(h,pp)
         // db update
        if(name.totalExpense != NaN){
             db.collection(name.catName).doc({ id: 1 }).update({
                totalExpense: parseFloat(name.totalExpense) + parseFloat(itemAmt)
            })
        }else{
            console.log("error - Category total expense is Not A Number")
        }
       
        
        document.getElementById("itab").style.display = "none";
    })
    
    addTab.appendChild(editCat)
    editCat.appendChild(pName)
    editCat.appendChild(iName)
    editCat.appendChild(pDes)
    editCat.appendChild(iDes) 
    
    editCat.appendChild(pAmt)
    editCat.appendChild(iAmt)
    editCat.appendChild(pNote)
    editCat.appendChild(noteArea) 
    
    editCat.appendChild(addBtn) 
    
    document.getElementById("itab").appendChild(addTab)
}

           
           
           
           
            let ListItems = document.getElementById("list-items");
           let bItem = document.createElement("div");
            bItem.setAttribute("class","b-item");
                        
            let bItemCat = document.createElement("div");
            bItemCat.setAttribute("class", "b-item-cat");
            let bIcon = document.createElement("i");
            bIcon.setAttribute("class", "bi bi-bag-check");
            bItemCat.appendChild(bIcon);
            
           let itmName = document.createElement("div");
            itmName.setAttribute("class", "itm-name");
            let iName = document.createElement("div");
            iName.setAttribute("class", "i-name");
            iName.textContent = name.catName; 
            let iDate = document.createElement("div");
            iDate.setAttribute("class", "i-date");
            iDate.textContent = name.dateModified;
            itmName.appendChild(iName);
            itmName.appendChild(iDate);
                        
            let itmBtn = document.createElement("div");
            itmBtn.setAttribute("class","b-itm-btns");
            let iPrice = document.createElement("button");
            iPrice.setAttribute("class", "b-btn1");
            if(parseInt(name.totalExpense) == 0){
                 iPrice.innerHTML = name.currency + name.totalExpense + '<p class="add-amount" >Add expense.</p>';
            itmBtn.appendChild(iPrice);
            }else{
                 iPrice.innerHTML =name.currency + name.totalExpense + ' <p class="</p>';
            itmBtn.appendChild(iPrice);
            }
           
                        
            bItem.appendChild(bItemCat);
            bItem.appendChild(itmName);
            bItem.appendChild(itmBtn);
                        
            ListItems.appendChild(bItem);
           
           // event listeners
           let id = name.id;
           let catName = name.catName;
           let totalExpense = name.totalExpense;
           let currency = name.currency;
           let decription = name.decription;
           let comment = name.comment;
           let pinned = name.pinned;
           let dateModified = name.dateModified;
           
           
          
           
           
         
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            let itmSb = document.getElementById("btn-area");
           bItem.addEventListener("click", ()=>{
               let tab = document.getElementById("itab").innerHTML = " ";
               itmSb.innerHTML = " ";
            let catnameHeader = document.createElement("h1");
               catnameHeader.textContent = catName;
               itmSb.appendChild(catnameHeader)
            let amountBox = document.createElement("div");
               amountBox.setAttribute("class","item-price")
               amountBox.textContent = currency + totalExpense;
               
               itmSb.appendChild(amountBox)
             let adBtn = document.createElement("button");
               adBtn.setAttribute("class", "add-btn");
               adBtn.textContent = "Add new item";
            itmSb.appendChild(adBtn);
               let a = 1;
               adBtn.addEventListener("click", ()=>{
                 
                       let tab = document.getElementById("itab").innerHTML = " ";
                      addItemTab();
                
                   
               })
               let itemTab = document.getElementById("item-det");
               itemTab.innerHTML = " "
               //show existing items in cat
//               console.log(name.catName)
               db.collection(name.catName).get().then(name => {
                 for(let x = 0; x < name.length; x++){
                      let nameX = name[x].itemName;
                      let desX = name[x].itemDes;
                      let amtX = name[x].itemAmt;
                      let noteX = name[x].itemNote;
                     
                     console.log(name[x].itemName)
                     if(name[x].itemName != undefined){
                         let itemCat1 = document.createElement("div");
                         itemCat1.setAttribute("class","catItem")
                         
                         let itemCat = document.createElement("div");
                         itemCat.setAttribute("class","item")
                       
                         
                         itemCat1.appendChild(itemCat)
                         let nameX = name[x].itemName;
                         
                         
                         let p1 = document.createElement("h1");
                            p1.textContent = nameX;
                          p1.setAttribute("class","cat-item-name");
                          p1.style.color = "var(--text-color)"
                            itemCat.appendChild(p1)
                          
                         let p2 = document.createElement("h1");
                            p2.textContent = currency + amtX;
                            itemCat.appendChild(p2)
                           p2.setAttribute("class","cat-item-amount");
                         itemCat.appendChild(p1)
                         itemCat.appendChild(p2)
                         
                          function showCatItem(){
                                 if(itemCat1.style.height != "auto"){
                                     itemCat1.style.height = "auto"
                                     console.log('Height is adjusted')
                                 }else{
                                     itemCat1.style.height = "50px"
                                }
                             }

                          p1.addEventListener("click", ()=>{
                              
                              showCatItem()
                         }) 
                        p2.addEventListener("click", ()=>{
                              
                              showCatItem()
                         })
                         
                         
                         
                         
                         
                            let editItemTab = document.createElement("div");
                         editItemTab.setAttribute("class","edit-cat-items");
                         
                         let itemNameP = document.createElement("div");
                         itemNameP.setAttribute("class","item-data");
                         itemNameP.textContent = "Item name";
                         let nameInput = document.createElement("input");
                         nameInput.setAttribute("value", nameX);
                         nameInput.setAttribute("id", "nameX" + x);
                         
                         let itemDesP = document.createElement("div");
                         itemDesP.setAttribute("class","item-data");
                         itemDesP.textContent = "Description";
                         let desInput = document.createElement("input");
                         desInput.setAttribute("value", desX);
                         desInput.setAttribute("id", "desX" + x);
                         
//                         let itemAmtP = document.createElement("div");
//                         itemAmtP.setAttribute("class","item-data");
//                         itemAmtP.textContent = "Amount";
//                         let amtInput = document.createElement("input");
//                         amtInput.setAttribute("value", amtX);
//                         amtInput.setAttribute("type", "number");
//                         amtInput.setAttribute("id", "amtX" + x);
//                         
                         let itemNoteP = document.createElement("div");
                         itemNoteP.setAttribute("class","item-data");
                         itemNoteP.textContent = "Notes or comments";
                         let noteInput = document.createElement("textarea");
                         noteInput.textContent = noteX;
                         noteInput.setAttribute("id", "noteX" + x);
                         
                         let itemBtns = document.createElement("div");
                         itemBtns.setAttribute("class", "item-buttons");
                         
                         let delBtn = document.createElement("button");
                         delBtn.setAttribute("class", "delete-itm-btn");
                         delBtn.textContent = "delete";
                         delBtn.addEventListener("click", ()=>{
                             
                               db.collection(catName).doc({ id: 1 }).update({
                                   totalExpense: totalExpense - amtX
                               })
       
        
                           db.collection(catName).doc({ itemName: nameX }).delete()
                              let p = "Deleted successfully"
                              let h1 = "One item has been deleted successfully."
                              showNote(p, h1)
                            console.log("deleted")
                             itemCat.style.display = "block"
                             // db update
                          
                         })
                          let date = new Date();
                            console.log(date.toDateString(), date.getSeconds())
                         let saveBtn = document.createElement("button");
                         saveBtn.setAttribute("class", "save-itm-btn");
                         saveBtn.textContent = "save";
                         saveBtn.addEventListener("click", ()=>{
                           db.collection(catName).doc({ itemName: nameX }).set({
                                    id: 2,
                                    itemName: document.getElementById("nameX" + x).value,
                                    itemDes: document.getElementById("desX" + x).value,
                                    itemAmt: document.getElementById("amtX" + x).value,
                                    itemNote: document.getElementById("noteX" + x).value 
                             })
                            date = date.toDateString(), new Date().getSeconds();
                               db.collection(catName).doc({ id: 1 }).update({
                                   dateModified: date
                               })
                                let pp = "One item has been updated successfully"
                                let h = "Updated successfully"
                                showNote(h,pp)

                         })
                         
                         
                         itemBtns.appendChild(delBtn);
                         itemBtns.appendChild(saveBtn);
                         
                         
                         
                         
                         editItemTab.appendChild(itemNameP)
                         editItemTab.appendChild(nameInput) 
                         editItemTab.appendChild(itemDesP)
                         editItemTab.appendChild(desInput)
//                         editItemTab.appendChild(itemAmtP)
//                         editItemTab.appendChild(amtInput) 
                         editItemTab.appendChild(itemNoteP)
                         editItemTab.appendChild(noteInput)
                         editItemTab.appendChild(itemBtns)
                         
                         
                         itemCat.appendChild(editItemTab)
                         itemTab.appendChild(itemCat1)
                         
                         
                        }
                 }
                   
                   
                   
                   
                   
         })
              
           })
       })
       
//       console.log(name[0].catName)
  }   
})

// auto refresh 
function reloadTab(){

   setInterval( function(){
                $("#refresh-section").load(location.href + " #refresh-section");
           console.log("reloaded")
 }, 5000 );
 

};
//reloadTab()
















