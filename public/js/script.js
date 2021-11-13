const checkoutButton = document.getElementById("checkout")
checkoutButton.addEventListener('click',()=>{
    fetch('/checkout',{method:'POST',headers: {'Content-Type': 'application/json'}})
    .then((res)=>res.json()
)
    .then((data)=>{
        window.location= data.url
    }
    )
})