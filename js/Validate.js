

let login_or_email = document.getElementById("email_or_login"),
    password_login = document.getElementById("password_login"),
    btn_login = document.getElementById("btn_login"),

    email_sing_in = document.getElementById("email_sing_in");
    username_sing_in = document.getElementById("username_sing_in");
    password_0_sing_in = document.getElementById("password_0_sing_in");
    password_1_sing_in = document.getElementById("password_1_sing_in");
    btn_sing_in = document.getElementById("btn_sing_in");

password_login.onchange=Validate_Login;
login_or_email.onchange=Validate_Login;
email_sing_in.onchange=Validate_SingIn;
username_sing_in.onchange=Validate_SingIn;
password_0_sing_in.onchange=Validate_SingIn;
password_1_sing_in.onchange=Validate_SingIn;
function Validate_Login(){
    let login_or_email_value = login_or_email.value,
        password_login_value = password_login.value;
    if ((validateEmail(login_or_email_value) || validateUsername(login_or_email_value)) && 
        (validatePassword(password_login_value)))
    {
        btn_login.disabled = false;
    }  
    else{
        btn_login.disabled = true;
    }

    if(validatePassword(password_login_value) === false){
        password_login.classList.add("error");
        console.log("Неправильный пароль. Пароль должен содержать строчные и прописные латинчкие символы, цифры и специальный символ.");
    }
    else{
        password_login.classList.remove("error");
    }

    if ((validateEmail(login_or_email_value) === false) && 
        (validateUsername(login_or_email_value) === false))
    {
        login_or_email.classList.add("error");
        console.log("Неправильный логин. Логин должен содержать символы латинского алфавита, цифры и символ _");
    }
    else{
        login_or_email.classList.remove("error");
    }

    

    if(login_or_email_value === '')
    {
        login_or_email.classList.remove("error");
    }
    if(password_login_value === ''){
        password_login.classList.remove("error");
    }
}
function Validate_SingIn(){
    let email_sing_in_value = email_sing_in.value,
        username_sing_in_value = username_sing_in.value,
        password_0_sing_in_value = password_0_sing_in.value,
        password_1_sing_in_value = password_1_sing_in.value;
    if ((validateEmail(email_sing_in_value)) &&
        (validateUsername(username_sing_in_value)) &&
        (validatePassword(password_0_sing_in_value)) &&
        (validatePassword(password_1_sing_in_value)) &&
        (comparePasswords(password_0_sing_in_value, password_1_sing_in_value)))
    {
        btn_sing_in.disabled = false;
    }
    else{
        btn_sing_in.disabled = true;
    }

    if(validatePassword(password_0_sing_in_value) === false){
        password_0_sing_in.classList.add("error");
        console.log("Неправильный пароль. Пароль должен содержать строчные и прописные латинчкие символы, цифры и специальный символ.");
    }
    else{
        password_0_sing_in.classList.remove("error");
    }
    
    if(validatePassword(password_1_sing_in_value) === false){
        password_1_sing_in.classList.add("error");
        console.log("Неправильный пароль. Пароль должен содержать строчные и прописные латинчкие символы, цифры и специальный символ.");
    }
    else{
        password_1_sing_in.classList.remove("error");
        if(comparePasswords(password_0_sing_in_value, password_1_sing_in_value) === false){
            password_0_sing_in.classList.add("error");
            password_1_sing_in.classList.add("error");
            console.log("Passwords do not match");
        }
        else{
            password_0_sing_in.classList.remove("error");
            password_1_sing_in.classList.remove("error");
        }
    }

    

    if (validateUsername(username_sing_in_value) === false){
        username_sing_in.classList.add("error");
        console.log("Неправильный логин. Логин должен содержать символы латинского алфавита, цифры и символ _");
    }
    else{
        username_sing_in.classList.remove("error");
    }
    if (validateEmail(email_sing_in_value) === false){
        email_sing_in.classList.add("error");
        console.log("Неправильный email.");
    }
    else{
        email_sing_in.classList.remove("error");
    }

    if(email_sing_in_value === ''){
        email_sing_in.classList.remove("error"); 
    }
    if(username_sing_in_value === ''){
        username_sing_in.classList.remove("error");
    }
    if(password_0_sing_in_value === ''){
        password_0_sing_in.classList.remove("error");
    }
    if(password_1_sing_in_value === ''){
        password_1_sing_in.classList.remove("error");
    }
}
function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateUsername(login){
    let re = /^[a-zA-Z0-9-_\.][a-zA-Z0-9-_\.]{1,20}$/;
    return re.test(String(login));
}
function validatePassword(password){
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    return re.test(String(password));
}
function comparePasswords(password_0, password_1){
    return (String(password_0) === String(password_1));
}
let tooltipElem;

    document.onmouseover = function(event) {
      let target = event.target;

     
      let tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;

  
        
      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.textContent = tooltipHtml;
      document.body.append(tooltipElem);

   
      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; 

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) { 
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function() {

      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }

    };