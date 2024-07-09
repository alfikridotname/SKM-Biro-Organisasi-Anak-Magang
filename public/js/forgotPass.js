document.addEventListener('DOMContentLoaded', async () => {

    try {
        
        const form = document.querySelector('form')
        form.addEventListener('submit', async (event) =>{
            const username = document.getElementById('username').value
            const email = document.getElementById('email').value
            event.preventDefault()
            console.log(username, email)
            
            window.location.href = "/changePass/?username=" + username+"&email="+ email;
          
            
        })
       

    } catch (error) {
        console.error(error);
    }



});