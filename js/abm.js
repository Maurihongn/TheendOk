// Variables Globales
var Url = "https://teok.goodapps.com.ar/api/";
var IdEntidadParaModificar = 0;
var IdDetalleParaModificar = 0;


// TEXT BOXES
let TxtRazonSocial = document.getElementById("txt_RazonSocial");
let TxtFantasia = document.getElementById("txt_Fantasia");
let TxtDirrecion = document.getElementById("txt_Direccion");
let TxtUbicacion = document.getElementById("txt_Ubicacion");
let TxtHorarios = document.getElementById("txt_Horarios");
let TxtInformacion = document.getElementById("txt_InformacionGeneral");
// OTROS BOXES
let DtoFundacion = document.getElementById("dto_Fundaciom");
let InpImagen = document.getElementById("inp_Imagen");
// COMBO BOXES
let CboPais = document.getElementById("cbo_Pais");
let CboProvincia = document.getElementById("cbo_Provincia");
let CboLocalidad = document.getElementById("cbo_Localidad");
let CboEntidadTipo = document.getElementById("cbo_EntidadTipo");
let CboCategoria = document.getElementById("cbo_Categoria");
// DETALLE CEMENTERIO
let TxtTamaño = document.getElementById("txt_Tamaño");
let TxtTumbas = document.getElementById("txt_CantidadTumbas");
let CboUnidadMedida = document.getElementById("cbo_UnidadMedida");
// GRILLAS Y BOTONES
let ValorCategoria = ""

let LblRazonSocial = document.getElementById("lbl_RazonSocial")
let LblFantasia = document.getElementById("lbl_Fantasia")
let LblFundacion = document.getElementById("lbl_Fundacion")
let LblEntidadTipo = document.getElementById("lbl_EntidadTipo")

// CARGAR GRILLA

function CargarGrilla(){
  let Grilla = $("#GrillaEntidad");
  Grilla.empty()
  Datos = GetInformationToken();
  var settings = {
    "url": URLAPI + "/Entidades/GetAsync/"+ Datos.userId,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const Datos = response[i];
      let Estado;
      if(Datos.estado == 7){
        Estado = "Activo"
      }else{
        Estado = "Inactivo"
      }


      Grilla.append(`
      <tr>
      <th scope="row">${i+1}</th>
      <td>${Datos.razonSocial}</td>
      <td>${Datos.categoria}</td>
      <td>${Datos.tipo}</td>
      <td>${Estado}</td>
      <td>
        <button id="btnInvertirEstado" class="btn" onclick="InvetirEstadoEntidades('${Datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg></button>
      </td>
      <td>
        <button id="btnModificar" class="btn" onclick="SeccionEntidadesABM('${Datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></button>
      </td>
    </tr>
    `)
    }
    
      
  
  });
}

function InvetirEstadoEntidades(id){
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Entidades/ChangeEstado/"+id,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    CargarGrilla();
  });
}

// -----------------------------------------------------------------------------
// ---------------------------------Funciones-----------------------------------
function CargarPaises(){
  let Paises = $("#cbo_Pais");
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/Paises/GetAll",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response){ 
    let context = "";
    console.log(response);
    
      for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
        context += `
                <option value="${response[i].id}">${response[i].nombre}</option>
                `;
        CboPais.innerHTML = context;
      }
  }
)}


function CargarProvincias(valor) {
  CboProvincia.innerHTML = "";
  CboLocalidad.innerHTML = "";
  var settings = {
    url: `https://teok.goodapps.com.ar/api/api/Provincias/GetByIdPais/${valor}`,
    method: "GET",
    timeout: 0,
  };
  
  $.ajax(settings).done(function (response) {
    let context = "";
    console.log(response);

    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${response[i].id}">${response[i].nombre}</option>
                `;
      CboProvincia.innerHTML = context;
    }
  });
}


function CargarLocalidades(valor) {
  CboLocalidad.innerHTML = "";
  var settings = {
    url: `https://teok.goodapps.com.ar/api/api/Localidades/GetForIdProvincia/${valor}`,
    method: "GET",
    timeout: 0,
  };
  
  $.ajax(settings).done(function (response) {
    let context = "";
    console.log(response);

    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${response[i].id}">${response[i].nombre}</option>
                `;
      CboLocalidad.innerHTML = context;
    }
  });
}


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


function CargarCategoria(){
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/EntidadesCategoria/GetAsync",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    let context = "";

    console.log(response);
    console.log();
    
    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${response[i].id}" >${response[i].descripcion}</option>
                `;
      CboCategoria.innerHTML = context;
    }   
  });

 
}


function CargarEntidadTipo(IdCategoria){
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/EntidadesTipos/GetFront/"+IdCategoria,
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

if(IdCategoria == 2){
  $("#DetalleCementerio").show();
  $("#Multimedia").show();
}else{
  $("#DetalleCementerio").hide();
  $("#Multimedia").hide();
}

  ValorCategoria = $("#cbo_Categoria option:selected").text();
  console.log(ValorCategoria);

if(ValorCategoria == "Particular"){
  
  LblRazonSocial.innerHTML = "Nombre"
  LblFantasia.innerHTML = "Apellido"
  LblFundacion.innerHTML = "Fecha de nacimiento"
  LblEntidadTipo.innerHTML = "Genero"

}else{
  LblRazonSocial.innerHTML = "Razon social"
  LblFantasia.innerHTML = "Fantasia"
  LblFundacion.innerHTML = "Fecha de fundacion"
  LblEntidadTipo.innerHTML = "Tipo de entidad"
}



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
        AgregarEntidad(response.id)
      } else {
        AgregarEntidad(IdDetalleParaModificar)
      }
      
    });
  }else{
    AgregarEntidad(0)
  }
}

// SEGUNDO PASO 

const AgregarEntidad = async (IdDetalle)=> {
  Datos = GetInformationToken();
  console.log(IdDetalle);
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/Entidades/AddOrUpdate",
    method: "POST",
    timeout: 0,
    headers: {
      "accept": "*/*",
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "id": IdEntidadParaModificar,
      "razonSocial": TxtRazonSocial.value,
      "fantasia": TxtFantasia.value,
      "idCategoria": CboCategoria.value,
      "idEntidadTipo": CboEntidadTipo.value,
      "idPais": CboPais.value,
      "idProvincia": CboProvincia.value,
      "idLocalidad": CboLocalidad.value,
      "dirreccion": TxtDirrecion.value,
      "fechaFundancion": DtoFundacion.value,
      "horarios": TxtHorarios.value,
      "informacionGeneral": TxtInformacion.value,
      "ubicacion": TxtUbicacion.value,
      "lat": "Prueba Cargar",
      "long": "Prueba Cargar",
      "idDetalle": IdDetalle,
      "idUser": Datos.userId,
      "idEstado": 7
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response.categoria != 1){
      if(IdEntidadParaModificar != 0){
      AgregarImagen(IdEntidadParaModificar)
      } else{
        AgregarImagen(response.id)
      }
    }else{
      console.log("Estas Cargado una entidad como Particular no puedes agregar fotos")
      alert("Se cargo Todo Correctamente (Particulares, por el momento el resto de entidades)")
    }
    
    
    LimpiarCamposEntidades();
  });
  
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
  alert("Se cargo Todo Correctamente (Cementerios)")
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


// MODIFICAR ENTIDADES
function CargarModificaciones(valor){
  LimpiarCamposEntidades()
  IdEntidadParaModificar = valor;
  console.clear()
  console.log(IdEntidadParaModificar)
  setTimeout(function () {
    var settings = {
      url: "https://teok.goodapps.com.ar/api/api/Entidades/GetAsync/" + valor,
      method: "GET",
      timeout: 0,
      headers: {
        accept: "*/*",
      },
    };
    $.ajax(settings).done(function (response) {
      let Datos = response[0]
      
      console.log(Datos)
      IdDetalleParaModificar = Datos.idDetalle
      CargarPaises();
      CargarUnidad();
      CargarCategoria();
  
  
      setTimeout(function () {
        for (var i = 0; i < CboCategoria.options.length; i++) {
          if (CboCategoria.options[i].innerHTML == Datos.categoria) {
            CboCategoria.options[i].selected = true;
            break;
          }
        }
        for (var i = 0; i < CboPais.options.length; i++) {
          if (CboPais.options[i].value == Datos.pais) {
            CboPais.options[i].selected = true;
            break;
          }
        }
      }, 200);
  
  
      CargarProvincias(CboPais.value);
      TxtRazonSocial.value = Datos.razonSocial;
      TxtFantasia.value = Datos.fantasia;
      TxtUbicacion.value = Datos.ubicacion
      TxtDirrecion.value = Datos.direccion
      TxtHorarios.value = Datos.horarios
  
  
      setTimeout(function () {
        CargarLocalidades(CboProvincia.value);
        CargarEntidadTipo(CboCategoria.value);
      }, 300);
  
  
      setTimeout(function () {
        for (var i = 0; i < CboEntidadTipo.options.length; i++) {
          if (CboEntidadTipo.options[i].innerHTML == Datos.tipo) {
            CboEntidadTipo.options[i].selected = true;
            break;
          }
        }
        for (var i = 0; i < CboProvincia.options.length; i++) {
          if (CboProvincia.options[i].value == Datos.provincia) {
            CboProvincia.options[i].selected = true;
            break;
          }
        }
      }, 400);
  
  
        for (var i = 0; i < CboLocalidad.options.length; i++) {
          if (CboLocalidad.options[i].value == Datos.localidad) {
            CboLocalidad.options[i].selected = true;
            break;
          }
        }
        DtoFundacion.value = Datos.fechaFundacion.slice(0,10);
        TxtTamaño.value = Datos.tamaño;
        TxtTumbas.value = Datos.cantidadTumbas;
        TxtInformacion.value = Datos.informacionGeneral;
    });
  }, 300);
  CargarModificacionesImagenesEntidad(IdEntidadParaModificar)
}

// PRIMER PASO


// LIMPIAR CAMPOS

function LimpiarCamposEntidades(){
  TxtRazonSocial.value = "";
  TxtFantasia.value = "";
  TxtUbicacion.value="";
  TxtDirrecion.value = "";
  DtoFundacion.value = "";
  TxtTamaño.value = "";
  TxtTumbas.value = "";
  TxtHorarios.value = "";
  TxtInformacion.value = "";
  arrayImg = "";
  InpImagen.value = "";
  $(".ImagenArchivo").parent().remove();
  $("#add-photo-container").empty()
  IdEntidadParaModificar = 0;
  IdDetalleParaModificar = 0;
  // CboPais.value = "";
  // CboProvincia.value = "";
  // CboLocalidad.value = "";
  // CboUnidadMedida.value = "";
  // CboTipoCementerio.value = "";
}

function CargarModificacionesImagenesEntidad(id){

  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Entidades/GetAsync/"+ id,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {

    console.log(response[0]);
    let Datos = response[0]

  var CargarImagenesBD = $("#Modificar-photo-container");
  CargarImagenesBD.empty();

  var IdImagen = []
  var Imagenes = [];
  var Activos = [];

  for (let i = 0; i < Datos.principal.length; i++) {
    IdImagen.push(Datos.principal[i].id)
    Imagenes.push(Datos.principal[i].imagen)
    if(Datos.principal[i].activo == 15){
      Activos.push("Activo")
    }else{
      Activos.push("Inactivo")
    }
    
  }
  for (let i = 0; i < Datos.secundarias.length; i++) {
    IdImagen.push(Datos.secundarias[i].id)
    Imagenes.push(Datos.secundarias[i].imagen)
    if(Datos.secundarias[i].activo == 15){
      Activos.push("Activo")
    }else{
      Activos.push("Inactivo")
    }
    
  }
  for (let i = 0; i < Imagenes.length; i++) {
  
  CargarImagenesBD.append(
    `
    <div class="image-wrapper">
      <img src=" ${Imagenes[i]}" alt=""  onclick="CambiarEstadoImagenesEntidad(${IdImagen[i]})" class="ImagenBD" id="Images" alt="Foto del usuario" width="200px" height="200px" style="object-fit: cover;">
      <p> Foto N° ${i + 1} / ${Activos[i]}</p>
    </div>
    `
  );

  }

  });

}


function CambiarEstadoImagenesEntidad(id){
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Multimedias/ChangeEstado/"+ id,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    CargarModificacionesImagenesEntidad(IdEntidadParaModificar)
  });
}

// -------------------------------------------------------------------------
// -------------------------ABM DIFUNTOS------------------------------------

// TEXT BOXES
let TxtNombreDifunto = document.getElementById("txt_NombreDifunto");
let TxtApellido = document.getElementById("txt_ApellidoDifunto");
let TxtNacimiento = document.getElementById("txt_NacimientoDifunto");
let TxtFallecimiento = document.getElementById("txt_FallecimientoDifunto");
let TxtPadres = document.getElementById("txt_Padres");
let TxtConyuge = document.getElementById("txt_Conyuge");
let TxtFuneral = document.getElementById("txt_Funeral");
let TxtLatitud = document.getElementById("txt_Latitud");
let TxtLongitud = document.getElementById("txt_Longitud");
let TxtCausaMuerte = document.getElementById("txt_CausaMuerte");
// OTROS BOXES
let DtoNacimiento = document.getElementById("dto_NacimientoDifunto");
let DtoFallecimiento = document.getElementById("dto_FallecimientoDifunto");
let DtoFuneral = document.getElementById("dto_Funeral");
let InpImagenDifuntos = document.getElementById("inp_ImagenDifuntos");
// COMBO BOXES
let CboEntidadDifunto = document.getElementById("cbo_EntidadDifuntos");
let CboCementerio = document.getElementById("cbo_Cementerio");
// GRILLAS Y BOTONES

let IdModificacion = 0;
let IdEstado = 13;

function CargarGrillaDifuntos(){
  let Grilla = $("#GrillaDifunto");
  Grilla.empty()
  Datos = GetInformationToken();
  var settings = {
    "url": URLAPI + "/api/Difuntos/GetTable/"+ Datos.userId,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const Datos = response[i];
      let Estado;
      if(Datos.idEstado == 13){
        Estado = "Activo"
      }else{
        Estado = "Inactivo"
      }


      Grilla.append(`
      <tr>
      <th scope="row">${i+1}</th>
      <td>${Datos.nombre}</td>
      <td>${Datos.apellido}</td>
      <td>${Estado}</td>
      <td>
        <button id="btnInvertirEstado" class="btn" onclick="InvetirEstadoDifuntos('${Datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg></button>
      </td>
      <td>
        <button id="btnModificar" class="btn" onclick="SeccionDifuntosABM('${Datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></button>
      </td>
      <td>
      <button id="btnModificar" class="btn" onclick="MostrarQr('${Datos.id}', '${Datos.nombre}')" data-bs-toggle="modal" data-bs-target="#ModalQr"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg></button>
      </td>
    </tr>
    `)
    }
    
      
  
  });
}


function InvetirEstadoDifuntos(id){
  var settings = {
    "url": URLAPI + "/api/Difuntos/ChangeEstado/"+ id,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    CargarGrillaDifuntos();
  });
}


// -----------------------------------------------------------------------------
// ---------------------------------Funciones-----------------------------------
function CargarCementerios() {
  CboCementerio.innerHTML = "";
  var settings = {
    url: "https://teok.goodapps.com.ar/api/api/Entidades/CargarTodosCementerios",
    method: "GET",
    timeout: 0,
  };
  let context = "";
  $.ajax(settings).done(function (response) {
    console.log(response);
    for (let i = 0; i <= response.length; i++) {
      let Datos = response[i];
      context += `
                <option value="${Datos.id}">${Datos.razonSocial}</option>
                `;
      CboCementerio.innerHTML = context;
    }
  });
}

function CargarImagenesDifuntos(){
  let Imagenes = document.getElementById("inp_ImagenDifuntos")
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
              `
            <div class="image-container col-2">
              <div class="image-wrapper">
                <img src=" ${j.target.result}" alt="Foto del usuario" class="ImagenArchivo" id="Images" alt="Foto del usuario" width="200px" height="200px" style="object-fit: cover;">
              </div>
              <div class="radio-wrapper">
                <input type="radio" id="opcion${i}" name="ImagenPrincipal" value="false">
              </div>
            </div>
          `
          );
          $("#add-photo-containerDifuntos").append(img);
          $('.radio-wrapper input:first').prop('checked', true);
          console.log("Paso por aqui")
          }

        }
        visor.readAsDataURL(Imagenes.files[i]);
      }
      


}

function AgregarDifunto(){

    IdEstado = 13;

    Datos = GetInformationToken();

    var settings = {
      url: "https://teok.goodapps.com.ar/api/api/Difuntos/AddOrUpdate",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({

        "id": IdModificacion,
        "nombre": TxtNombreDifunto.value,
        "apellido": TxtApellido.value,
        "fechaNacimiento": DtoNacimiento.value,
        "fechaFallecimiento": DtoFallecimiento.value,
        "lugarNacimiento": TxtNacimiento.value,
        "lugarFallecimiento": TxtFallecimiento.value,
        "causaMuerte": TxtCausaMuerte.value,
        "nombrePadres": TxtPadres.value,
        "nombreConyuge": TxtConyuge.value,
        "fechaFuneral": DtoFuneral.value,
        "lugarFuneral": TxtFuneral.value,
        "ubicacionLat": TxtLatitud.value,
        "ubicacionLng": TxtLongitud.value,
        "idEntidad": CboCementerio.value,
        "idUsuario": Datos.userId,
        "idEstado": IdEstado

      }),
    };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if(IdModificacion == 0){
      AgregarImagenDifunto(response.id)
    }else{
      AgregarImagenDifunto(IdModificacion)
    }
    LimpiarCamposDifuntos();
    alert("Se cargo Todo Correctamente (Difuntos)")
    SeccionGrillaDifuntos();
  });
}

const AgregarImagenDifunto = async (Difunto) => {
  
  

  var ImagenesArchivo = document.getElementsByClassName("ImagenArchivo");
  var arrayImg = ImagenesArchivo;
  var MultimediaTipo = 2;
  var Principal
  var inputRadios = Array.from(document.querySelectorAll('input[name="ImagenPrincipal"]'))
 

  for (let i = 0; i < arrayImg.length; i++) {

    Principal = inputRadios[i].checked;

    console.log(Principal);

    var Imagen = arrayImg[i].src;

    API_ImagenDifunto(Imagen, MultimediaTipo, Difunto, Principal);
      
    Principal = "";
  }
  alert("Se cargo Todo Correctamente + Imagenes (Difuntos)")
}

function API_ImagenDifunto(Imagen, MultimediaTipo, Difunto, Principal){
  
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Multimedias/AddOrUpdateImagen/" + "Difuntos",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "idEntidad": 0,
      "idDifunto": Difunto,
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

function CargarModificacionesDifuntos(id){
 
  LimpiarCamposDifuntos();

  var settings = {
    "url": URLAPI +"/api/Difuntos/GetAsync/"+ id,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response[0]);
    let Datos = response[0]

    IdModificacion = Datos.id;
    IdEstado = Datos.idEstado;

    TxtNombreDifunto.value = Datos.nombre;
    TxtApellido.value = Datos.apellido;
    TxtPadres.value = Datos.nombrePadres;
    TxtConyuge.value = Datos.nombreConyuge;
    TxtCausaMuerte.value = Datos.causaMuerte;

    TxtNacimiento.value = Datos.lugarNacimiento;
    TxtFallecimiento.value = Datos.lugarFallecimiento;
    TxtFuneral.value = Datos.lugarFuneral;

    TxtLatitud.value = Datos.ubicacionLat;
    TxtLongitud.value = Datos.ubicacionLng;
  
    DtoNacimiento.value = Datos.fechaNacimiento.slice(0,10);
    DtoFallecimiento.value = Datos.fechaFallecimiento.slice(0,10);
    DtoFuneral.value = Datos.fechaFuneral.slice(0,10);


    CargarCementerios()

    setTimeout(function () {
    for (var i = 0; i < CboCementerio.options.length; i++) {
      if (CboCementerio.options[i].value == Datos.idEntidad) {
        CboCementerio.options[i].selected = true;
        break;
      }
    }

    
  }, 400);

  CargarModificacionesImagenes(id)


  });

}
function CargarModificacionesImagenes(id){

  var settings = {
    "url": URLAPI +"/api/Difuntos/GetAsync/"+ id,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {

    console.log(response[0]);
    let Datos = response[0]

  var CargarImagenesDifuntosBD = $("#Modificar-photo-containerDifuntos");
  CargarImagenesDifuntosBD.empty();

  var IdImagen = []
  var Imagenes = [];
  var Activos = [];

  for (let i = 0; i < Datos.principal.length; i++) {
    IdImagen.push(Datos.principal[i].id)
    Imagenes.push(Datos.principal[i].imagen)
    if(Datos.principal[i].activo == 15){
      Activos.push("Activo")
    }else{
      Activos.push("Inactivo")
    }
    
  }
  for (let i = 0; i < Datos.secundarias.length; i++) {
    IdImagen.push(Datos.secundarias[i].id)
    Imagenes.push(Datos.secundarias[i].imagen)
    if(Datos.secundarias[i].activo == 15){
      Activos.push("Activo")
    }else{
      Activos.push("Inactivo")
    }
    
  }
  for (let i = 0; i < Imagenes.length; i++) {
  
  CargarImagenesDifuntosBD.append(
    `
    <div class="image-wrapper">
      <img src=" ${Imagenes[i]}" alt=""  onclick="CambiarEstadoImagenes(${IdImagen[i]})" class="ImagenBD" id="Images" alt="Foto del usuario" width="200px" height="200px" style="object-fit: cover;">
      <p> Foto N° ${i + 1} / ${Activos[i]}</p>
    </div>
    `
  );

  }

  });

}


function CambiarEstadoImagenes(id){
  var settings = {
    "url": "https://teok.goodapps.com.ar/api/api/Multimedias/ChangeEstado/"+ id,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    CargarModificacionesImagenes(IdModificacion)
  });
}

function LimpiarCamposDifuntos(){
TxtNombreDifunto.value = "";
TxtApellido.value = "";
DtoNacimiento.value = "";
DtoFallecimiento.value = "";
TxtNacimiento.value = "";
TxtFallecimiento.value = "";
TxtPadres.value = "";
TxtConyuge.value = "";
DtoFuneral.value = "";
TxtFuneral.value = "";
TxtLatitud.value = "";
TxtLongitud.value = "";
CboCementerio.value = "";
TxtCausaMuerte.value = "";
InpImagenDifuntos.value = "";
IdModificacion = 0;
IdEstado = 13;
}





//////////////////////////////////////////////////////////////////////////////////

function GenerarQR(Text,Tamaño,Imagen){
  
  var contenedorQR = $('#codigoqr');
  contenedorQR.empty();

  var qr2 = new QRCode(contenedorQR[0], {
    text: Text,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    image: document.getElementById("QRIcono"),
    imageSize: 1.5 // porcentaje del tamaño del código QR
  });


}

function AgregarQr(IdDifunto){

  var fechaActual = new Date();
  DatosToken = GetInformationToken();
  DatosQR = GetIdQr(DatosToken.userId);

  var settings = {
    "url": URLAPI + "/api/QrUsersDetalles/AddorUpdate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "/",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      //"id": 0,
      "idQrUser": DatosQR.Id,
      "idDifunto": IdDifunto,
      "contenido": "http://127.0.0.1:5500/DifuntoQR.html?ID="+IdDifunto,
      "iconoQr": "Prueba",
      "tamaño": "150px",
      "urlQrFinal": "Aca Se guarda el QR",
      "cantidadUso": "0",
      "fehcaCreacion": fechaActual,
      "fechaExpiracion": fechaActual,
      "idEstado": 40
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);





  });
}

BuscarIdQr = async (IdDifunto) =>{

  DatosToken = GetInformationToken();

  DatosQR = await GetIdQr(DatosToken.userId);


  var settings = {
    "url": URLAPI + "/api/QrUsersDetalles/ObtenerId/"+ DatosQR.Id +"/"+ IdDifunto,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  try {
    const response = await $.ajax(settings);
    datos = { Id: response[0].id}
    return datos;
  } catch (error) {
    console.error(error);
    return null;
  }

}

 MostrarQr = async (IdDifunto, Nombre)=> {

  let NombreDifunto = document.getElementById("NombreDifunto")
  NombreDifunto.textContent = Nombre


 let Datos = await BuscarIdQr(IdDifunto)

  var settings = {
    "url": URLAPI + "/api/QrUsersDetalles/ObtenerQr/" + Datos.Id,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "/"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response[0]);
    let Datos = response[0]
    GenerarQR(Datos.contenido,Datos.Tamaño,Datos.iconoQr)




  });

}