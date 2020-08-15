console.log('Hello World!')
const listView = document.querySelector('#lstLocs')
const slcTitle = document.querySelector('#slcTitle')
const slcDesc = document.querySelector('#slcDesc')
const slcName = document.querySelector('#slcName')
const slcLocation = document.querySelector('#slcLocation')
const slcCategory = document.querySelector('#slcCategory')
const slcCard = document.querySelector('#slcCard')
const slcPrice = document.querySelector('#slcPrice')
const slcContact = document.querySelector('#slcContact')
const inputForm =document.querySelector('#form')
const deleteBTN = document.querySelector('#deleteForm')

const getAllEntries = ()=>{
   
    clearList(listView)
    
    fetch('/items').then((response) =>{
        response.json().then((data)=>{
            //console.log(data)
            if (data.error){
                const tmpItem=document.createElement("button")
                tmpItem.innerHTML = "Error loading data. Please try again"
                tmpItem.classList.add("list-group-item")
                listView.appendChild(tmpItem) 
            }   
            else{
                console.log('Success: Now loading data');
                for (let i=0;i<data.length;i++){
                    const tmpItem=document.createElement("button")
                    tmpItem.innerHTML = '<button type=button class="list-group-item list-group-item-action">'+data[i].title+'</button>'
                    tmpItem.addEventListener('click',()=>{showEntry(data[i]._id)})
                    console.log(tmpItem.innerHTML)
                    tmpItem.classList.add("list-group-item")
                    listView.appendChild(tmpItem) 
                }
                
            }
                
        })
    })
    
}

const getNewID = () =>{
    fetch('/items').then((response) =>{
        response.json().then((data)=>{
            //console.log(data)
            if (data.error){
                console.log(error) 
            }   
            else{
                console.log('Success: Now loading data');
                for (let i=0;i<data.length;i++){
                    if(i === data.length - 1){
                        document.getElementById('itemID').innerText = data[i]._id
                    }
                    else{

                    }
                }
                
            }
                
        })
    })
}

const clearList=(listView)=>{
    while (listView.firstChild)
    listView.removeChild(listView.firstChild)
}

const showEntry=(id)=>{
    slcCard.classList.remove('d-none')
    console.log(id)
    fetch('/items/'+id).then((response) =>{
        response.json().then((data)=>{
            //console.log(data)
            if (data.error){
                slcTitle.innerHTML = "Error loading data. Please try again"
            }   
            else{
                console.log('Success: Now loading data');      
                slcTitle.innerHTML=data.title
                slcDesc.innerHTML=data.description
                slcName.innerHTML='Seller : ' + data.sellerName
                slcCategory.innerHTML='Category : ' + data.category
                slcPrice.innerHTML='Price : $ ' + data.price
                slcLocation.innerHTML='Location : '+data.lat+', '+data.long
                slcContact.innerHTML='For more information call ' + data.contact
                // slcImage.innerHTML ='<img id="slcImage" class="card-img-top" src="'+data.image+'" ">'
                //slcImage.src=data.image
        
            }
                
        })
    })

}

inputForm.addEventListener('submit',(e)=>{
    console.log('here')
    e.preventDefault()
    console.log('here2')
    const title = document.querySelector('#title');
    const des = document.querySelector('#description');
    const name = document.querySelector('#name');
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lon');
    const category =document.querySelector('#category')
    const price = document.querySelector('#price')
    const contact = document.querySelector('#contact')

    const post_request_object={
        "title": title.value,
        "description": des.value,
        "sellerName": name.value,
        "lat": lat.value, 
        "long":  lon.value,
        "category": category.value,
        "price": price.value,
        "contact": contact.value
    }

    fetch('/items', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(post_request_object),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getAllEntries()
        })
        .then(document.getElementById('itemID').innerText = getNewID())
        .then(document.getElementById('ModalBox').style.display = 'block')
        .catch((error) => {
            console.error('Error:', error);
        });
})

deleteBTN.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = document.getElementById('IDToDelete').value

    fetch('/items/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .then(getAllEntries())
        .catch((error) => {
            console.error('Error:', error);
        });
})

slcCard.classList.add('d-none')
getAllEntries()