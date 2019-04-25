const signin = (event, email, password) =>{
    event.preventDefault();
    if(email === '' && password === ''){
        return window.location.href = `./user.html`
    } else if(email==='admin@gmail.com' && password ==='admin'){
        return window.location.href = `./admin.html`
    }
    
    
}

export default signin;