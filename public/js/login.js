document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const response = await fetch('/loginAdmin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const dataLogin = await response.json()
        console.log(dataLogin);
        if (dataLogin.success) {

            // Informasi login sukses
            Swal.fire({
                title: dataLogin.message,
                timer: 1500,
                icon: "success"
                    });
                    window.location.href='/dashboard'
            // Fetch data setelah login sukses
            
        } else {
            // Informasi login gagal
            Swal.fire({
                title: dataLogin.message,
                timer: 1500,
                icon: "error"
            });
        }
    })
})
