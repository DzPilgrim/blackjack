    let btnQuedarse = document.querySelector("#quedarse")
    let btnPedir = document.querySelector("#pedir")
    var vidasJugador=3
    var vidasMaquina=3
    const tv=document.querySelector(".otros")
    tv.innerHTML="<img src=./img/estatica.gif>"
    function empezar(){
        turnoActual=Math.floor(Math.random()*2)
        cartaOculta()
    }

    function reiniciarJuego() {
        tv.innerHTML="<img src=./img/estatica.gif>"
        vidasJugador = 3
        vidasMaquina = 3
        puntosJugador = 0
        puntosMaquina = 0
        contadorMaquina = 2
        contadorJugador = 2
        contadorPartido = 0
        puntoSecretoJugador = 0
        puntoSecretoMaquina = 0
        n = 0
        turnoActual = 2
        turnos = 0
        btnPedir.disabled = true
        btnQuedarse.disabled = true
        document.querySelector(".caraAtras1").innerHTML = ""
        document.querySelector(".caraAtras2").innerHTML = ""
        cartas=[1,2,3,4,5,6,7,8,9,10,11]
        document.querySelector(".caraAtras1").innerHTML = ""
        document.querySelector(".caraAtras2").innerHTML = ""
        for (let i = 1; i < 7; i++) {
            let cartaJugador = document.querySelector(`.d${i}`)
        let cartaMaquina = document.querySelector(`.a${i}`)    
            if (cartaJugador) {
                cartaJugador.innerHTML = ""
                cartaJugador.classList.remove("animacion1")
            }
            if (cartaMaquina) {
                cartaMaquina.innerHTML = ""
                cartaMaquina.classList.remove("animacion1")
            }
        }
        let d1=document.querySelector(".d1")
        let a1=document.querySelector(".a1")
        d1.innerHTML='<div class="caraAtras1 cara"></div>' +
        '<div class="caraFrente cara">' +
        '<img src="./img/caraTrasera.png" alt="">' +
        '</div>'
        a1.innerHTML='<div class="caraAtras2 cara"></div>' +
        '<div class="caraFrente cara">' +
        '<img src="./img/caraTrasera.png" alt="">' +
        '</div>'
        reiniciarCartas()
        empezar()
    }

    function reiniciarCartas() {
        const caraAtras1 = document.querySelector(".caraAtras1");
        const caraAtras2 = document.querySelector(".caraAtras2");
        let d1 = document.querySelector(".d1");
        let a1 = document.querySelector(".a1");
        if (caraAtras1) {
            caraAtras1.classList.remove("animacionVoltear");
        }
        
        if (caraAtras2) {
            caraAtras2.classList.remove("animacionVoltear");
            
        }
        
        document.querySelector(".juego").classList.remove("animacion2");
        document.querySelector(".juego").classList.remove("animacion3");
        
        setTimeout(() => {
            document.querySelector(".juego").classList.add("animacion3");
            a1.classList.remove("animacionVoltear");
            d1.classList.remove("animacionVoltear");
            setTimeout(() => {
                cartaOculta();
            }, 1000);
        }, 1000);
        if (d1) {
            d1.style.transform = "translateX(0)";
        }
        if (a1) {
            a1.style.transform = "translateY(0)";
        }

        setTimeout(() => {
            if (d1) {
                d1.classList.add("animacion1");
            }
            if (a1) {
                a1.classList.add("animacion1");
            }
        }, 1000);
    }

    var cartas=[1,2,3,4,5,6,7,8,9,10,11]
    btnPedir.disabled=true
    btnQuedarse.disabled=true
    var puntosJugador =0
    var puntosMaquina =0
    var contadorMaquina=2
    var contadorJugador=2
    var contadorPartido=0
    var puntoSecretoJugador=0
    var puntoSecretoMaquina=0
    var n=0
    var turnoActual=2
    var turnos=0
    function quedarse(){
        turnos++
        if(turnoActual===1){
            if(turnos<2){
                turnoActual=0
                btnPedir.disabled = true
                btnQuedarse.disabled = true
                jugar()
            }else{
                comprobarGanador()
            }
        }else if(turnoActual==0){
            if(turnos<2){
                turnoActual=1
                jugar()
            }else{
                btnPedir.disabled = true
                btnQuedarse.disabled = true
                comprobarGanador()
            }
        }
    }
    function pedirCarta() {
        if (turnos < 2) {
            if (turnoActual == 0) {
                let tiempo = Math.floor(Math.random() * 5);
                setTimeout(() => {
                    seleccionarCarta();
                    jugar();
                }, (tiempo + 0.1) * 1000);
            } else {
                seleccionarCarta();
                jugar();
            }
        } else {
            comprobarGanador();
        }
    }

    function jugar(){

        if(turnoActual==0){
            if(contadorMaquina>=7||puntosMaquina>21){
                quedarse()
            }else{
                let probPedir=50
                if(contadorMaquina==2){
                    probPedir=probPedir+50
                }
                if(contadorMaquina==3){
                    probPedir=probPedir+10
                }
                if(contadorMaquina>=5){
                    probPedir=probPedir-30
                }
                if(puntosMaquina-5>puntosJugador&&puntosJugador>0){
                    probPedir=probPedir-20
                }else if(puntosMaquina-3>puntosJugador&&puntosJugador>0){
                    probPedir=probPedir-10
                }
                if(puntosJugador>21){
                    probPedir=probPedir-10000
                }
                if(puntosMaquina>10){
                    probPedir=probPedir-20
                }else if(puntosMaquina>17){
                    probPedir=probPedir-70
                }else if(puntosMaquina<7){
                    probPedir=probPedir+20
                }
                n = Math.floor(Math.random() * 100);
                n = n + 1
                if (n <= probPedir) {
                    setTimeout(() => {
                        pedirCarta()
                    }, 500)
                } else {
                    setTimeout(() => {
                        quedarse()
                    }, 500)
                }
            }
        } else {

            if(contadorJugador>=7||puntosJugador>21){
                btnPedir.disabled=true
                btnQuedarse.disabled=true
                quedarse()
            }else{
                btnPedir.disabled=false
                btnQuedarse.disabled=false
                btnPedir.removeEventListener("click", pedirCarta)
                btnQuedarse.removeEventListener("click", quedarse)
                btnPedir.addEventListener("click",pedirCarta)
                btnQuedarse.addEventListener("click", quedarse)
            }
        }
        
    }

    function seleccionarCarta() {
        let valorCarta = cartas[Math.floor(Math.random() * cartas.length)];
        let posCarta = cartas.indexOf(valorCarta);
        let cartaEscogida = cartas.splice(posCarta, 1)[0];
        if (turnoActual == 0) {
            puntosMaquina = puntosMaquina + cartaEscogida;
            cartasImagen(cartaEscogida);
            contadorMaquina++;
        } else if (turnoActual == 1) {
            puntosJugador = puntosJugador + cartaEscogida;
            cartasImagen(cartaEscogida);
            contadorJugador++;
        }
        console.log(cartaEscogida);
    }
    function cartaOculta(){
        contadorPartido = 0
        while(contadorPartido<2){
            let valorCarta = cartas[Math.floor(Math.random()*cartas.length)]
            let posCarta = cartas.indexOf(valorCarta)
            let cartaEscogida = cartas.splice(posCarta,1)[0]
            if(contadorPartido==0){
                puntoSecretoJugador=cartaEscogida
            }else if(contadorPartido==1){
                puntoSecretoMaquina=cartaEscogida
            }
        
            contadorPartido++
        } 
        document.querySelector(".caraAtras1").innerHTML = `<img src="./img/carta${puntoSecretoJugador}.png" alt="carta">`
        document.querySelector(".caraAtras2").innerHTML =  `<img src="./img/carta${puntoSecretoMaquina}.png" alt="carta">`
        jugar()
    }
    function comprobarGanador() {
        puntosJugador = puntosJugador + puntoSecretoJugador;
        puntosMaquina = puntosMaquina + puntoSecretoMaquina;
        tv.innerHTML = "<img src=./img/desenlace.png>";

        setTimeout(() => {
            document.querySelector(".a1").classList.add("animacionVoltear");
            document.querySelector(".d1").classList.add("animacionVoltear");
            document.querySelector(".caraAtras1").classList.add("animacionVoltear");
            document.querySelector(".caraAtras2").classList.add("animacionVoltear");

            setTimeout(() => {
                let resultado;
                if ((puntosJugador > puntosMaquina && puntosJugador < 22) || (puntosMaquina > 21 && puntosJugador < 22)) {
                    resultado = "ganas";
                } else if ((puntosMaquina > puntosJugador && puntosMaquina < 22) || (puntosJugador > 21 && puntosMaquina < 22)) {
                    resultado = "pierdes";
                } else {
                    console.log("empate");
                }

                tv.innerHTML = `<img src=./img/${resultado}.png>`;

                setTimeout(() => {
                    document.querySelector(".juego").classList.remove("animacion3");
                    document.querySelector(".juego").classList.add("animacion2");

                    setTimeout(() => {
                        reiniciarJuego();
                    }, 1000);
                }, 3000);
            }, 500);
        }, 5000);
    }
    function cartasImagen(n){
        if(turnoActual==1&&contadorMaquina<7){
            document.querySelector(`.d${contadorJugador}`).innerHTML = `<img src="./img/carta${n}.png">`
            document.querySelector(`.d${contadorJugador}`).classList.add("animacion1")
        }else if(turnoActual==0&&contadorJugador<7){
            
            document.querySelector(`.a${contadorMaquina}`).innerHTML =`<img src="./img/carta${n}.png">`
            document.querySelector(`.a${contadorMaquina}`).classList.add("animacion1")
        }
    }
    empezar()

