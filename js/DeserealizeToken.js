GetInformationToken = () => {


    
  //sessionStorage
  let token = localStorage.getItem('Token')



  var decoded = jwt_decode(token);

 // console.log(decoded);

  let role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  let email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  let name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  let nameidentifier = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  let datos;

  datos = { role: role, email: email, name: name, userId: nameidentifier }

  return datos;
}

async function GetIdQr(UserId) {
  var settings = {
    "url": URLAPI + "/api/QrUsers/ComprobarId/"+ UserId,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "*/*"
    },
  };
  
  try {
    const response = await $.ajax(settings);
    datos = { Id: response, userId: UserId }
    return datos;
  } catch (error) {
    console.error(error);
    return null;
  }
}