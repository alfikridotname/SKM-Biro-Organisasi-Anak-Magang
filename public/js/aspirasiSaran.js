document.addEventListener('DOMContentLoaded', async () => {
    try {
        const email = localStorage.getItem('email')
        const usia = localStorage.getItem('usia')
        const jenjang_pendidikan = localStorage.getItem('jenjang_pendidikan')
        const jenis_kelamin = localStorage.getItem('jenis_kelamin')
        const nama = localStorage.getItem('nama')
        const pekerjaan = localStorage.getItem('pekerjaan')
        const penilaian = localStorage.getItem('dataPenilaian')
        let dataPenilaian = JSON.parse(penilaian)
        if (!email || !usia || !jenis_kelamin || !jenjang_pendidikan || !nama || !pekerjaan) {
            window.location.href = "/biodata"
        } else if (!penilaian) {
            window.location.href = "/kuisioner"
        } else {

            const lanjut = document.getElementById('lanjut')
            lanjut.addEventListener('click', async () => {
                try {
                    const saran = document.getElementById('aspirasisaran').value
                    const responsSurvey = await fetch('/addPenilaian', {
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
                            jenjang_pendidikan: jenjang_pendidikan,
                            saran: saran,
                            dataPenilaian: dataPenilaian
                        })
                    })
                    window.addEventListener('beforeunload', () => {
                        localStorage.removeItem("dataPenilaian");
                    });
                    
                    const selesaiButton = document.getElementById('lanjut');
                    selesaiButton.addEventListener('click', () => {
                        localStorage.removeItem("dataPenilaian");
                    });
                    const dataSurvei = await responsSurvey.json()
                    if (dataSurvei.success) {
                        Swal.fire({
                            title: dataSurvei.message,
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Logika yang dijalankan saat tombol "OK" ditekan
                                window.location.href="/thankyou" // Melakukan reload halaman
                            }
                        })
                    } else {
                        Swal.fire({
                            title: dataSurvei.message,
                            timer: 1500,
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            })
           

        }
    } catch (error) {
        console.error(error);
    }
})