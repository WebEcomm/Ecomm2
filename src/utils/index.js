const validateEmail = (email) => {
  let re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
};

const validatePassword = (password) => {
  let re = new RegExp(/^.{6,10}$/);
  return re.test(password);
}

export {
  validateEmail,
  validatePassword,
};