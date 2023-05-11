var BusquedaNav = document.getElementById("BuscarNav");
var BusquedaInicio = document.getElementById("BuscarInicio");
var Busqueda = document.getElementById("Buscar");
var TipoBusqueda;
var EstadoFavorito = "";

//MOSTRAR RECOMENDADOS AUTOMATICAMENTE
function Recomendar() {
  // var Recomendados = $("#ApartadoRecientes");
  // Recomendados.empty();
  // Recomendados.append(
  //   `
  //     <h1 class="text-center mt-5">RECIENTEMENTE</h1>
  //     <div id="RecomendarContenedor" class="owl-carousel Recientes owl-theme">
        
  //     </div>
  //   `
  //   );
  var Items_Recomendados = $("#RecomendarContenedor");
  Items_Recomendados.empty();
  var settings = {
    "url": URLAPI + "Entidades/MostrarLosUltimosCementerios",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  $.ajax(settings).done(function (response) {
    console.log("Recientes entidades con API GET FRONT" );
    console.log(response);
    Items_Recomendados.empty();
    for (let i = 0; i < response.length; i++) {
      let Datos = response[i];
      console.log(Datos);
      if(Datos.principal == ""){
        Datos.principal.push({imagen : "img/imagen no disponible.jpg" })
      }
      Items_Recomendados.append(
        `<div class="item p-2">
            <a href="Perfiles.html?ID=${Datos.id}" style="display:contents;" onclick="UrlID(${Datos.id})">
              <div class="card p-0">
                <img class="card-img-top ImgTarjeta img-fluid" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.fantasia}">
                <div class="card-body">
                <h4 class="card-title">${Datos.fantasia}</h4>
                <small class="card-title">(${Datos.razonSocial})</small> 
                </div>
              </div>
            </a>
        </div>`
      );
    }
    $('#RecomendarContenedor').owlCarousel({
      loop:true,
      items:2,
      autoplay: false,
      smartSpeed: 1500,
      margin:10,
      nav:true,
      dots:true,
      responsive:{
          0:{
              items:2
          },
          452:{
              items:2
          },
          766:{
              items:3
          },
          1000:{
              items:4
          }
      }
  })
  });

  
}
function UrlID(valor){
window.location = "/Perfiles.html?ID="+ valor
}


//MOSTRAR BUSQUEDAS DE CEMENTERIOS AUTOMATICAMENTE
function BusquedaCementerios() {
  LimpiarBuscadores()
  var Items_Buscados = $("#BusquedaContenedor");
  var settings = {
    "url": URLAPI + "Entidades/CargarTodosCementerios",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  $.ajax(settings).done(function (response) {
    console.log("Busqueda Cementerios con API CARGAR CEMENTERIOS" );
    console.log(response);
    Items_Buscados.empty();
    for (let i = 0; i < response.length; i++) {
      let Datos = response[i];
      console.log(Datos);
      if(Datos.principal.length === 0){
        Datos.principal.push({imagen : "img/imagen no disponible.jpg"})
      }
      Items_Buscados.append(
        `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
        <a href="Perfiles.html?ID=${Datos.id}" style="display:contents;" onclick="UrlID(${Datos.id})">
              <div class="card p-0">
                <img class="card-img-top ImgTarjeta img-fluid" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.fantasia}">
                <div class="card-body">
                <h4 class="card-title">${Datos.fantasia}</h4>
                <small class="card-title">(${Datos.razonSocial})</small> 
                </div>
              </div>
            </a>
      </div>
    `
      );
    }
  });
}



//MOSTRAR BUSQUEDAS DE DIFUNTOS AUTOMATICAMENTE
// function BusquedaDifuntos() {
//   LimpiarBuscadores()
//   var Items_Buscados = $("#BusquedaContenedor");
//   var settings = {
//     url: "https://teok.goodapps.com.ar/api/api/Difuntos/GetFront",
//     method: "GET",
//     timeout: 0,
//     headers: {
//       accept: "*/*",
//     },
//   };
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     Items_Buscados.empty();
//     for (let i = 0; i <= response.length; i++) {
//       let Datos = response[i];
//       if(Datos.principal == ""){
//         Datos.principal.push({imagen : "img/imagen no disponible.jpg" })
//       }
//       Items_Buscados.append(
//   `
//   <div class="col-6 col-md-4 col-lg-3 mb-3">
//   <a onclick="MostrarPerfilDifuntos(${Datos.id})" href="#">
//     <div class="card item_Buscado p-0">
//       <img class="img-fluid item_Imagen" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.nombre} ${Datos.apellido}">
//       <div class="card-body">
//         <h4 class="card-title">${Datos.nombre} ${Datos.apellido}</h4>
//         <p class="card-text">${Datos.fechaNacimiento.slice(0,10)} / ${Datos.fechaFallecimiento.slice(0, 10)}</p>
//         <small class="card-text d-none d-sm-block">${Datos.causaMuerte}</small>
//       </div>
//     </div>
//     </a>
//   </div>
//     `
//       );
//     }
//   });
// }


//MOSTRAR NOVEDADES AUTOMATICAMENTE
// function Novedades(){
//     var Lista_Novedades = $("#NovedadesContendor");
//       var settings = {
//     url: URLAPI +  "/Difuntos/GetFront",
//     method: "GET",
//     timeout: 0,
//     headers: {
//       accept: "*/*",
//     },
//   };
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     Lista_Novedades.empty();
//     for (let i = 0; i <= response.length; i++) {
//       let Datos = response;
//       let x = "active";
//       if (i != 0) {
//         x = "";
//       }
//       let z = i + 1;
//       let y = z + 1;
//       if(Datos[i].principal == ""){
//         Datos[i].principal.push({imagen : "img/imagen no disponible.jpg" })
//       }
//       if(Datos[z].principal == ""){
//         Datos[z].principal.push({imagen : "img/imagen no disponible.jpg" })
//       }
//       if(Datos[y].principal == ""){
//         Datos[y].principal.push({imagen : "img/imagen no disponible.jpg" })
//       }
//       Lista_Novedades.append(
//     `<div class="carousel-item ${x}" data-bs-interval="10000">
//       <div class="row justify-content-center">
//         <div class="col-md-4 mb-3">
//               <a onclick="MostrarPerfilDifuntos(${Datos[i].id})" href="#">
//               <div class="card">
//                 <img class="FotoNovedad" style=".img-fluid:hover{display:none}" src="${ Datos[i].principal[0].imagen}" alt="Fotografia de ${Datos[i].nombre} ${Datos[i].apellido}">
//                 <div class="card-body">
//                     <h4 class="card-title">${Datos[i].nombre} ${Datos[i].apellido}</h4>
//                     <p class="card-text">${Datos[i].fechaNacimiento.slice(0, 10)} / ${Datos[i].fechaFallecimiento.slice(0, 10)}</p>
//                 </div>
//               </div>
//             </a>
//         </div>
//         <div class="col-md-4 mb-3">
//         <a onclick="MostrarPerfilDifuntos(${Datos[z].id})" href="#">
//               <div class="card">
//                 <img class="FotoNovedad" src="${ Datos[z].principal[0].imagen}" alt="Fotografia de ${Datos[z].nombre} ${Datos[i].apellido}">
//                 <div class="card-body">
//                     <h4 class="card-title">${Datos[z].nombre} ${Datos[z].apellido}</h4>
//                     <p class="card-text">${Datos[z].fechaNacimiento.slice(0, 10)} / ${Datos[z].fechaFallecimiento.slice(0, 10)}</p>
//                 </div>
//               </div>
//             </a>
//         </div>
//         <div class="col-md-4 mb-3">
//         <a onclick="MostrarPerfilDifuntos(${Datos[z].id})" href="#">
//               <div class="card">
//                 <img class="FotoNovedad" src="${ Datos[y].principal[0].imagen}" alt="Fotografia de ${Datos[y].nombre} ${Datos[i].apellido}">
//                 <div class="card-body">
//                     <h4 class="card-title">${Datos[y].nombre} ${Datos[y].apellido}</h4>
//                     <p class="card-text">${Datos[y].fechaNacimiento.slice(0, 10)} / ${Datos[y].fechaFallecimiento.slice(0, 10)}</p>
//                 </div>
//               </div>
//             </a>
//           </div>
//       </div>
//     </div>`
//       );
//     i++}})
// }



//MOSTRAR BUSQUEDAS DE PERFILES AUTOMATICAMENTE
// function MostrarPerfilDifuntos(valor){
//   SeccionPerfil();
//   var Presentacion_Perfil = $("#ApartadoPerfiles");
//   var settings = {
//     url: `https://teok.goodapps.com.ar/api/api/Difuntos/GetFront/${valor}`,
//     method: "GET",
//     timeout: 0,
//     headers: {
//       accept: "*/*",
//     },
//   };
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     Presentacion_Perfil.empty();
//     // for (let i = 0; i <= response.length; i++) {
//       let Datos = response[0];
//       if(Datos.principal == ""){
//         Datos.principal.push({imagen : "img/imagen no disponible.jpg" })
//       }
//       Presentacion_Perfil.append(
//         `
//         <div class="container-fluid">
//           <div class="row justify-content-around">
//             <div class="col-12 col-md-12 col-xl-3">
//               <div class="row aling-items-center justify-content-center mb-5">
//                 <img class="Perfil_Foto mb-3" title="Fotografia de ${Datos.nombre} ${Datos.apellido}" src="${Datos.principal[0].imagen}">
//                 <div id="MeGusta" class="d-flex aling-items-center justify-content-center">

//                 </div> 
//               </div>  
//             </div>    
//             <div class="col-sm-12 col-md-5 col-xl-4">
//               <div class="row aling-items-center justify-content-center">
//                 <h1 id="Perfil_Nombre">${Datos.nombre} ${Datos.apellido}</h1>
//                 <p>Fecha de Nacimiento  <b id="Nacimiento">${Datos.fechaNacimiento.slice(0,10)}</b></p>
//                 <p>Nacio en  <b id="Origen">${Datos.lugarNacimiento}</b></p>
//                 <p>Fecha de Fallecimiento  <b id="Fallecimiento">${Datos.fechaFallecimiento.slice(0,10)}</b></p>
//                 <p>Fallecio en  <b id="Fallecio">${Datos.lugarFallecimiento}</b></p>
//                 <p>Su muerte fue   <b id="Padecimiento">${Datos.causaMuerte}</b></p>
//               </div>
//             </div>
//             <div id="Información" class="col-sm-12 col-md-5 col-xl-4">
//               <div class="row aling-items-center justify-content-center">
//                 <h2 >Información Parental</h2>
//                 <p>Hijo de <b id="Padre">${Datos.nombrePadres}</b></p>
//                 <p>Casado con <b id="Conyuge">${Datos.nombreConyuge}</b></p>
//                 <p>Padre de <b id="Hijos"></b></p>
//               </div>
//             </div>
            
//           </div>
//           <div class="row justify-content-around">
//             <div class="col-sm-12 col-md-5 col-xl-5 my-5">
//               <h2 >Información</h2>
//               <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam quasi error non. In consectetur corporis iusto unde impedit cum, nam rem, sapiente odit, autem non veritatis eligendi nobis perspiciatis officia illo quidem odio deleniti! Consectetur rem laborum autem amet placeat inventore neque asperiores facere laudantium, cum deleniti nesciunt, officiis quis!</p>
              
//             </div>
            
//             <div class="col-sm-12 col-md-5 col-xl-5 my-5">
//               <div class="row justify-content-around">
//                 <h2>Como Llegar</h2>
//                 <iframe src="${Datos.ubicacion}" width="500" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//               </div>
//             </div>
//           </div>
//           <div class="row justify-content-around">
//             <div id="" class="container my-5" >
//             <h1 class="display-3 text-center mb-5">Fotografias</h1>
//             <div id="carouselExampleIndicatorsDifunto" class="carousel slide">
//                     <div class="carousel-indicators" id="Carrousel_Perfil_IndicatorsDifunto">
//                     </div>
//                     <div class="carousel-inner" id="Carrousel_PerfilDifunto">
                      
                      
                      
//                     </div>
//                     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsDifunto" data-bs-slide="prev">
//                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                       <span class="visually-hidden">Previous</span>
//                     </button>
//                     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsDifunto" data-bs-slide="next">
//                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                       <span class="visually-hidden">Next</span>
//                     </button>
//               </div>
//             </div>
//           </div>
//         </div>
//     `
//       );
//   var Carrousel_Indicators = $("#Carrousel_Perfil_IndicatorsDifunto");
//   var Carrousel = $("#Carrousel_PerfilDifunto");
//       var Imagenes = [];
//       for (let i = 0; i < Datos.principal.length; i++) {
//         Imagenes.push(Datos.principal[i].imagen)
//       }
//       for (let i = 0; i < Datos.secundarias.length; i++) {
//         Imagenes.push(Datos.secundarias[i].imagen)
//       }
//       for (let i = 0; i < Imagenes.length; i++) {
//         let x = "active"
//         if (i != 0) {
//         x = "";}
//         Carrousel.append(
//           `
//           <div class="carousel-item ${x}" data-bs-interval="500">
//             <div class="row justify-content-center">
//               <div class="col-12 mb-3">
//                   <a onclick="" href="#">
//                     <div class="card">
//                       <img class="CarruselPerfil" src="${Imagenes[i]}" alt="Fotografia de ${Datos.nombre} ${Datos.apellido}">
//                     </div>
//                   </a>
//               </div>
//             </div>
//           </div>
//           `
//         );
//         Carrousel_Indicators.append(
//         `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${x}" aria-current="true" aria-label="Slide ${i+1}"></button>
//         `)
//       }
//     // }
//   });
//   setTimeout(function () {
//     BuscarFavorito(valor,'Difunto');
//   }, 200);
// }



//MOSTRAR BUSQUEDAS DE PERFILES AUTOMATICAMENTE
function MostrarPerfilCementerios(parametro){
  var Presentacion_Perfil = $("#ApartadoPerfiles");
  var settings = {
    url: URLAPI + `Entidades/GetPerfil/${parametro}`,
    method: "GET",
    timeout: 0,
    headers: {
      accept: "*/*",
    },
  };
  var Latitud;
  var Longitud;
  $.ajax(settings).done(function (response) {
    console.log(response);
    Presentacion_Perfil.empty();
      let Datos = response[0];
      if(Datos.principal == ""){
        Datos.principal.push({imagen : "img/imagen no disponible.jpg" })
      }
      Presentacion_Perfil.append(
      `
      <div class="container-fluid px-5">
        <div class="d-flex aling-items-center justify-content-between">
          <h1>${Datos.fantasia}</h1>
          <div id="MeGusta" class="d-flex  justify-content-center align-items-center">

          </div> 
        </div> 

      
      <div class="row justify-content-between">
          <p class="col-lg-9 col-sm-12">${Datos.localidad}, ${Datos.provincia}, ${Datos.pais}</p>
          <p class="col-lg-3 col-sm-12 text-lg-end">Desde ${Datos.fechaFundacion.slice(0,10).split('-').reverse().join('-')}</p>
      </div>

        <div id="FotosPerfil" class="owl-carousel PerfilCarousel owl-theme" >
              
        </div>



      
      <div class="mt-2">
          <h2><b>${Datos.categoria} ${Datos.tipo}</b> propiedad de <a href="">${Datos.razonSocial}</a> </h2>
          <p>
              <small>${Datos.cantidadTumbas} parcelas</small> - 
              <small>${Datos.tamaño} km2</small> -
              <small>Estacionamiento gratuito</small> -
              <small>Capilla</small>
          </p>
          <hr>
          <br>
          <h3>Informacion</h3>
          <p>${Datos.informacionGeneral}</p>
          <h4>Horarios</h4>
          <p>${Datos.horarios}</p>
          <br>

          <div class="container my-5" >
              <img src="img/6091359308f81__838x390.jpg" width="100%" height="250px" alt="">
          </div>

          <br>
          <h4>Como llegar</h4>
          <div class="row justify-content-around">   
              <div class="col-9 col-lg-9">
                  <div id="map"  style="height: 100% ; width: 100%;">
                  </div>
              </div>
              <div class="col-12 col-lg-3">
                  <h5 class="text-uppercase">PAIS</h5>
                  <p>${Datos.pais}</p>
                  <h5 class="text-uppercase mt-4">Codigo Postal</h5>
                  <p>${Datos.provincia}</p>
                  <h5 class="text-uppercase mt-4">Ciudad</h5>
                  <p>${Datos.localidad}</p>
                  <h5 class="text-uppercase mt-4">Dirrecion</h5>
                  <p>${Datos.direccion}</p>
                  <h5 class="text-uppercase mt-4">Latitud</h5>
                  <p>${Datos.lat}</p>
                  <h5 class="text-uppercase mt-4">Longitud</h5>
                  <p>${Datos.long}</p>
              </div>
          </div>
          <hr>
          <h4><img class="mb-1" height="15px" src="svg/favorito activo.svg" frameborder="0"></img> 4,86 | 200 Evaluaciones</h4>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <hr>
          <div>
              <h4>Comentarios</h4>
              <div id="ComentariosContenedor" class="row justify-content-start">
                
              </div>
          </div>
      </div>
  </div>

      `
      )
      setTimeout(function () {
      var owlCarouselPerfil = $("#FotosPerfil");
      owlCarouselPerfil.empty()
      var Imagenes = [];
      for (let i = 0; i < Datos.principal.length; i++) {
        Imagenes.push(Datos.principal[i].imagen)
      }
      for (let i = 0; i < Datos.secundarias.length; i++) {
        Imagenes.push(Datos.secundarias[i].imagen)
      }
      for (let i = 0; i < Imagenes.length; i++) {
        console.log(Imagenes[i])

        owlCarouselPerfil.append(
          `
          <div class="item" class="position-relative">
                  <a href="#" onclick="">
                      <img class="card-img-top ImagenPerfil img-fluid" src="${Imagenes[i]}" alt="Fotografia de ${Datos.fantasia}">
                      <a class="btn position-absolute MasFotos text-light" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-images" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                          </svg><small class="d-none d-md-block">Mostrar todas</small>
                      </a>
                  </a>
              </div>
          `)
        ;}
        $('#FotosPerfil').owlCarousel({
          loop:true,
          items:1,
          autoplay: false,
          smartSpeed: 1500,
          margin:10,
          nav:true,
          dots:true,
        })
        TraerComentarios(Datos.id)
        }, 500);
        Latitud = Datos.lat;
        Longitud = Datos.long;
        
    });
  setTimeout(function () {
    initMap(Latitud, Longitud)
    BuscarFavorito(parametro,'Cementerio');
  }, 500);
  
}



//IGUALACION DE IMP DE BUSQUEDAS
function IgualarBuscarNav(){
  if (BusquedaNav.value != Busqueda.value && BusquedaNav.value != BusquedaInicio.value) {
    Busqueda.value = BusquedaNav.value; 
    BusquedaInicio.value = BusquedaNav.value; 
    RealizarBusqueda(BusquedaNav.value);
    SeccionBuscar();
  }
  
  }
function IgualarBuscar() {
  if (BusquedaNav.value != Busqueda.value && BusquedaInicio.value != Busqueda.value) {
    BusquedaNav.value = Busqueda.value;
    BusquedaInicio.value = Busqueda.value;
    RealizarBusqueda(Busqueda.value);
    SeccionBuscar();
  }
  
}
// function IgualarBuscarInicio() {
//   if (BusquedaNav.value != BusquedaInicio.value && BusquedaNav.value != BusquedaInicio.value){
//     BusquedaNav.value = BusquedaInicio.value;
//     Busqueda.value = BusquedaInicio.value; 
//     RealizarBusqueda(BusquedaInicio.value);
//     SeccionBuscar();
//   }
// }



//BUSCAR 
function RealizarBusqueda(valor){
  var Items_Buscados = $("#BusquedaContenedor");
  console.log("BUSCANDO")
  var settings = {
  "url": URLAPI + "Busquedas/GetFrontCementerios",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "accept": "*/*",
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    "busqueda": valor
  }),
};

$.ajax(settings).done(function (response) {
  console.log(response);
  Items_Buscados.empty(); 
    
    for (var i = 0; i < response.length; i++) {
      // for (var y = 0; y < response[i].length; y++) {
      var Datos = response[i];
      if(i == 0){
        if(Datos.principal == ""){
          Datos.principal.push({imagen : "img/imagen no disponible.jpg"})
        }
        console.log(`Esta imprimiendo cementerio`)
        Items_Buscados.append(
          `
          <div class="col-6 col-md-4 col-lg-3 mb-3">
          <a href="Perfiles.html?ID=${Datos.id}" style="display:contents;" onclick="UrlID(${Datos.id})">
              <div class="card p-0">
                <img class="card-img-top ImgTarjeta img-fluid" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.fantasia}">
                <div class="card-body">
                <h4 class="card-title">${Datos.fantasia}</h4>
                <small class="card-title">(${Datos.razonSocial})</small> 
                </div>
              </div>
            </a>
          </div>
          `
          )
        } 
        // else if(i != 0){
        //   console.log(`Esta imprimiendo difunto`)
        //   if(Datos.principal == ""){
        //     Datos.principal.push({imagen : "img/imagen no disponible.jpg"})
        //   }
        //   Items_Buscados.append(

        //     `
        //     <div class="col-6 col-md-4 col-lg-3 mb-3">
        //     <a onclick="MostrarPerfilDifuntos(${Datos.id})" href="#">
        //       <div class="card item_Buscado p-0">
        //         <img class="img-fluid item_Imagen" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.nombre} ${Datos.apellido}">
        //         <div class="card-body">
        //           <h4 class="card-title">${Datos.nombre} ${Datos.apellido}</h4>
        //           <p class="card-text">${Datos.fechaNacimiento.slice(0,10)} / ${Datos.fechaFallecimiento.slice(0, 10)}</p>
        //           <small class="card-text">${Datos.causaMuerte}</small>
        //         </div>
        //       </div>
        //       </a>
        //     </div>
        //       `
        //   );
        // } 
        else if(response == []){
          Items_Buscados.append(
          `
          <h3 class="text-center" style="margin-top: 250px;margin-bottom: 50px ;">¡Ups a ocurrido un error! </h3>
          <p class="text-center" style="margin-bottom: 20px ;">Recomendamos recargar la pagina </p>
          <p class="text-center" style="margin-bottom: 250px ;"><small>Apartado perfiles</small></p>
          `
          )
        }
        
      }
    // }
  });
}



function LimpiarBuscadores() {
    Busqueda.value = ""
    BusquedaNav.value = ""  
}



function BuscarFavorito(valor, parametro){
  var div_MeGusta = $("#MeGusta"); // Selecciona el div que contendrá el SVG
  div_MeGusta.empty()
  div_MeGusta.append(`<a onclick="Limitacion('Megusta')" id="MeGusta" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg></a>`);
  var DatosToken = GetInformationToken();
  var settings = {
    "url":  URLAPI + "Favoritos/GetFavoritos/" + DatosToken.userId,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    div_MeGusta.empty()
    div_MeGusta.append(`<a onclick="CambioFavoritos(0,${valor},'${parametro}')" id="MeGusta" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg></a>`);
    for (let i = 0; i < response.length; i++) {
      for (let z = 0; z < response.length; z++) {
      var DatosResponse = response[i][z];
      console.log("Buscando Favoritos " + DatosResponse.fantasia)
      if(DatosResponse.idEntidad == valor && DatosResponse.favorito == true){
          if(parametro == "Cementerio"){

          console.log("Existe un me gusta a esta publicacion de Cementerio")
          div_MeGusta.empty()
          div_MeGusta.append(`<a onclick="CambioFavoritos(${DatosResponse.id},${valor},'${parametro}')" id="MeGusta" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg></a>`);
          break
        }
      } else if (DatosResponse.idEntidad == valor && DatosResponse.favorito == false){

      }
      // else if (parametro == "Difunto"){
      //   if(DatosResponse.idDifuntos == valor && DatosResponse.favorito == true){
      //     console.log("Existe un me gusta a esta publicacion de Difunto")
      //     Resultado = "Existe"
      //     div_MeGusta.empty()
      //     div_MeGusta.append(`<a onclick="CambioFavoritos(${DatosResponse.id},${valor},'${parametro}')" id="MeGusta" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg></a>`);
      //     break
      //   }
      // } 
    }}
  });
}



function CambioFavoritos(dato,valor, parametro){
  var DatosToken = GetInformationToken();
  var Estado;
  var CementerioId = 0 ;
  var DifuntoId = 0 ;
  var FavoritoId = 0
  if(dato == 0){
    Estado = true;
  } else {
    FavoritoId = dato;
    Estado = false;
  }
  if(parametro == "Cementerio"){
    CementerioId = valor
  } 
  console.log(`FavoritoId es ${FavoritoId}, CementerioId es ${CementerioId}, Estado es ${Estado}`)
  // else if (parametro == "Difunto"){
  //   DifuntoId = valor
  // }
  var Data =  JSON.stringify({
    "id": FavoritoId,
    "idUsuario": DatosToken.userId,
    "idEntidad": CementerioId,
    "idDifunto": DifuntoId,
    "favorito1": Estado
  })
  console.log(Data)
  var settings = {
    "url": URLAPI + "Favoritos/AddOrUpdate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "*/*",
      "Content-Type": "application/json"
    },
    "data": Data
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log("DASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFDDASFDSAFDSAFSDFDASFD")
  });

  setTimeout(function () {
    BuscarFavorito(valor, parametro)
  }, 300);
}



function Guardados() {
  var Items_Guardados = $("#GuardadosContenedor");
  var DatosToken = GetInformationToken();
  var settings = {
    url:  URLAPI + "Favoritos/GetFavoritos/"+ DatosToken.userId,
    method: "GET",
    timeout: 0,
    headers: {
      accept: "*/*",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    Items_Guardados.empty();
    for (let i = 0; i < response.length; i++) {
      console.log(`Estoy por favoritos en i : ${i}`)
      for (let z = 0; z < response[i].length; z++) {

      var Datos = response[i][z];
      console.log(Datos);
      if(Datos.principal == ""){
        Datos.principal.push({imagen : "img/imagen no disponible.jpg"})
      }
      if(Datos.favorito == true){
        if(Datos.idEntidad != 0){
          console.log("Entro a la impresion de cementerio")
          Items_Guardados.append(
            `

      <div class="col-6 col-md-4 col-lg-3 mb-3">
        <a href="Perfiles.html?ID=${Datos.idEntidad}" style="display:contents;" onclick="UrlID(${Datos.idEntidad})">
              <div class="card p-0">
              <div style="position: relative;">
              <img class="img-fluid ImgTarjeta" src="${Datos.principal[0].imagen}" alt="Fotografia de ${Datos.fantasia}">
                <svg style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#6969697e" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
            </div>
                <div class="card-body">
                <h4 class="card-title">${Datos.fantasia}</h4>
                <small class="card-title">(${Datos.razonSocial})</small> 
                </div>
              </div>
            </a>
          </div>

        `
          )// onclick="CambioFavoritos(${Datos.id},${Datos.idEntidad},'Cementerio')
        } 
        
      }
    }
  }
  });
  Guardados()

}


function initMap(valor, parametro) {
  console.log("imprimiendo mapa")

  let Latitud = parseFloat(valor);
  let Longitud = parseFloat(parametro);
  console.log(`${Latitud} y ${Longitud}`)

  var mapOptions = {
      center: { lat: Latitud, lng: Longitud },
      zoom: 12
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: { lat: Latitud, lng: Longitud },
      map: map,
      title: 'Ubicación'
    });
}



function CrearComentarios(valor){
  var DatosToken = GetInformationToken();
  var Comentario = document.getElementById("TextComentario")
  var settings = {
    "url":  URLAPI + "Comentarios/AddOrUpate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "*/*",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "id": 0,
      "idEntidad": valor,
      "idDifunto": 0,
      "idUsaurio": DatosToken.userId,
      "comentario1": Comentario.value,
      "idEstado": 23
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    Comentario.textContent = ""
    TraerComentarios(valor)
  });
}



function TraerComentarios(valor){
  var Comentarios = $("#ComentariosContenedor");
  Comentarios.empty()
  Comentarios.append(
    `
    <div class="col-12 mt-3">
      <div class="row align-items-end">
        <textarea name="qsy" id="TextComentario" cols="50" rows="6" class="w-100 col-12"></textarea>
        <button class="btn bg-colorsecondary w-100 col-12 mt-2" onclick="CrearComentarios(${valor})">Agregar Comentario</button>
      </div>
    </div>
    `
  )
  var settings = {
    "url":  URLAPI + `Comentarios/ComentarioEntidad?Id=${valor}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    for(i = 0; i < response.length;i++){
      var Datos = response[i];
      if(i % 2 == 0){
        Comentarios.append(
          `
          <div class="col-12 col-md-6 mt-3 ">
            <div class="d-flex align-items-end">
              <img src="svg/perfil.svg" height="35px" width="35px" alt="" class="mx-1">
              <div class="d-flex w-100 justify-content-between">
                <h6>${Datos.usaurio}</h6><small>12/04/2023</small>
              </div>
            </div>
            <p>${Datos.comentario1}</p>
          </div>
          `
        )
      } 
      // else{
      //   Comentarios.append(
      //     `
      //     <div class="col-12 col-md-6 mt-3">
      //       <div class="d-flex align-items-end">
      //         <img src="svg/perfil.svg" height="35px" width="35px" alt="" class="mx-1">
      //         <div class="d-flex w-100 justify-content-between">
      //           <h6>${Datos.idUsaurio}</h6><small>12/04/2023</small>
      //         </div>
      //       </div>
      //       <p>${Datos.comentario1}</p>
      //     </div>
      //     `
      //   )
      // }
      
    }
  });
}



