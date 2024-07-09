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

        const responseRiwayatSurvey = await fetch('/allRiwayatSurvey', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const dataRiwayatSurvey = await responseRiwayatSurvey.json()
        console.log(dataRiwayatSurvey);
        if (dataRiwayatSurvey.success) {

            const tableBody = document.querySelector('table tbody')

            tableBody.innerHTML = ''

            function formatDate(dateString) {
                const months = [
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];

                const [year, month, day] = dateString.split('-');
                const monthIndex = parseInt(month) - 1;

                return `${months[monthIndex]} ${year}`;
            }
            dataRiwayatSurvey.data.forEach((riwayat, index) => {
                const newRow = document.createElement('tr');

                // Set the data-id attribute with the criteria id
                newRow.innerHTML = `
                        <td>${index + 1}</td>
                        
            <td>${formatDate(riwayat.periode_awal)} - ${formatDate(riwayat.periode_akhir)}</td>
            
            <td>${riwayat.nilai_akhir_survey}</td>
            <td><a href="/doc/generate/${riwayat.file_skm}" download="${riwayat.file_skm}">${riwayat.file_skm}</a></td>            
                    `;

                // Tambahkan baris baru ke dalam tabel
                tableBody.appendChild(newRow);
            })
        } else {
            Swal.fire({
                title: dataRiwayatSurvey.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }

    const cariHasil = document.getElementById('cariHasil')
    console.log(cariHasil);
    cariHasil.addEventListener('click', async function () {
        try {
            const periode_awal = document.getElementById('periode_awal').value
            const periode_akhir = document.getElementById('periode_akhir').value
            const responseHasilSurvey = await fetch('/hasilKeseluruhan', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    periodeAwal: periode_awal,
                    periodeAkhir: periode_akhir
                })
            })
            const dataHasilSurvey = await responseHasilSurvey.json()
            console.log(dataHasilSurvey);
            if (dataHasilSurvey.success) {
                Swal.fire({
                    title: dataHasilSurvey.message,
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
                    title: dataHasilSurvey.message,
                    timer: 1500,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error(error);
        }
    })

});