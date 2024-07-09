document.addEventListener('DOMContentLoaded', async () => {

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        const email = urlParams.get('email');
        const form = document.querySelector('form')
        form.addEventListener('submit', async (event) =>{
            const password = document.getElementById('password').value
            const confirmpass = document.getElementById('confirmPassword').value
            
            event.preventDefault()
            if (password !== confirmpass) {
                Swal.fire({
                    title: "New Password dengan Confirm New Pass harus sama",
                    icon: "error"
                });
            } else {
                const responChange = await fetch(`/lupaPassword`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body:  JSON.stringify({
                        username: username,
                        email:email,
                        newPass: password,
                        confirmPass: confirmpass,
                    })
                });
                const dataChange = await responChange.json()
                console.log(dataChange);
                if (dataChange.success) {
                    Swal.fire({
                        title: dataChange.message,
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then((result) => {
                        if (result.isConfirmed) {
                           window.location.href = "/login"
                        }
                    })
                }else{
                    Swal.fire({
                        title: dataChange.message,
                        icon: "error"
                    });
                }
                
            }
        })
       

    } catch (error) {
        console.error(error);
    }



});