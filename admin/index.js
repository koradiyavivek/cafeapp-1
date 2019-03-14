// DOM list 
let clCard = document.querySelector('.main-content')


var socket = io()

// from client 
socket.on('serverToAdmin', dataFromServer => {
    console.log(dataFromServer)
    let client_card = `
                        <div class="client-card ${dataFromServer.name}">
                                <h4 class="client-h4">${dataFromServer.name}</h4>
                                <ul class="client-ul">
                                ${listDom(dataFromServer.bill_list)}
                                </ul>
                                <label for="tick" class="fixit fixit-${dataFromServer.name}">Verify</label>
                                <input type="checkbox" class="checkbox checkbox-${dataFromServer.name}" id="tick"/>
                                <div id="countdown-${dataFromServer.name}" class="countdown"></div>
                                <button class="client-button" id="${dataFromServer.name}">Ready</button>
                            </div>
   `
    //    it will create a li element 
    function listDom(array) {
        let string = array.map(inv => {
            return `<li>${inv.amt} ${inv.name}</li>`
        })
        // adding the string together
        return string.reduce((a, b) => a + b)
    }

    // Render to screen 
    clCard.insertAdjacentHTML('afterbegin', client_card)
    // click functionality
    cliky(dataFromServer.name)
})


// from admin to client communication 

document.addEventListener('click', (e) => {

    if (e.target.className === 'client-button') {
        let cliName = e.target.id

        // send to client via server
        socket.emit('adminToServer', {
            to: cliName,
            message: "Thank You For Waiting, Order is ready !"
        })

        // Remove the card of the client 
        document.querySelector(`.${cliName}`).remove()
        
    }
})


// checkbox functionality
function cliky(send) {
    document.querySelector('.checkbox').addEventListener('click', (e) => {
        if (e.target.checked) {
            document.querySelector(`#countdown-${send}`).remove()
            document.querySelector(`.checkbox-${send}`).remove()
            document.querySelector(`.fixit-${send}`).remove()
        }
    })
    countdown(send)

}

// countdown
function countdown(send) {

    console.log(send)
    // Update the count down every 1 second
    let x=send
    // Set the date we're counting down to
    var countDownDate = (new Date().getTime()) + 600000 / 2 // countdown for 10m 

    x = setInterval(function () {


        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById(`countdown-${send}`).innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            t()
        }
    }, 1000);

    function t() {
        clearInterval(x);
        // do it here
        document.querySelector(`.${send}`).remove()
    }
    document.querySelector(`.checkbox-${send}`).addEventListener('click', (e)=>{
        if (e.target.checked) {
            clearInterval(x);
        }
    })
    
}
