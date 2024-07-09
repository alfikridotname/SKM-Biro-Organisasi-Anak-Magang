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

    const cariHasil = document.getElementById('cariHasil')
    console.log(cariHasil);
    cariHasil.addEventListener('click', async function () {
        try {
            const periode_awal = document.getElementById('periode_awal').value
            const periode_akhir = document.getElementById('periode_akhir').value
            const responseHasilSurvey = await fetch('/tampilHasilSurvey', {
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
                const tableBody = document.querySelector('table tbody')

                tableBody.innerHTML = ''

                dataHasilSurvey.data.forEach((survei, index) => {
                    const newRow = document.createElement('tr');

                    newRow.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${survei.dataResponden.email}</td>
                        <td>${survei.dataResponden.jenis_kelamin}</td>
                        <td>${survei.dataResponden.usia}</td>
                        <td>${survei.dataResponden.jenjang_pendidikan}</td>
                        <td>${survei.dataResponden.pekerjaan}</td>
                        <td>${survei.hasil_akhir}</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" id_penilaian="${survei.id_penilaian}">
                                <g fill="none">
                                        <path
                                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path fill="black"
                                            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
                                    </g>
                            </svg>
                        </td>
                    `;

                    // Tambahkan baris baru ke dalam tabel
                    tableBody.appendChild(newRow);
                });

                // Ambil referensi ke semua tombol SVG yang menampilkan modal
                const modalTriggerBtns = document.querySelectorAll('[data-bs-toggle="modal"]');

                // Konversi NodeList menjadi array dan tambahkan event listener untuk menampilkan modal saat tombol diklik
                Array.from(modalTriggerBtns).forEach((modalTriggerBtn) => {
                    modalTriggerBtn.addEventListener('click', async function () {
                        // Dapatkan nilai ID penilaian dari atribut id_penilaian
                        const id_penilaian = this.getAttribute('id_penilaian');
                        try {
                            const responDetail = await fetch(`/detailHasilSurvey/${id_penilaian}`, {
                                method: 'GET'
                            })
                            const dataDetail = await responDetail.json()
                            console.log(dataDetail);
                            if (dataDetail.success) {
                                const tbody = document.getElementById('detail');
                                tbody.innerHTML = '';
                                dataDetail.data.forEach((detail, index) => {
                                    const newrow = document.createElement('tr');
                                    newrow.innerHTML = `
                                        <th scope="row">${index + 1}</th>
                                        <td>${detail.dataPertanyaan.teks_pertanyaan}</td>
                                        <td>${detail.nilai_pertanyaan}</td>`;
                                    tbody.appendChild(newrow);
                            
                                    const saran = document.getElementById('saran');
                                    if (detail.dataPenilaian.dataResponden.dataSaran && detail.dataPenilaian.dataResponden.dataSaran.length > 0) {
                                        saran.value = `${detail.dataPenilaian.dataResponden.dataSaran[0].saran_teks}`;
                                    } else {
                                        // Jika tidak ada saran, atur nilai saran.value menjadi string kosong atau teks alternatif
                                        saran.value = ""; // atau saran.value = "Tidak ada saran";
                                    }
                                });
                            }
                        } catch (error) {
                            console.error(error);
                        }

                        // Cari modal dengan ID yang sesuai dan tampilkan
                        const modal = document.getElementById('staticBackdrop');
                        const modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();
                    });
                });
                const myModalEl = document.getElementById('staticBackdrop');
                myModalEl.addEventListener('hidden.bs.modal', function (event) {
                    // Hapus backdrop secara manual
                    const backdrop = document.querySelector('.modal-backdrop');
                    backdrop.remove();
                });

            } else {
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