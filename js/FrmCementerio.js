// TEXT BOXES
let TxtRazonSocial = document.getElementById("txt_RazonSocial");
let TxtFantasia = document.getElementById("txt_Fantasia");
let TxtHorarios = document.getElementById("txt_Horarios");
let TxtInformacion = document.getElementById("txt_InformacionGeneral");
let TxtPais = document.getElementById('country');
let TxtProvincia = document.getElementById('province');
let TxtLocalidad = document.getElementById('locality');
let Lat = document.getElementById("txtGeoLatitud").value
let Long = document.getElementById("txtGeoLongitud").value 
let TxtDireccion = document.getElementById("Direccion")
// OTROS BOXES
let DtoFundacion = document.getElementById("dto_Fundaciom");
let InpImagen = document.getElementById("inp_Imagen");
let input = document.getElementById('txtDireccion');
// COMBO BOXES
let CboEntidadTipo = document.getElementById("cbo_EntidadTipo");
let CboCategoria = 2
// DETALLE CEMENTERIO
let TxtTamaño = document.getElementById("txt_Tamaño");
let TxtTumbas = document.getElementById("txt_CantidadTumbas");
let CboUnidadMedida = document.getElementById("cbo_UnidadMedida");
// GRILLAS Y BOTONES
let ValorCategoria = 2
let IdDetalleParaModificar = 0
let IdEntidadParaModificar = 0

let FechaPublicacion;
let FechaUltimaEntrada;
let IdPais;
let IdProvincia;
let IdLocalidad;
// -----------------------------------------------------------------------------
// ---------------------------------Funciones-----------------------------------

function CargarUnidad() {
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/UnidadesMedidas/GetAll",
    method: "GET",
    timeout: 0,
  };
  let context = "";
  $.ajax(settings).done(function (response) {
    console.log(response);

    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${Datos.id}">${Datos.tipoUnidad}</option>
                `;
      CboUnidadMedida.innerHTML = context;
    }
  });
}

function CargarEntidadTipo(){
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/EntidadesTipos/GetFront/"+ 2,
    method: "GET",
    timeout: 0,
  };
  
  $.ajax(settings).done(function (response) {
    let context = "";
    
    console.log(response);

    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${response[i].id}">${response[i].tipo}</option>
                `;
      CboEntidadTipo.innerHTML = context;
    }   
  });

}


function CargarImagenes(){
  let Imagenes = document.getElementById("inp_Imagen")
  console.log("ESTA EN EL CARGAR IMAGEN")
  console.log(Imagenes.value)

  
  console.log(Imagenes.files);
      let files = Imagenes.files;
      let element;
      
      

      for (var i = 0; i < Imagenes.files.length; i++) {
        element = Imagenes.files[i];
        let visor = new FileReader();
        for (var j = 0; j < Imagenes.files.length; j++) {

          visor.onload = function (j) {
            let img = $(
              
              '<div class="image-container col-2">'
            +' <div class="image-wrapper">'
            +`<img src=" ${j.target.result}" alt="Foto del usuario" class="ImagenArchivo" id="Images" alt="Foto del usuario" width="200px" height="200px" style="object-fit: cover;">`
            +' </div>'
            +' <div class="radio-wrapper">'
            + `    <input type="radio" id="opcion${i}" name="ImagenPrincipal" value="false" >`
            +'  </div>'
            + '</div>'
            +'</div>'
            
            );
          $("#add-photo-container").append(img);
          $('.radio-wrapper input:first').prop('checked', true);
          console.log("Paso por aqui")
          }

        }
        visor.readAsDataURL(Imagenes.files[i]);
        
      }
    


}



//#region Maps Direccion


function init() {
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.setFields(['address_components', 'geometry']);

    autocomplete.addListener('place_changed', function () {

      Lat = 0;
      Long = 0;
      TxtPais.value = "";
      TxtProvincia.value = "";
      TxtLocalidad.value = "";
      TxtDireccion.value = "";

        var place = autocomplete.getPlace();
        
        Lat = place.geometry.location.lat(),
        Long = place.geometry.location.lng();

        //console.warn(lat);
        //console.warn(lng);

        // $('#txtGeoLatitud').val(lat);
        // $('#txtGeoLongitud').val(lng);
       
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          var val = place.address_components[i].long_name;
        
            if (addressType === 'country') {
              TxtPais.value = val;
            } else if (addressType === 'administrative_area_level_1') {
              TxtProvincia.value = val;
            } else if (addressType === 'locality') {
              TxtLocalidad.value = val;
            }else if (addressType === 'street_number'){
              TxtDireccion.value += val + ' ';
            } else if (addressType === 'route'){
              TxtDireccion.value += val + ' ';
            }
            
          
          
        }
        initMap();
    });

   

}

function initMap() {

    let lat = parseFloat(Lat);
    let lng = parseFloat(Long);

    var mapOptions = {
        center: { lat: lat, lng: lng },
        zoom: 16
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: 'Ubicación'
      });
  }

google.maps.event.addDomListener(window, 'load', init);



// AGREGAR ENTIDADES

// PRIMER PASO 

AgregarDetalle = (IdCategoria) => {
  if(IdCategoria == 2){
    var settings = {
      url: "https://teok.goodapps.com.ar/api/api/DetalleCementerio/AddorUpdate",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "id": IdDetalleParaModificar,
        "tamaño": TxtTamaño.value,
        "idUnidadMedida": CboUnidadMedida.value,
        "cantidadTumbas": TxtTumbas.value,
        "idEstado": 7
      }),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response) + "   "  +"X ACA";
      if(IdDetalleParaModificar == 0){
        VerificarPais(response.id)
        
      } else {
        AgregarEntidad(IdDetalleParaModificar)
      }
      
    });
  }else{
    alert("ocurrio un eror")
  }
}

// SEGUNDO PASO 

const VerificarPais = async (IdDetalle) => {

var myHeaders = new Headers();
myHeaders.append("accept", "*/*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://teok.goodapps.com.ar/api/api/Paises/GetById/"+ TxtPais.value, requestOptions)
  .then(response => response.text())
  .then(result => {

  
     if (result == 0){
     
      var myHeaders = new Headers();
      myHeaders.append("accept", "*/*");
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "id": 0,
        "nombre": TxtPais.value,
        "orden": 0,
        "idEstado": 1
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

        async function addOrUpdatePais() {
        try {
          const response = await fetch("https://teok.goodapps.com.ar/api/api/Paises/AddorUpdate", requestOptions);
          const result = await response.json();
          IdPais = result.id;
          console.log(IdPais);
          await VerificarProvincia(result.id, IdDetalle);
        } catch (error) {
          console.log('error', error);
        }
      }

      addOrUpdatePais();

    }else {

var Datos = JSON.parse(result);
IdPais = Datos[0].id;
console.log(Datos[0].id);

async function verificarProvincia() {
  try {
    await VerificarProvincia(Datos[0].id, IdDetalle);
  } catch (error) {
    console.log('error', error);
  }
}

verificarProvincia();

    }





  })
  .catch(error => console.log('error', error));


}

const VerificarProvincia = async(IdPais, IdDetalle) =>{
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://teok.goodapps.com.ar/api/api/Provincias/GetByName/" + TxtProvincia.value, requestOptions)
    .then(response => response.text())
    .then(result => {


      if (result == 0){
        

        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "id": 0,
          "nombre": TxtProvincia.value,
          "idPais": IdPais,
          "idEstado": 3
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        async function addOrUpdateProvincia() {
          try {
            const response = await fetch("https://teok.goodapps.com.ar/api/api/Provincias/AddorUpdate", requestOptions);
            const result = await response.json();
            IdProvincia = result.id;
            console.log(IdProvincia);
            await VerificarLocalidad(result.id, IdDetalle);
          } catch (error) {
            console.log('error', error);
          }
        }
        
        addOrUpdateProvincia();
  
  
  
      }else {
        var Datos = JSON.parse(result);
        console.log(Datos[0].id);
        IdProvincia = Datos[0].id;
        
        async function verificarLocalidad() {
          try {
            await VerificarLocalidad(Datos[0].id, IdDetalle);
          } catch (error) {
            console.log('error', error);
          }
        }
        
        verificarLocalidad();
      }







    })
    .catch(error => console.log('error', error));
}

const VerificarLocalidad = async (IdProvincia, IdDetalle) =>{

  var myHeaders = new Headers();
myHeaders.append("accept", "*/*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://teok.goodapps.com.ar/api/api/Localidades/GetById/"+ TxtLocalidad.value, requestOptions)
  .then(response => response.text())
  .then(result => {



    if (result == 0){
      
      var myHeaders = new Headers();
      myHeaders.append("accept", "*/*");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": 0,
        "nombre": TxtLocalidad.value,
        "idProvincia": IdProvincia,
        "idEstado": 3
      });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    async function addOrUpdateLocalidad() {
      try {
        const response = await fetch("https://teok.goodapps.com.ar/api/api/Localidades/AddorUpdate", requestOptions);
        const result = await response.json();
        IdLocalidad = result.id;
        console.log(IdLocalidad);


        AgregarEntidad(IdDetalle)


      } catch (error) {
        console.log('error', error);
      }
    } 

    addOrUpdateLocalidad();

    }else {

      var Datos = JSON.parse(result);
      console.log(Datos[0].id);
      IdLocalidad = Datos[0].id;
      AgregarEntidad(IdDetalle)
    }






  })
  .catch(error => console.log('error', error));


}

const AgregarEntidad = async (IdDetalle)=> {
  Datos = GetInformationToken();
  console.log(IdDetalle);



console.log(IdPais,IdProvincia,IdLocalidad)


  FechaPublicacion = new Date()
  FechaUltimaEntrada = new Date()





var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": IdEntidadParaModificar,
  "idEntidadTipo": CboEntidadTipo.value,
  "razonSocial": TxtRazonSocial.value,
  "fantasia": TxtFantasia.value,
  "fechaFundancion": DtoFundacion.value,
  "horarios": TxtHorarios.value,
  "informacionGeneral": TxtInformacion.value,
  "idCategoria": 2,
  "idPais": IdPais,
  "idProvincia": IdProvincia,
  "idLocalidad": IdLocalidad,
  "dirreccion": TxtDireccion.value,
  "ubicacion": "No se utiliza mas",
  "lat":  Lat.toString(),
  "long": Long.toString(),
  "idDetalle": IdDetalle,
  "idUser": Datos.userId,
  "idEstado": 7,
  "fechaCreacion": FechaPublicacion,
  "fechaUltimaModificacion": FechaUltimaEntrada
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

console.log(raw)

fetch("https://teok.goodapps.com.ar/api/api/Entidades/AddOrUpdate", requestOptions)
  .then(response => response.text())
  .then(result => {
    


    
    var Datos = JSON.parse(result);
    console.log(Datos);
    console.log(Datos.id);
    AgregarImagen(Datos.id)

  })
  .catch(error => console.log('error', error));
  

  
}

//TERCER PASO 

const AgregarImagen = async (Entidad) => {
  var ImagenesArchivo = document.getElementsByClassName("ImagenArchivo");
  var arrayImg = ImagenesArchivo;
  var MultimediaTipo = 2;

  var Principal
  var inputRadios = Array.from(document.querySelectorAll('input[name="ImagenPrincipal"]'))


  for (let i = 0; i < arrayImg.length; i++) {

    Principal = inputRadios[i].checked;
    
      var Imagen = arrayImg[i].src;
        API_Imagen(Imagen, MultimediaTipo, Entidad, Principal);
  }
  alert("Se cargo Todo Correctamente ")
}

function API_Imagen(Imagen, MultimediaTipo, Entidad, Principal){
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Multimedias/AddOrUpdateImagen/" + ValorCategoria,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "idEntidad": Entidad,
      "idDifunto": 0,
      "idMultimediaTipo": MultimediaTipo,
      "valor": Imagen,
      "principal": Principal,
      "idEstado": 15
      
    }),
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}