// DOM list 
let headerTitle=document.querySelector('.header-title')
let headerLogo=document.querySelector('.header-logo')
let bill=document.querySelector('.bill')
let op=document.querySelector('output')
let time=document.querySelector('.time')
let nameElm=document.querySelector('.client_name')
let payTM=document.querySelector('.form-submit')
let main=document.querySelector('main')
let left=document.querySelector('.left')
let right=document.querySelector('.right')
let count=document.querySelector('#countdown')
let afterP=document.querySelector('.afterPayment')

// Load Music 
let orderPlacedMusic=new Audio('images/music-1.mp3')
orderPlacedMusic.volume=.2

// Total Amount
let TotalAmount=[]

document.querySelectorAll('.checkbox').forEach(inv=>{
    inv.addEventListener('change',(e)=>{
      
        if(e.target.checked) {

        // checked code
        let item_name=inv.parentElement.childNodes[9].innerHTML
        let price=inv.parentElement.childNodes[13].innerHTML
        let quantity=inv.parentElement.childNodes[17].value
        let id=inv.parentElement.id

        // calculation 
        let numP=price.split(' ')[1]        
        price=numP*quantity

        // Push to the array
        TotalAmount.push(price)

        // render on page 
        render (item_name,price,quantity,id)

        // Refresh the total amount
        let NewTotal=TotalAmount.reduce((a,b)=>a+b,0)
        op.innerHTML=`Total : Rs. `+NewTotal;
        payMent();
        // if the price is 0 then remove pay option 
        if(NewTotal===0) {
        op.innerHTML=`_ _`;
        }
       }else{
        // unchecked code
        let id=inv.parentElement.id
        // remove the item
        unrender(id)
        // reset the quantity
        document.getElementById(`${id}c`).value=1
       }
    })
})

function render(name,price,quantity,id) {
    let dom =`
    <div class="bl" id=b${id}>
    <span class="amout">${quantity}x</span>
    <span class="item">${name}</span>
    <span class="price">Rs. ${price}</span>
</div>
    `
    bill.insertAdjacentHTML('afterbegin',dom)

}

function unrender(id) {
    let removedom =document.querySelector(`#b${id}`)
    // calutate the amount that shd be removed
    let minus =removedom.childNodes[5].innerHTML.split(' ')[1]
    // Update 
    TotalAmount.push(-minus)
    // remove from the website 
    bill.removeChild(removedom)
    // Refresh the Total
    let NewTotal=TotalAmount.reduce((a,b)=>a+b,0)
    op.innerHTML=`Total : Rs. `+NewTotal
    payMent()
    // if the price is 0 then remove the payment option 
    if(NewTotal===0) {
        op.innerHTML=`_ _`
        }
}

// Time 
let currentTime=new Date().toString()
let displayTime= currentTime.split('GMT')[0]
time.innerHTML=displayTime

// Display the Name on the Page 
let name=location.href.split('?')[1].split('=')[1].toUpperCase()

// Remove the space 
nameElm.innerHTML=decodeURI(name);         // Need to implement --> UNSOLVED

// Count the items and get the list
function billList () {

    let bill_list = []
    let count = bill.childElementCount;
    for (var i =0;i<count;i++) {
        let amt;
        let name;
        if(i===0) {
            amt=bill.childNodes[i+1].childNodes[1].innerHTML
            name=bill.childNodes[i+1].childNodes[3].innerHTML
        }else {
            amt=bill.childNodes[(i*2+1)+i].childNodes[1].innerHTML
            name=bill.childNodes[(i*2+1)+i].childNodes[3].innerHTML
        }
        bill_list.push({
            amt,
            name
        })
    }
    //total amout
    let totalPrice=TotalAmount.reduce((a,b)=>a+b,0)
    return {
        name,
        bill_list,
        totalPrice
    }      
}

// Visible the payment option if price is more than zero 
function payMent() {
    if(TotalAmount.reduce((a,b)=>a+b,0) > 0) {
        payTM.removeAttribute('hidden')
    }else {
        payTM.setAttribute('hidden','')
    }
}

// coundown
function countdown(startOrStop) {
     
        // Update the count down every 1 second

        // Set the date we're counting down to
        var countDownDate = (new Date().getTime()) + 600000     // countdown for 5m 

        x_count = setInterval(function () {
            

            // Get todays date and time
            var now = new Date().getTime();
    
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Output the result in an element with id="demo"
            document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";
            
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "Sorry For Inconvenience";
            }
        }, 1000);
}

// set and remove attribute 
function setRem() {
    payTM.setAttribute('hidden','')
    left.setAttribute('style','display:none')
    right.setAttribute('style','display:none')
    afterP.removeAttribute('style')
    count.removeAttribute('hidden')
    headerTitle.setAttribute('style','display:none')
    headerLogo.setAttribute('style','opacity:0')
}