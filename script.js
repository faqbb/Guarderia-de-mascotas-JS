
// Contructor de objeto Mascota
class Mascota {
 constructor(nombre, edad, raza, horas, dueño) {
    this.nombre = nombre
    this.edad = edad
    this.raza = raza 
    this.horas = parseFloat(horas)
    this.dueño = dueño
 }
}
// fetch a los datos en clientes.json
let clientes = []
fetch('clientes.json')
.then(promesa => promesa.json())
.then(data => {
    for (let cliente of data) {
    clientes.push(cliente);
      localStorage.setItem("clientes", JSON.stringify(clientes))
    }
})
// funcion que retorna el total a pagar segun las horas de estadia
function total (horas) {
    if (horas >= 8) {
        return horas * 200 + 200
    }
    else {
        return horas * 200
    }
}
// Logeo y posterior modificacion del html
let transicionUser = document.getElementById('fila')
let transicionUserReg = document.getElementById('filaReg')
let loguearse = document.getElementById('login')
        loguearse.addEventListener('submit', (e) => {
            e.preventDefault()
            JSON.parse(localStorage.getItem("clientes"))
            let nombreLog = document.getElementById('nameLog')
            let nombreMascotaLog = document.getElementById('petnameLog')
            let razaLog = document.getElementById('raceLog')
            let edadLog = document.getElementById('ageLog')
            let verLog = clientes.find((el) => el.dueño == nombreLog.value && el.nombre == nombreMascotaLog.value)
                // Verifica si existe una mascota con el nombre y dueño ingresado
                if (verLog == undefined) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Verifique sus datos e intente nuevamente',
                        showConfirmButton: true,
                      })
                }       
                // Verifica que los demas datos coincidan
                if (verLog.raza == razaLog.value && verLog.edad == edadLog.value) {
                    transicionUser.innerHTML = `
                    <div class="alert alert-success mt-5 text-center" role="alert">
                        Bienvenido
                    </div>
                    <div>  
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${nombreLog.value}</h5>
                                <p class="card-text">${razaLog.value} llamado/a ${nombreMascotaLog.value} de ${edadLog.value} años</p>
                            </div>
                        </div>
                    </div>`
                    // Si la mascota estuvo por lo menos 1 hora en la guarderia, se le informa al loguearse
                if (!(verLog.horas === 0 )) {
                   transicionUser.innerHTML += `
                        <div class="alert alert-secondary mt-5 text-center" role="alert">
                            Su mascota ha estado ${verLog.horas} horas, por lo que usted debe ${total(verLog.horas)} pesos
                        </div>
                        `}
                        // Muestra los otros clientes y el nombre de sus mascotas
                if (!(clientes.lenght === 0)) {
                        clientes.splice((clientes.indexOf(verLog)),1)
                        transicionUser.innerHTML += 
                         `<div>
                            <span class="h2 text-center d-block mt-5">otros clientes</span>
                        </div>
                        <div class="d-flex justify-content-around mt-3" id="displayClientes"></div>`
                        let displayClientes = document.getElementById('displayClientes')
                        clientes.forEach((cliente, indice) => {
                            displayClientes.innerHTML +=
                            `<div class="card d-flex  p-3" id="cliente${indice}" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${cliente.dueño}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">y su mascota ${cliente.nombre}</h6>
                                </div>
                            </div>
                          </div`
                        
                        });
                    }
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Verifique sus datos e intente nuevamente',
                        showConfirmButton: true,
                      })
                } 
            })
    
let registrarse = document.getElementById('register')
// Registro y posterior modificacion del HTML
        registrarse.addEventListener('submit', (e) => {
            e.preventDefault()
            let nombre = document.getElementById('name')
            let nombreMascota = document.getElementById('petname')
            let raza = document.getElementById('race')
            let edad = document.getElementById('age')  
            // Verifica que no este ninguna casilla en blanco
            if (nombre.value   == "" || nombreMascota.value  == "" || raza.value  == "" || edad.value  == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Ha habido un error con sus datos',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
            else { 
            // Crea un nuevo cliente en el localStorage donde se habian obtenido los demas clientes con fetch
                    let cliente = new Mascota(`${nombreMascota.value}`, `${edad.value}`, `${raza.value}`,0,`${nombre.value}`)
                    let filaReg= document.getElementById('filaReg')
                    clientes.push(cliente)
                    localStorage.setItem("clientes", JSON.stringify(clientes)) 
                    filaReg.innerHTML= ""
                    Swal.fire({
                        icon: 'success',
                        title: 'Felicitaciones',
                        text: 'Se ha registrado exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }  
        })
            
