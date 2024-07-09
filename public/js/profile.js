document.addEventListener('DOMContentLoaded', async () => {
    const logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', async function () {
        try {
            const response = await fetch('/logoutAdmin', {
                method: 'DELETE' // Atau sesuaikan dengan metode yang Anda gunakan
            });
            if (response.ok) {
                // Handle jika logout berhasil
                console.log('Logout berhasil');
                // Redirect ke halaman lain jika diperlukan
                window.location.href = '/login';
            } else {
                // Handle jika logout gagal
                console.error('Logout gagal');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    })

    try {
        const responseProfile = await fetch('/dataProfile',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const dataProfile = await responseProfile.json()
        console.log(dataProfile);
        if (dataProfile.success) {
            console.log(dataProfile);
            const h3 = document.getElementById('namaAdmin')
            h3.textContent = `${dataProfile.data.nama}`
            document.getElementById('username').value = dataProfile.data.username
            document.getElementById('nama').value = dataProfile.data.nama
            document.getElementById('email').value = dataProfile.data.email
            // console.log(dataProfile.data.foto, "asdasd");
            if (dataProfile.data.foto !== null || dataProfile.data.foto === "") {
                document.getElementById('pp').src=`/images/${dataProfile.data.foto}`
               
            }
        } else {
            Swal.fire({
                title: dataProfile.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const file = document.getElementById('fileInput')
        // console.log("filenya", file);
        const username = document.getElementById('username').value
        const nama = document.getElementById('nama').value
        console.log("namanya", nama);
        const email = document.getElementById('email').value
        // console.log("emailnya", email);
        const password = document.getElementById('password').value
        // console.log("passwordnya", password);
        const newPassword = document.getElementById('newPassword').value
        // console.log("newPasswordnyaaaaaaaaa", newPassword);

        const formData = new FormData()
        formData.append('file', file.files[0])
        formData.append('username', username)
        formData.append('nama', nama)
        formData.append('email', email)
        formData.append('passwordLama', password)
        formData.append('passwordBaru', newPassword)

        const response = await fetch('/updateProfile', {
            method: 'POST',
            body: formData,
        });


        const data = await response.json();
        if (data.success) {
            Swal.fire({
                title: data.message,
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Logika yang dijalankan saat tombol "OK" ditekan
                    location.reload(); // Melakukan reload halaman
                }
            })
        }else{
            Swal.fire({
                title: data.message,
                icon: "error"
            });
        }
    })
});