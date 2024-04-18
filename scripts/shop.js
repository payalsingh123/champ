













let gt= async()=>{
    let mainUrl="http://localhost:5050/product/all"
    let ans= await fetch(mainUrl,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star"  id="star" ></i></p>   
        </div>
        ` 
    });

    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });
   
}

gt()











// ------------------------------TRACKER SYSTEM-------------------------------------

let events = [];
let visitorId;
let eventy = []

window.addEventListener("load", async () => {
    try {
        let ans = await fetch("http://localhost:5050/current", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        let res = await ans.text();
        visitorId = res;
    } catch (error) {
        console.log(error);
    }
    console.log("window loaded of champion")
    eventy.push({
        eventType: 'load',
        url: window.location.href,
        time: new Date().getTime(),
        visitorId: visitorId
    });
    console.log(eventy)
});

document.addEventListener('click', async function (e) {
    eventy.push({
        eventType: 'click',
        x: e.pageX,
        y: e.pageY,
        time: new Date().getTime(),
        visitorId: visitorId
    });
    events = eventy
    eventy = []
    storePost(events)
});

async function storePost(events) {
    let eventUrl = "http://localhost:5050/event"
    await fetch(eventUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(events)
    })
    events = []
}

document.addEventListener('mousemove', async function (e) {

    eventy.push({
        eventType: 'mousemove',
        x: e.pageX,
        y: e.pageY,
        time: new Date().getTime(),
        visitorId: visitorId
    });

    console.log("first event", eventy)
    if (eventy.length > 1000) {
        events = eventy;
        eventy = [];
        storePost(events)
    }
    console.log("last events", eventy)
});

window.addEventListener('scroll', (event) => {
    eventy.push({
        eventType: 'scroll',
        scrollPosition: window.scrollY,
        time: new Date().getTime(),
        visitorId: visitorId
    })
    // console.log(events)
})

window.addEventListener('beforeunload', async (event) => {
    events = eventy;
    eventy = [];
    storePost(events)
})




















































// low to high price
document.querySelector("#price1").addEventListener("click",async()=>{
   
    eventy.push({
        eventType: 'price1', 
        time: new Date().getTime(),
        visitorId: visitorId
    })
   
   
   
   
   
    let url="http://localhost:5050/product/sort/lowToHighPrice"
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });

})

// high to low price
document.querySelector("#price2").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'price2', 
        time: new Date().getTime(),
        visitorId: visitorId
    })



    let url='http://localhost:5050/product/sort/highToLowPrice'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });

})







// rating low to high
document.querySelector("#rate1").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'rate1', 
        time: new Date().getTime(),
        visitorId: visitorId
    })



    let url='http://localhost:5050/product/sort/lowToHighRating'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });

})



// rating high to low
document.querySelector("#rate2").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'rate2', 
        time: new Date().getTime(),
        visitorId: visitorId
    })



    let url='http://localhost:5050/product/sort/highToLowRating'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });
})



// only headphones
document.querySelector("#cat1").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'cat1', 
        time: new Date().getTime(),
        visitorId: visitorId
    })

    let url='http://localhost:5050/product/category/1'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });
})


// only earbuds
document.querySelector("#cat2").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'cat2', 
        time: new Date().getTime(),
        visitorId: visitorId
    })

    let url='http://localhost:5050/product/category/2'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i> </p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });
})



document.querySelector("#cat3").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'cat3', 
        time: new Date().getTime(),
        visitorId: visitorId
    })


    let url='http://localhost:5050/product/category/3'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i>  </p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });
})




document.querySelector("#sort1").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'sort1', 
        time: new Date().getTime(),
        visitorId: visitorId
    })

    let url='http://localhost:5050/product/sort/AtoZ'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i></p>   
        </div>
        ` 
    });
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });

})




document.querySelector("#sort2").addEventListener("click",async ()=>{

    
    eventy.push({
        eventType: 'sort2', 
        time: new Date().getTime(),
        visitorId: visitorId
    })

    let url='http://localhost:5050/product//sort/ZtoA'
    let ans= await fetch(url,{
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    })
    let res= await ans.json()
    console.log(res);
    document.querySelector("#right").innerHTML=''
    res.forEach(el => {
      
        document.querySelector("#right").innerHTML+=`
        <div id="${el.id}" >
            <img src="${el.image}" alt="">
            <p class="prod">${el.name}</p>
            <p class="price">${el.price}$</p>
            <p class="rating">${el.rating}<i class="fa-solid fa-star" id="star"></i></p>   
        </div>
        ` 
    });
   
    document.querySelectorAll("#right>div").forEach(el => {
        el.addEventListener("click",productPage)
    });

})










 



async function productPage(){
    let ans= this.id
    window.location.href=`http://localhost:5050/public/product.html?id=${ans}`
    //  =`http://localhost:5050/product/${ans}`
}






































 
