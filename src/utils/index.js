const validateEmail = (email) => {
  let re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
};

const validateName = (name) => {
  let re = new RegExp(/^[a-zA-Z\u00C0-\u00FF]{3,25}$/);
  return re.test(name);
}

const validatePassword = (password) => {
  let re = new RegExp(/^.{6,10}$/);
  return re.test(password);
}

const validateBirthdate = (birthdate) => {
  let re = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
  return re.test(birthdate);
}


const validateCreditCard = (creditCard) => {
  let re= new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
  return re.test(creditCard);
}

const validateExpirationDate = (expirationDate) => {
  let re = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
  return re.test(expirationDate);
}

const validateSecurityCode = (securityCode) => {
  let re = new RegExp(/^[0-9]{3,3}$/);
  return re.test(securityCode);
}

const validatePhone = (phone) => {
  let re = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);
  return re.test(phone);
}




export {
  validateEmail,
  validateName,
  validatePassword,
  validateBirthdate,

  validateCreditCard,
  validateExpirationDate,
  validateSecurityCode,

  validatePhone,
};