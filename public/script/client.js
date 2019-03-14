var server = io.connect();

server.on('connect', function () {
    console.log("Connected to server")
})

payTM.addEventListener('click',function (e){
    console.log(billList())  
    // disable the button so user cant spam the button
    payTM.setAttribute('disabled','disabled')
    // Sending the data to the server to get to admin 
    server.emit('clientToServer',billList())

    // hide the payment button and other section
    setTimeout(()=>{
        // set and remove attribute
        setRem()
        // play music 
        orderPlacedMusic.play()
        // scroll up 
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },1000)

    // set the new count down 
    countdown(1)
})

// Data received from the server 
server.on(name, (dataFromServer)=>{
    console.log(dataFromServer)
    thingsTodoAfter(dataFromServer)
    navigator.vibrate([1000, 500, 1000, 500, 1000, 500, 1000])
})

function thingsTodoAfter(message) {
    document.querySelector('.afterPayment h2').setAttribute('style', `
    transform:translateX(-500rem);
    transition: all 4s;
    `)
    document.querySelector('.afterPayment h3').setAttribute('style', `
    transform:translateX(500rem);
    transition-delay: .5s;
    transition: all 4s;
    `)
    document.querySelector('.afterPayment img').setAttribute('src','https://i.gifer.com/JUU.gif')

    clearInterval(x_count)

    document.querySelector('#countdown').innerHTML=message

    document.querySelector('.afterPayment img').setAttribute('style',`
    transform:translateY(-8rem);
    transition: all .5s;
    `)
    document.querySelector('#countdown').setAttribute('style',`
    transform:translateY(-8rem);
    transition: all .5s;
    `)

}
