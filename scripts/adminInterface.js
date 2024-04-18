window.onload = async () => {
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    // let id=sessionStorage.getItem(JSON.parse(adminObj))
    // console.log(id);
    let url = `http://localhost:5050/admin/${data.id}`
    try {
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        let ss = await res.json()
        // console.log(ss);
        displayImage(ss)
    } catch (error) {
        console.log(error);
    }
}

let displayImage = (ss) => {
    document.querySelector("#profileImg").src = ss.profile
    document.querySelector("#welcome").innerText = `Welcome ${ss.fullname}`
}

document.querySelector("#subOther1").addEventListener("click", () => {
    document.querySelector("#addCategory").style.display = 'block'
    document.querySelector("#visitor").style.display = 'none'
    document.querySelector("#addProduct").style.display = 'none'
    document.querySelector("#allProduct").style.display = 'none'
    document.querySelector("#myProduct").style.display = 'none'


})


document.querySelector("#submitCat").addEventListener("click", async () => {
    let url = "http://localhost:5050/category"
    let name = document.querySelector("#category").value
    let obj = { name }
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    let ans = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': data.token
        },
        body: JSON.stringify(obj)
    })
    console.log(ans);
    document.querySelector("#notify").innerText = 'New Category Added'
    document.querySelector("#notify").style.display = 'inline-block'
    document.querySelector("#category").value = '';
    setTimeout(() => {
        document.querySelector("#notify").style.display = 'none'
    }, 2000);
})

document.querySelector("#subOther2").addEventListener("click", () => {
    document.querySelector("#addCategory").style.display = 'none'
    document.querySelector("#visitor").style.display = 'none'
    document.querySelector("#allProduct").style.display = 'none'
    document.querySelector("#addProduct").style.display = 'block'
    document.querySelector("#myProduct").style.display = 'none'

})



document.querySelector("#addProduct form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting via the browser.
    var formData = new FormData(event.target);
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    let url = "/product"
    let req = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': data.token
        },
        body: formData
    })
    console.log(req);
    document.querySelector("#notify").innerText = 'New Product Add'
    document.querySelector("#notify").style.display = 'inline-block'
    // document.querySelector("#addProduct input").value=''
    setTimeout(() => {
        document.querySelector("#notify").style.display = 'none'
    }, 1500);
});

document.querySelector("#subOther3").addEventListener("click", async () => {
    document.querySelector("#addCategory").style.display = 'none'
    document.querySelector("#visitor").style.display = 'none'
    document.querySelector("#addProduct").style.display = 'none'
    document.querySelector("#allProduct").style.display = 'grid'
    document.querySelector("#myProduct").style.display = 'none'
    document.querySelector("#allProduct").innerHTML = ''
    document.querySelector("#allProduct").innerHTML = `
    <div id="editPage">
        <div id="editHead">
            <div>
             <h3>Edit Product</h3>
            </div>
          
         <i class="fa-solid fa-xmark" id="fac" ></i>
        </div>
 

        <div id="changePro" class="change" >
            <h3>Product Name : &nbsp;</h3> 
            <input type="text"  placeholder="change product name">
        </div>
        <div id="changePrice" class="change" >
            <h3>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3> 
            <input type="number"   placeholder="change price">
        </div>
        <div id="changeDesc" class="change" >
            <h3>Description :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <input type="text" name="desc" id="desc" placeholder="change description">
        </div>
        <button id="editSub">Submit</button>
    </div>
    <div id="fixed"></div>
    `

    let url = 'http://localhost:5050/product/all'
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    let ans = await res.json()
    // console.log(ans);
    ans.forEach(el => {
        document.querySelector("#allProduct").innerHTML += `
        <div id="allProSub">
            <img src="${el.image}" alt="">
            <p>${el.name}</p>
            <p>${el.price}$</p>
            <p>${el.rating}<i class="fa-solid fa-star" style="color: cadetblue;"></i></p>
            <button id=${el.id} class="edit">Edit</button>
            <button id=${el.id} class="delete">Delete</button>
        </div>
        `

    });
    // adding click event listener on edit
    let allEdit = document.querySelectorAll(".edit")
    allEdit.forEach(el => {
        el.addEventListener("click", editButton)
    });

    // adding click event listener on delete
    let allDelete = document.querySelectorAll(".delete")
    allDelete.forEach(el => {
        el.addEventListener("click", deleteB)
    });

    // hiding the edit page by clicking cancel
    document.querySelector("#fac").addEventListener("click", () => {
        document.querySelector("#editPage").style.display = 'none'
    })


})



document.querySelector("#subOther4").addEventListener("click", async () => {
    document.querySelector("#myProduct").style.display = 'grid'
    document.querySelector("#visitor").style.display = 'none'
    document.querySelector("#addCategory").style.display = 'none'
    document.querySelector("#addProduct").style.display = 'none'
    document.querySelector("#allProduct").style.display = 'none'


    document.querySelector("#myProduct").innerHTML = ''
    document.querySelector("#myProduct").innerHTML = `
    <div id="editPage">
        <div id="editHead">
            <div>
             <h3>Edit Product</h3>
            </div>
          
         <i class="fa-solid fa-xmark" id="fac" ></i>
        </div>
 

        <div id="changePro" class="change" >
            <h3>Product Name : &nbsp;</h3> 
            <input type="text"  placeholder="change product name">
        </div>
        <div id="changePrice" class="change" >
            <h3>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3> 
            <input type="number"   placeholder="change price">
        </div>
        <div id="changeDesc" class="change" >
            <h3>Description :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <input type="text" name="desc" id="desc" placeholder="change description">
        </div>
        <button id="editSub">Submit</button>
    </div>
    <div id="fixed"></div>
    `
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    let url = `http://localhost:5050/product/?admin=${data.admin}`
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "Authorization": data.token
        }
    })
    let ans = await res.json()
    // console.log(ans);
    ans.forEach(el => {
        document.querySelector("#myProduct").innerHTML += `
        <div id="allProSub">
            <img src="${el.image}" alt="">
            <p>${el.name}</p>
            <p>${el.price}$</p>
            <p>${el.rating}<i class="fa-solid fa-star" style="color: cadetblue;"></i></p>
            <button id=${el.id} class="edit">Edit</button>
            <button id=${el.id} class="delete">Delete</button>
        </div>
        `

    });
    // adding click event listener on edit
    let allEdit = document.querySelectorAll(".edit")
    allEdit.forEach(el => {
        el.addEventListener("click", editButton)
    });

    // adding click event listener on delete
    let allDelete = document.querySelectorAll(".delete")
    allDelete.forEach(el => {
        el.addEventListener("click", deleteB)
    });

    // hiding the edit page by clicking cancel
    document.querySelector("#fac").addEventListener("click", () => {
        document.querySelector("#editPage").style.display = 'none'
    })





})


// code about visitors
document.querySelector("#subOther5").addEventListener("click", async () => {
    document.querySelector("#visitor").style.display = 'block'
    document.querySelector("#myProduct").style.display = 'none'
    document.querySelector("#addCategory").style.display = 'none'
    document.querySelector("#addProduct").style.display = 'none'
    document.querySelector("#allProduct").style.display = 'none'
    let visitorUrl = "http://localhost:5050/visitor"

    let res = await fetch(visitorUrl, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json'
        }
    })
    let ans = await res.json()

    // console.log(ans);
    display(ans)

})

async function display(ans) {
    document.querySelector("#visitor").innerHTML = ''
    // document.querySelector("#visitor").innerHTML=
    ans.forEach(el => {
        let ans = el.visitorName.split("");
        let real=ans[0].toUpperCase()
        ans[0]=real
        let final=ans.join("")
        document.querySelector("#visitor").innerHTML += `
                <div class="elVisId" id='${el.visitorId}' >
                    <p class="elfinal">${final}</p>
                    <p class="elcity">${el.city},${el.state}</p>
                    <p class="elcurrentt" >${el.currentTime}</p>
                </div>
        `
    });

    let allV = document.querySelectorAll(".elVisId")

    allV.forEach(el => {
        el.addEventListener("click", visitorClicked)
    });

}


async function visitorClicked() {

    let id = this.id
    window.location.href = `http://localhost:5050/public/tracker.html?id=${id}`
    





}



let editProductUrl;
function editButton(e) {
    let ans = e.target.getAttribute('id')
    console.log(ans);
    document.querySelector("#editPage").style.display = 'block'
    editProductUrl = `/product/${ans}`
    document.querySelector("#editSub").addEventListener("click", editP)
}

async function editP() {

    let price = document.querySelector("#changePrice input").value
    let desc = document.querySelector("#changeDesc input").value
    let productName = document.querySelector("#changePro input").value
    document.querySelector("#changePrice input").value = ""
    document.querySelector("#changeDesc input").value = ""
    document.querySelector("#changePro input").value = ""
    let payload = {

    }
    if (price) {
        payload.price = price
    }
    if (desc) {
        payload.desc = desc
    }
    if (productName) {
        payload.name = productName
    }
    console.log(payload);
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    try {
        let res = await fetch(editProductUrl, {
            method: 'PATCH',
            headers: {
                "Authorization": data.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        console.log(res);
        console.log("after res");
        // let ans= await res.parse();
        // console.log(ans);
        if (res.ok) {
            document.querySelector("#notify").innerText = 'product updated successfully'
            document.querySelector("#editPage").style.display = 'none'
            document.querySelector("#notify").style.display = 'block'
            setTimeout(() => {
                document.querySelector("#notify").style.display = 'none'
            }, 2500);
        } else {
            console.log("not authorized");
            document.querySelector("#notify").innerText = 'You are not Authorized to Update'
            // document.querySelector("#editPage").style.display = 'none'
            document.querySelector("#notify").style.display = 'block'
            setTimeout(() => {
                document.querySelector("#notify").style.display = 'none'
            }, 2500);
        }
    } catch (error) {
        console.log("error not autho");
        console.log(error);
    }








}

// when some one click on delete button so catching the query
async function deleteB(e) {
    let data = JSON.parse(sessionStorage.getItem("adminObj"))
    let ans = e.target.getAttribute('id')
    let deleteProductUrl = `/product/${ans}`
    console.log(deleteProductUrl);
    let res = await fetch(deleteProductUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': data.token,
            'Content-type': 'application/json'
        },

    })
    console.log(res);
    if (res.ok) {
        document.querySelector("#notify").innerText = 'Product Sucessfully Deleted'
        document.querySelector("#notify").style.display = 'block'
        setTimeout(() => {
            document.querySelector("#notify").style.display = 'none'
        }, 2000);
    } else {
        document.querySelector("#notify").innerText = 'You are Not Authorize to Delete'
        document.querySelector("#notify").style.display = 'block'
        setTimeout(() => {
            document.querySelector("#notify").style.display = 'none'
        }, 2000);
    }
}

