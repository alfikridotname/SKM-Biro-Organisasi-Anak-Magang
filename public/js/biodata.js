document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const nama = document.getElementById('nama').value
        const email = document.getElementById('email').value
        const jenis_kelamin = document.getElementById('jenis_kelamin').value
        const usia = document.getElementById('usia').value
        const pekerjaan = document.getElementById('pekerjaan').value
        const jenjang_pendidikan = document.getElementById('pendidikan').value

        if (jenis_kelamin === "Pilih Jenis Kelamin") {
            Swal.fire({
                title: "pilih jenis kelamin yang benar",
                icon: "error"
            });
        } else if(usia === "Pilih Usia"){
            Swal.fire({
                title: "Pilih USIA yang benar",
                icon: "error"
            });
        } else if(pekerjaan === "Pilih Pekerjaan"){
            Swal.fire({
                title: "Pilih pekerjaan yang benar",
                icon: "error"
            });
        } else if(jenjang_pendidikan === "Pilih Jenjang Pendidikan"){
            Swal.fire({
                title: "Pilih jenjang pendidikan yang benar",
                icon: "error"
            });
        } 
        else {
            const deteksiResponden = await fetch('/deteksiResponden', {
                method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            nama: nama,
                            email: email,
                            jenis_kelamin: jenis_kelamin,
                            usia: usia,
                            pekerjaan: pekerjaan,
                            jenjang_pendidikan: jenjang_pendidikan
                        })
            })
            const statusResponden = await deteksiResponden.json()
            if (statusResponden.success) {
                localStorage.setItem('nama', nama);
                localStorage.setItem('email', email);
                localStorage.setItem('jenis_kelamin', jenis_kelamin);
                localStorage.setItem('usia', usia);
                localStorage.setItem('pekerjaan', pekerjaan);
                localStorage.setItem('jenjang_pendidikan', jenjang_pendidikan);
                window.location.href="/kuisioner"
            } else {
                Swal.fire({
                    title: statusResponden.message,
                    icon: "error"
                });
            }
           
        }
    })
})