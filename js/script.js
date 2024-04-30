/*
  ***********************************************************************************
  ************************* PRE ENTREGA 2 LUCAS STACHURSKY **************************
  ***********************************************************************************
*/


//VARIABLE PARA ALMACENAR EL DESCUENTO
let descuentoGlobal = 0;

//DECLARACION DE FUNCIONES

//FUNCION MOSTRAR CARRITOS
function mostrarCarrito() {
    
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } 
    else {

        //FIND PARA MOSTRAR EN EL CARRITO EL NOMBRE DEL PLAN QUE HAYA SELECCIONADO
        
        let mensaje = "Productos en el carrito:\n";

        carrito.forEach((producto, i) => {
            mensaje += `${i + 1}. Plan ${producto.plan} - ${producto.cantidadDeMeses} mes/es\n`;
        });
            
        alert(mensaje);

    }
}

//FUNCION ELIMINAR PRODUCTO
function eliminarProducto() {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");

    } else {

        mostrarCarrito();

        let indiceEliminar = prompt("Ingrese el número del producto que desea eliminar:");

        indiceEliminar = parseInt(indiceEliminar);

        if (!isNaN(indiceEliminar) && indiceEliminar >= 1 && indiceEliminar <= carrito.length) {

            carrito.splice(indiceEliminar - 1, 1); 
            alert("Producto eliminado del carrito correctamente.");
        } 
        else {
            alert("Ingrese un número válido.");
        }
    }
}

//FUNCION ALMACENAR CARRITOS
function almacenarCarritos() {

    while (seleccion.toLowerCase() === "no") {

        mostrarCarrito(); 
        
        let deseaEliminar = prompt("¿Desea eliminar algún producto del carrito? (si/no)");

        if (deseaEliminar.toLowerCase() === "si" ) {

            eliminarProducto();
        } 

        break;
    }
}

//FUNCION GENERAR DESCUENTO
function preguntaDescuento() {
    
    let preguntaDescuento;

    while (true) {

        preguntaDescuento = prompt("¿Desea generar un descuento?");

        if (preguntaDescuento.toLowerCase() === "si") {

            descuento = generarDescuento();

            alert(`El descuento es: DESC${Math.round(descuento)}`);

            carritoFinalConDescuento(descuento);

            return true;
        } 
        else if (preguntaDescuento.toLowerCase() === "no") {

            descuentoGlobal = 0;

            carritoFinalSinDescuento();

            return false;
        } 
        else {
            alert("Por favor responda si o no");
        }
    }
}

//FUNCION CARRITO SIN DESCUENTO
function carritoFinalSinDescuento() {

    carrito.forEach((carritoFinal) => 
    {
        alert(`Plan: ${carritoFinal.plan} | Cantidad de meses: ${carritoFinal.cantidadDeMeses} | Precio total sin descuento: ${carritoFinal.cantidadDeMeses * carritoFinal.precio}$`);
    })
}

//FUNCION CARRITO CON DESCUENTO
function carritoFinalConDescuento() {

    carrito.forEach((carritoFinal) => {

        //CALCULAMOS EL PRECIO SIN DESCUENTO
        const precioSinDescuento = carritoFinal.cantidadDeMeses * carritoFinal.precio;

        //DECLARAMOS EL DESCUENTO
        const descuento = precioSinDescuento * .25;

        //CALCULAMOS EL PRECIO CON DESCUENTO RESTANDO EL PRECIO SIN DESCUENTO MENOS EL DESCUENTO
        const precioConDescuento = precioSinDescuento - descuento;

        alert(`Plan: ${carritoFinal.plan} | Cantidad de meses: ${carritoFinal.cantidadDeMeses} | Precio total con el descuento es: ${precioConDescuento}$`);
    })
}

//FUNCION PARA EL TOTAL DE LA COMPRA CON DESCUENTO
function totalCompraConDescuento() {

    const descuentoTotal = carrito.reduce((totalDescuento, producto) => {

        const descuentoProducto = (producto.precio * producto.cantidadDeMeses) * 0.25;

        return totalDescuento + descuentoProducto;

    }, 0);

    const totalSinDescuento = carrito.reduce((acc, el) => acc + (el.precio * el.cantidadDeMeses), 0);
    
    const totalConDescuento = totalSinDescuento - descuentoTotal;

    return totalConDescuento;
}

//FUNCION PARA EL TOTAL DE LA COMPRA SIN DESCUENTO
function totalCompraSinDescuento() {
    return carrito.reduce((acc, el) => acc + (el.precio * el.cantidadDeMeses), 0);
}

//FUNCION PARA CODIGO DE DESCUENTO ALEATORIO
function generarDescuento () {

    //Creamos un codigo de descuento entre 0 y 1000
    let codigoDeDescuento = Math.floor(Math.random() * 100000);
    return codigoDeDescuento;
}

//FUNCION PARA QUE MIENTRAS QUE LA RESPUESTA SEA DISTINTA DE SI O NO SE SIGA EJECUTANDO EL PROGRAMA
function validarRespuesta(comprar) {

    while ((seleccion.toLowerCase() !== "si") && (seleccion.toLowerCase() !== "no")) {
    
        alert("Por favor responda si o no");
    
        seleccion = prompt(`¿Desea comprar algun ${comprar}, Si o no?`);
    }
}

//DECLARAMOS LOS PLANES DENTRO DE UN ARRAY 
const planes = [

    //PLan premium
    {
        id: "Plan Premium",
        titulo: "Premium",
        precio: 1000, 
        caracteristicas: {
            duracion: "1 mes",
            rendimiento: "Avanzado",
            dominio: "Estandar",
            servicio: "Lento",
            GB: "50GB", 
            comisiones: "25%",
        }
    },

    //Plan business 
    {
        id: "Plan Business",
        titulo: "Business",
        precio: 2000, 
        caracteristicas: {
            duracion: "1 mes",
            rendimiento: "Veloz",
            dominio: ".com",
            servicio: "Rapido",
            GB: "100GB",
            comisiones: "0%",
        }
    },

    //Plan Deluxe
    {
        id: "Plan Deluxe",
        titulo: "Deluxe",
        precio: 3500, 
        caracteristicas: {
            duracion: "1 mes",
            rendimiento: "Superveloz",
            dominio: ".com",
            servicio: "Luz",
            GB: "Ilimitados",
            comisiones: "0%",
        }
    }
];

//CREAMOS UN ARRAY VACIO PARA ALMACENAR LOS PLANES
let carrito = [];

let seleccion = prompt("¿Desea comprar algun plan, Si o no?");

//VALIDACION DE RESPUESTA
validarRespuesta("plan");

//SI LA RESPUESTA ES si O Si SE MUESTRA EL MENU DE PLANES
if (seleccion.toLowerCase() === "si") {

    alert(`A continuación te mostraremos nuestros planes disponibles`);

    //USAMOS EL METODO MAP PARA RECORRER EL ARRAY PLANES
    let incrementador = 1;

    let todosLosPlanes = planes.map((planes) => `${incrementador++}. ${planes.id}: ${planes.precio}$`)

    let caracteristicas = [];

    let mostrarCaracteristicas = planes.forEach((planes) => {
        let caracteristicasDelPlan = `Características del ${planes.id}: `;
        for (let key in planes.caracteristicas) {
            caracteristicasDelPlan += `${key}: ${planes.caracteristicas[key]}, `;
        }
        
        caracteristicasDelPlan = caracteristicasDelPlan.slice(0, -2);
        caracteristicas.push(caracteristicasDelPlan);
    });

    //USAMOS EL METODO JOIN PARA SEPARAR LOS DISTINTOS PLANES

    alert(todosLosPlanes.join(` \n \n `));
    alert(caracteristicas.join(` \n  \n `));
} 
else if (seleccion.toLowerCase() === "no") {

    //SI LA RESPUESTA ES no O No SE MUESTRA UN MENSAJE DE GRACIAS Y SE CIERRA EL PROGRAMA

    alert("Gracias por visitarnos, hasta pronto!");
}

//LE DAMOS A ELEGIR AL USUARIO QUE PRODUCTO QUIERE UNA VEZ SE HAYA RESPONDIDO QUE SI

while (seleccion.toLowerCase() !== "no") {

    let plan = prompt("¿Cual de nuestros planes deseas contratar? (premium, business o deluxe)");

    //DECLARAMOS UNA VARIABLE VACIA PARA ALMACENAR EL PRECIO DEL PLAN

    let precio = 0; 

    //BUCLE PARA VALIDAR RESPUESTA
    while (plan.toLowerCase() !== "premium" && plan.toLowerCase() !== "business" && plan.toLowerCase() !== "deluxe") {

        alert("Por favor, ingresa un plan válido");

        plan = prompt("¿Cuál de nuestros planes deseas contratar? (premium, business o deluxe)");

    }
    
    //HACEMOS UN CONDICIONAL PARA VALIDAR SI EL PLAN ES PREMIUM, BUSINESS O DELUXE
    if (plan.toLowerCase() === "premium" || plan.toLowerCase() === "business" || plan.toLowerCase() === "deluxe") 
    {
        
        //CREAMOS UN SWITCH PARA CADA ELECCION DISTINTA

        switch (plan) { 

            case "premium":
                precio = 1000;
                break;

            case "business":
                precio = 2000;
                break;

            case "deluxe":
                precio = 3500;
                break;
                
            default: 
                alert("No tenemos ese plan");    
                break;
        }

        let cantidadDeMeses;

        do {
            let mesesASeleccionar = prompt("¿Cuántos meses de tu plan seleccionado quieres contratar?");
            cantidadDeMeses = parseInt(mesesASeleccionar);
        
            if (isNaN(cantidadDeMeses) || cantidadDeMeses < 1) {
                alert("Por favor, ingresa un número válido para la cantidad de meses.");
            }
        } while (isNaN(cantidadDeMeses));

        //ALMACENAMOS EL PLAN ELEGIDO DENTRO DEL CARRITO CON EL METODO PUSH

        carrito.push({plan, precio,cantidadDeMeses});
    }

    else 
    {
        alert("No tenemos ese plan");
    }

    while (true) {

        seleccion = prompt("Desea seguir comprando? (Si o No)").toLowerCase();
        
        if (seleccion.toLowerCase() === "si" || seleccion.toLowerCase() === "no") {
            break;

        } 
        
        else {
            alert("Por favor, ingrese si o no.");
        }
    }
    
    //SI DICE QUE NO MUESTRA EL TOTAL COMPRADO DEPENDIENDO SI ELIGIO UN DESCUENTO O NO

    almacenarCarritos();
}

// MUESTRA EL TOTAL DE LA COMPRA
const usuarioEligioDescuento = preguntaDescuento();

let totalCompra;

if (usuarioEligioDescuento === true) {

    totalCompra = totalCompraConDescuento();

} else {

    totalCompra = totalCompraSinDescuento();
}

alert(`El total de la compra es: ${totalCompra}$`);

//FIN DE PROGRAMA
