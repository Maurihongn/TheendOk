function MostrarPerfilDifuntos(valor){
  var Presentacion_Perfil = $("#ApartadoPerfiles");
  var settings = {
    url: URLAPI + `Difuntos/GetAsync/${valor}`,
    method: "GET",
    timeout: 0,
    headers: {
      accept: "*/*",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    Presentacion_Perfil.empty();
    // for (let i = 0; i <= response.length; i++) {
      let Datos = response[0];
      if(Datos.principal == ""){
        Datos.principal.push({imagen : "img/imagen no disponible.jpg" })
      }
      Presentacion_Perfil.append(
        `
        <div class="container-fluid">
          <div class="row justify-content-around">
            <div class="col-12 col-md-12 col-xl-3">
              <div class="row aling-items-center justify-content-center mb-5">
                <img class="Perfil_Foto mb-3" title="Fotografia de ${Datos.nombre} ${Datos.apellido}" src="${Datos.principal[0].imagen}">
                <div id="MeGusta" class="d-flex aling-items-center justify-content-center">

                </div> 
              </div>  
            </div>    
            <div class="col-sm-12 col-md-5 col-xl-4">
              <div class="row aling-items-center justify-content-center">
                <h1 id="Perfil_Nombre">${Datos.nombre} ${Datos.apellido}</h1>
                <p>Fecha de Nacimiento  <b id="Nacimiento">${Datos.fechaNacimiento.slice(0,10)}</b></p>
                <p>Nacio en  <b id="Origen">${Datos.lugarNacimiento}</b></p>
                <p>Fecha de Fallecimiento  <b id="Fallecimiento">${Datos.fechaNacimiento.slice(0,10)}</b></p>
                <p>Fallecio en  <b id="Fallecio">${Datos.lugarFallecimiento}</b></p>
                <p>Su muerte fue   <b id="Padecimiento">${Datos.causaMuerte}</b></p>
              </div>
            </div>
            <div id="Información" class="col-sm-12 col-md-5 col-xl-4">
              <div class="row aling-items-center justify-content-center">
                <h2 >Información Parental</h2>
                <p>Hijo de <b id="Padre">${Datos.nombrePadres}</b></p>
                <p>Hijo de <b id="Madre">${Datos.nombrePadres}</b></p>
                <p>Casado con <b id="Conyuge">${Datos.nombreConyuge}</b></p>
                <p>Padre de <b id="Hijos"></b></p>
              </div>
            </div>
            
          </div>
          <div class="row justify-content-around">
            <div class="col-sm-12 col-md-5 col-xl-5 my-5">
              <h2 >Información Parental</h2>
              <p>Hijo de <b id="Padre">${Datos.nombrePadres}</b></p>
              <p>Hijo de <b id="Madre">${Datos.nombrePadres}</b></p>
              <p>Casado con <b id="Conyuge">${Datos.nombreConyuge}</b></p>
              <p>Padre de <b id="Hijos"></b></p>
            </div>
            
            <div class="col-sm-12 col-md-5 col-xl-5 my-5">
              <div class="row justify-content-around">
                <h2>Como Llegar</h2>
                <iframe src="${Datos.ubicacion}" width="500" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
          <div class="row justify-content-around">
            <div id="" class="container my-5" >
            <h1 class="display-3 text-center mb-5">Fotografias</h1>
            <div id="carouselExampleIndicatorsDifunto" class="carousel slide">
                    <div class="carousel-indicators" id="Carrousel_Perfil_IndicatorsDifunto">
                    </div>
                    <div class="carousel-inner" id="Carrousel_PerfilDifunto">
                      
                      
                      
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsDifunto" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsDifunto" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
              </div>
            </div>
          </div>
        </div>
    `
      );
  var Carrousel_Indicators = $("#Carrousel_Perfil_IndicatorsDifunto");
  var Carrousel = $("#Carrousel_PerfilDifunto");
      var Imagenes = [];
      for (let i = 0; i < Datos.principal.length; i++) {
        Imagenes.push(Datos.principal[i].imagen)
      }
      for (let i = 0; i < Datos.secundarias.length; i++) {
        Imagenes.push(Datos.secundarias[i].imagen)
      }
      for (let i = 0; i < Imagenes.length; i++) {
        let x = "active"
        if (i != 0) {
        x = "";}
        Carrousel.append(
          `
          <div class="carousel-item ${x}" data-bs-interval="500">
            <div class="row justify-content-center">
              <div class="col-12 mb-3">
                  <a onclick="" href="#">
                    <div class="card">
                      <img class="img-fluid foto-novedad h-50" src="${Imagenes[i]}" alt="Fotografia de ${Datos.nombre} ${Datos.apellido}">
                    </div>
                  </a>
              </div>
            </div>
          </div>
          `
        );
        Carrousel_Indicators.append(
        `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${x}" aria-current="true" aria-label="Slide ${i+1}"></button>
        `)
      }
    // }
  });

}