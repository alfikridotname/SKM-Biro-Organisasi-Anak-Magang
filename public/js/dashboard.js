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

    //jenis_kelamin
    try {
        const totalResponden = await fetch('/totalResponden', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const dataTotalResponden = await totalResponden.json()
        console.log(dataTotalResponden);
        if (dataTotalResponden.success) {
            const chartJenisKelamin = document.getElementById('jenis_kelamin')

            chartJenisKelamin.innerHTML = ''
            const a = ["Laki-laki", "Perempuan"];
            const b = [`${dataTotalResponden.totalLaki}`, `${dataTotalResponden.totalPerempuan}`];
            const warnaA = [
                "#2D8BBA",
                "#F4B9B8"
            ];

            new Chart("jenis_kelamin", {
                type: "pie",
                data: {
                    labels: a,
                    datasets: [{
                        backgroundColor: warnaA,
                        data: b
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Total Responden"
                    }
                }
            });
        } else {
            Swal.fire({
                title: dataTotalResponden.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }

    // usia
    try {
        const totalUsiaResponden = await fetch('/usiaResponden', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const dataTotalUsiaResponden = await totalUsiaResponden.json()
        if (dataTotalUsiaResponden.success) {
            //   console.log(dataTotalUsiaResponden);  
            const chartUsia = document.getElementById('usia')

            chartUsia.innerHTML = ''
            const c = ["15 s.d. 25", "26 s.d. 35", "36 s.d. 50", "51 s.d. 60", ];
            const d = [dataTotalUsiaResponden[1525], dataTotalUsiaResponden[2635], dataTotalUsiaResponden[3650], dataTotalUsiaResponden[5160]];
            const warnaB = [
                "#938E77",
                "#5E3967",
                "#DCC5AF",
                "#B56C49"
            ];

            new Chart("usia", {
                type: "pie",
                data: {
                    labels: c,
                    datasets: [{
                        backgroundColor: warnaB,
                        data: d
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Usia Responden"
                    }
                }
            });
        } else {
            Swal.fire({
                title: dataTotalUsiaResponden.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }

    // pendidikan
    try {
        const totalPendidikan = await fetch('/totalPendidikan', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const dataTotalPendidikan = await totalPendidikan.json()
        if (dataTotalPendidikan.success) {
            console.log(dataTotalPendidikan);
            const chartPendidikan = document.getElementById('pendidikan')

            chartPendidikan.innerHTML = ''
            const e = ["S2 Keatas", "SD/SLTP", "SLTA", "D1/D2/D3", "D4/S1"];
            const f = [`${dataTotalPendidikan.s2}`, `${dataTotalPendidikan.SD}`, `${dataTotalPendidikan.SLTA}`, `${dataTotalPendidikan.diploma}`, `${dataTotalPendidikan.sarjana}`];
            const warnaC = [
                "#1D366D",
                "#64C2E4",
                "#B14145",
                "#F8F1E0",
                "#2E6095"
            ];

            new Chart("pendidikan", {
                type: "pie",
                data: {
                    labels: e,
                    datasets: [{
                        backgroundColor: warnaC,
                        data: f
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Jenjang Pendidikan"
                    }
                }
            });

        } else {
            Swal.fire({
                title: dataTotalPendidikan.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }

    // pekerjaan
    try {
        const totalPekerjaan = await fetch('/totalPekerjaan', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const dataTotalPekerjaan = await totalPekerjaan.json()
        if (dataTotalPekerjaan.success) {
            console.log(dataTotalPekerjaan);
            const chartPekerjaan = document.getElementById('pekerjaan')
            chartPekerjaan.innerHTML = ''
            const g = ["Lainnya", "PNS/POLRI/TNI/PPPK", "WIRASWASTA", "SWASTA", "Pelajar/Mahasiswa"];
            const h = [`${dataTotalPekerjaan.lainnya}`, `${dataTotalPekerjaan.pns}`, `${dataTotalPekerjaan.wiraswasta}`, `${dataTotalPekerjaan.swasta}`, `${dataTotalPekerjaan.pelajar}`];
            const warnaD = [
                "#FF974C",
                "#FFD964",
                "#4A544A",
                "#849D64",
                "#EBE6E6"
            ];

            new Chart("pekerjaan", {
                type: "pie",
                data: {
                    labels: g,
                    datasets: [{
                        backgroundColor: warnaD,
                        data: h
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Pekerjaan Responden"
                    }
                }
            });
        } else {
            Swal.fire({
                title: dataTotalPekerjaan.message,
                timer: 1500,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error);
    }



});