// let UrlPaypal = "https://api-m.sandbox.paypal.com";
// let UrlToken = UrlPaypal + "/v1/oauth2/token";
// let Authorization = "QVRxWGdZQ282TzhMdUNVQ0g3RnpLME5xWFF6WjI2bWNNXzJ4SU9BbjRTMUI5cmdPNG8zTHJLWjVlV1dHdUFza3lwc3RiVVFfbFBzY1pTd3M6RU1OUUJ1VGducGtpb3ZnSWZINnJnTDVoM0V1WDNZRWdTSVNvYVJqdnVvd01tVTliV05ucmJrMjRvelVYTzA2YmJVMWxISEh4eC1hT1JSLWc=";

// function GenerarToken(){
//   var settings = {
//     "url": UrlToken,
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Authorization": "Basic " + Authorization,
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     "data": {
//       "grant_type": "client_credentials",
//       "ignoreCache": "true",
//       "return_authn_schemes": "true",
//       "return_client_metadata": "true",
//       "return_unconsented_scopes": "true"
//     }
//   };
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     localStorage.setItem("Token-Paypal", response.access_token)
    
//   });
// }

function BuscarInformacion(){

  Datos = GetInformationToken();

  GetIdQr(Datos.userId).then(datos => {
    console.log(datos);
    Comrar1Qr(datos.Id, datos.userId)
    Comrar10Qr(datos.Id, datos.userId)
    Comrar100Qr(datos.Id, datos.userId)
  });
  //SubscribirteCementerios();
  //SubscribirteFloreria();
}

function Comrar1Qr(IdQr, userId){
  

  paypal.Buttons({
    style: {
      placement: "payment",
      color: 'blue',
      shape: 'pill',
      label: 'pay',
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '5.00'
          },
          description: 'Comprar 1 QR en TEOK'
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        console.log(details)
        
        let NombreCompleto = details.payer.name.given_name + " " + details.payer.name.surname

        GuardarCompra(userId, details.id, NombreCompleto, details.purchase_units[0].description, details.purchase_units[0].amount.value, details.purchase_units[0].amount.currency_code, details.create_time, 1)
        
        AcreditarToken(userId, IdQr, 1, details.status)

       console.log(userId, details.id, NombreCompleto, details.purchase_units[0].description, details.purchase_units[0].amount.value, details.purchase_units[0].amount.currency_code, details.create_time, 1)
      

       alert('Gracias Por tu compra ' + NombreCompleto);

     });
 
 
    },
    onCancel: function(data) {
      alert('Cancelaste el pago');
    },
    onError: function(err) {
      alert('Error durante el pago: ' + err);
    }
   }).render('#paypal-button-container-5usd');
 
}
function Comrar10Qr(IdQr, userId){

  paypal.Buttons({
    style: {
      color: 'blue',
      shape: 'pill',
      label: 'pay',
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '30.00'
          },
          description: 'Comprar 10 QR en TEOK'
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {

        let NombreCompleto = details.payer.name.given_name + " " + details.payer.name.surname

        AcreditarToken(userId, IdQr, 10 , details.status)
        GuardarCompra(userId, details.id, NombreCompleto, details.purchase_units[0].description, details.purchase_units[0].amount.value, details.purchase_units[0].amount.currency_code, details.create_time, 10)
 

       alert('Gracias Por tu compra ' + details.payer.name.given_name);
     });
 
 
    },
    onCancel: function(data) {
      alert('Cancelaste el pago');
    },
    onError: function(err) {
      alert('Error durante el pago: ' + err);
    }
   }).render('#paypal-button-container-30usd');
 
}
function Comrar100Qr(IdQr, userId){

  paypal.Buttons({
    style: {
      color: 'blue',
      shape: 'pill',
      label: 'pay',
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '150.00'
          },
          description: 'Comprar 100 QR en TEOK'
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {

        let NombreCompleto = details.payer.name.given_name + " " + details.payer.name.surname
        AcreditarToken(userId, IdQr, 100, details.status)
        GuardarCompra(userId, details.id, NombreCompleto, details.purchase_units[0].description, details.purchase_units[0].amount.value, details.purchase_units[0].amount.currency_code, details.create_time, 100)
        
        alert('Gracias Por tu compra ' + details.payer.name.given_name);
     });
 
 
    },
    onCancel: function(data) {
      alert('Cancelaste el pago');
    },
    onError: function(err) {
      alert('Error durante el pago: ' + err);
    }
   }).render('#paypal-button-container-150usd');
 
}

function SubscribirteCementerios(){
  paypal.Buttons({
    style: {
        color: 'blue',
        shape: 'pill',
        layout: 'vertical',
        label: 'subscribe'
    },
    createSubscription: function(data, actions) {
      return actions.subscription.create({
        /* Creates the subscription */
        plan_id: 'P-2XX638525J662991AMQ2AZRI'
      });
    },
    onApprove: function(data, actions) {

      
      console.log(data);

        let NombreCompleto = data.payer.name.given_name + " " + data.payer.name.surname

      alert(data.subscriptionID); // You can add optional success message for the subscriber here

      AcreditarToken(userId, IdQr, 50, details.status)
      GuardarCompra(userId, data.subscriptionID, NombreCompleto, data.purchase_units[0].description, data.purchase_units[0].amount.value, data.purchase_units[0].amount.currency_code, data.create_time, 50)
        
      }

}).render('#paypal-button-container-P-2XX638525J662991AMQ2AZRI'); // Renders the PayPal button
}

function SubscribirteFloreria(){
  paypal.Buttons({
    style: {
        shape: 'pill',
        color: 'blue',
        layout: 'vertical',
        label: 'subscribe'
    },
    createSubscription: function(data, actions) {
      return actions.subscription.create({
        /* Creates the subscription */
        plan_id: 'P-5MB93552049896711MQ2BAOY'
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
     
        let NombreCompleto = details.payer.name.given_name + " " + details.payer.name.surname

      alert(data.subscriptionID); // You can add optional success message for the subscriber here

      AcreditarToken(userId, IdQr, 20, details.status)
      GuardarCompra(userId, data.subscriptionID, NombreCompleto, details.purchase_units[0].description, details.purchase_units[0].amount.value, details.purchase_units[0].amount.currency_code, details.create_time, 20)
    })}
}).render('#paypal-button-container-P-5MB93552049896711MQ2BAOY'); // Renders the PayPal button
}

async function AcreditarToken(userId, IdQr, cantidad, status){
  if(status == "COMPLETED"){
    var settings = {
      "url": URLAPI + "/api/QrUsers/Comprar",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "accept": "*/*",
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "id": IdQr,
        "idUsuario": userId,
        "cantidadQr": cantidad
      }),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      alert('Ya se an acreditado tus QR, Resibiras un correo por cada QR');
      //location.href = "index.html"
    });
  }
  
}
async function GuardarCompra(userId,IdPaypal, Nombre, descripcion, Precio, Moneda, Fecha, cantidadQr){
  var settings = {
    "url": URLAPI + "/api/HistorialCompras/GuardarCompra",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "*/*",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "idUsuario": userId,
      "idPaypal": IdPaypal,
      "nombre": Nombre,
      "descripcion": descripcion,
      "precio": Precio,
      "moneda": Moneda,
      "fecha": Fecha,
      "cantidadQr": cantidadQr,
      "descuento": 0,
      "idEstado": 30
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log("Se Guardo tu compra en la base de datos")
    alert("Se Guardo tu compra en la base de datos")
  });
}