const p=document.getElementById("warnings");
const s=document.getElementById("valid")

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = this.querySelector('input[type="password"]').value;

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!emailInput || !passwordInput ){
        warnings+='All fields are required <br>';
        send=true
    }   
    else{

        let regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (!regexUsername.test(emailInput)) {
            warnings+='The username must be an email address <br>';
            send=true
        }
    
        if(passwordInput.length < 12){
            warnings+='The password must contain 12 characters <br>';
            send=true
        }
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: emailInput,
            password: passwordInput
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'http://localhost:3000/product/showProducts';
        } else {
            p.innerHTML = data.error; 
        }
    })  
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { 
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};


const modalRegisterUsers = new bootstrap.Modal(document.getElementById('modalRegisterUsers'));

 on(document, 'click', '.newUser', e => {
    modalRegisterUsers.show();
});


document.getElementById('userRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    const names = document.getElementById('names').value;
    const lastNames = document.getElementById('lastNames').value;
    const typeID = document.getElementById('typeID').value;
    const ID = document.getElementById('ID').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const p=document.getElementById("warnings1");
    const s=document.getElementById("valid1");

    let warnings1 = ""
    let send=false
    p.innerHTML = ""

    if(!names || !lastNames || !typeID || !ID || !user || !password ){
        warnings1+='All fields are required <br>';
        send=true
    }else{
    
        if(names.length < 3 || names.length > 20){
            warnings1+='The name must contain between 3 and 20 characters <br>';
            send=true
        }
        if(lastNames.length < 3 || lastNames.length > 20){
            warnings1+='The last names must contain between 3 and 20 characters <br>';
            send=true
        }
    
        const regexID = /^\d+$/;
    
        if (!regexID.test(ID) || ID.length < 8 || ID.length > 12) {
            warnings1+='The ID must be only numbers and contain between 8 and 12 digits <br>';
            send=true
        }
        
        let regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (!regexUsername.test(user)) {
            warnings1+='The username must be an email address <br>';
            send=true
        }
    
        if(password.length < 12){
            warnings1+='The password must contain 12 characters <br>';
            send=true
        }
    
    
    }

    if(send){
        p.innerHTML =warnings1
        return;
    }

    await fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            names,
            lastNames,
            typeID,
            ID,
            user,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                modalRegisterUsers.hide();
                location.reload();
            }, 3000);
            document.getElementById('userRegister').reset();
        } else {
            p.innerHTML = data.error; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});

