const validateEmail = (email) => {
  let re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
};

const validateName = (name) => {
  let re = new RegExp(/^[a-zA-Z\u00C0-\u00FF]{3,10}$/);
  return re.test(name);
}

const validatePassword = (password) => {
  let re = new RegExp(/^.{6,10}$/);
  return re.test(password);
}


export {
  validateEmail,
  validateName,
  validatePassword,
};