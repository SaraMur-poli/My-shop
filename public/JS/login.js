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
    
        if(passwordInput.length < 8 || passwordInput.length > 15){
            warnings+='The password must contain 12 characters <br>';
            send=true
        }
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/login/', {
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
            
            if (data.Role === 'eInv'){
                window.location.href = 'http://localhost:3000/HTML/landing.html'
                
            } else if (data.Role === 'Admin'){
                window.location.href = 'http://localhost:3000/HTML/landing.html'
    
            } 
        } else {
            p.innerHTML = data.error; 
        }
    })
        
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});