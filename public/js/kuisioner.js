document.addEventListener('DOMContentLoaded', async () => {
    try {
        const responsePertanyaan = await fetch('/tampilPertanyaan', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const dataPertanyaan = await responsePertanyaan.json()
        console.log(dataPertanyaan);
        if (dataPertanyaan.success) {
            const form = document.querySelector('form')
            let currentQuestionIndex = 0;
            let answers = JSON.parse(localStorage.getItem("dataPenilaian")) || []; 

            const showNextQuestion = () => {
                const pertanyaan = dataPertanyaan.data[currentQuestionIndex];

                pertanyaan.dataDetailPertanyaan.sort((a, b) => b.nilai_pilihan - a.nilai_pilihan);

                const fieldset = document.createElement('fieldset');
                fieldset.innerHTML = `
                    <div class="mt-5">
                        <p class="fw-bold">${pertanyaan.teks_pertanyaan}</p>
                        <div class="row row-cols-1 row-cols-md-4 g-4 mb-3">
                            <input type="radio" name="${pertanyaan.id_pertanyaan}" id="very-good-${currentQuestionIndex}" class="input-hidden" value="${pertanyaan.dataDetailPertanyaan[0].nilai_pilihan}"/>
                            <label for="very-good-${currentQuestionIndex}">
                                <div class="card-body">
                                    <img src="/img/4.png" alt="Sangat cepat" style="width: 70%;">
                                    <h6 class="card-title" style="font-weight: 600;">${pertanyaan.dataDetailPertanyaan[0].pilihan_kriteria}</h6>
                                </div>
                            </label>
                            <input type="radio" name="${pertanyaan.id_pertanyaan}" id="good-${currentQuestionIndex}" class="input-hidden" value="${pertanyaan.dataDetailPertanyaan[1].nilai_pilihan}"/>
                            <label for="good-${currentQuestionIndex}">
                                <div class="card-body">
                                    <img src="/img/3.png" alt="Sangat cepat" style="width: 70%;">
                                    <h6 class="card-title" style="font-weight: 600;">${pertanyaan.dataDetailPertanyaan[1].pilihan_kriteria}</h6>
                                </div>
                            </label>
                            <input type="radio" name="${pertanyaan.id_pertanyaan}" id="enough-${currentQuestionIndex}" class="input-hidden" value="${pertanyaan.dataDetailPertanyaan[2].nilai_pilihan}"/>
                            <label for="enough-${currentQuestionIndex}">
                                <div class="card-body">
                                    <img src="/img/2.png" alt="Sangat cepat" style="width: 70%;">
                                    <h6 class="card-title" style="font-weight: 600;">${pertanyaan.dataDetailPertanyaan[2].pilihan_kriteria}</h6>
                                </div>
                            </label>
                            <input type="radio" name="${pertanyaan.id_pertanyaan}" id="bad-${currentQuestionIndex}" class="input-hidden" value="${pertanyaan.dataDetailPertanyaan[3].nilai_pilihan}"/>
                            <label for="bad-${currentQuestionIndex}">
                                <div class="card-body">
                                    <img src="/img/1.png" alt="Sangat cepat" style="width: 70%;">
                                    <h6 class="card-title" style="font-weight: 600;">${pertanyaan.dataDetailPertanyaan[3].pilihan_kriteria}</h6>
                                </div>
                            </label>
                        </label>
                        </div>
                    </div>`;
                form.innerHTML = '';
                form.append(fieldset);

                restorePreviousAnswer();

                if (currentQuestionIndex !== 0) {
                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('mt-3', 'btn-group', 'gap-2');
                    buttonContainer.innerHTML = `
                        <button type="button" class="btn btn-danger" style="background-color:#015B7C" id="sebelumnya">Sebelumnya</button>
                    `;
                    form.append(buttonContainer);

                    // Mendengarkan klik tombol sebelumnya
                    const sebelumnyaButton = document.getElementById('sebelumnya');
                    sebelumnyaButton.addEventListener('click', () => {
                        currentQuestionIndex--;
                        showNextQuestion();
                    });
                }

                // Menambahkan tombol lanjut jika bukan pertanyaan terakhir
                if (currentQuestionIndex !== dataPertanyaan.data.length - 1) {
                    if (!document.getElementById('lanjut')) {
                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add('mb-3', 'btn');
                        buttonContainer.innerHTML = `
                            <button type="button" class="btn btn-danger" id="lanjut">Lanjut</button>
                        `;
                        form.append(buttonContainer);

                        const lanjutButton = document.getElementById('lanjut');
                        lanjutButton.addEventListener('click', () => {
                            const radioButtons = document.querySelectorAll(`input[name="${pertanyaan.id_pertanyaan}"]:checked`);
                            if (radioButtons.length > 0) {
                                saveAnswer(pertanyaan.id_pertanyaan);
                                currentQuestionIndex++;
                                showNextQuestion();
                            } else {
                                Swal.fire({
                                    title: "Silakan pilih jawaban terlebih dahulu!",
                                    timer: 7100,
                                    icon: "error"
                                });
                            }
                        });

                    }
                } else {
                    // Jika ini pertanyaan terakhir, tambahkan tombol selesai
                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('mb-3', 'btn');
                    buttonContainer.innerHTML = `
                        <button type="button" class="btn btn-danger" id="selesai">Selesai</button>
                    `;
                    form.append(buttonContainer);

                    // Mendengarkan klik tombol selesai
                    const selesaiButton = document.getElementById('selesai');
                    selesaiButton.addEventListener('click', () => {
                        const radioButtons = document.querySelectorAll(`input[name="${pertanyaan.id_pertanyaan}"]:checked`);
                        if (radioButtons.length > 0) {
                            saveAnswer(pertanyaan.id_pertanyaan);
                            window.location.href = "/aspirasiSaran";
                        } else {
                            Swal.fire({
                                title: "Silakan pilih jawaban terlebih dahulu!",
                                timer: 7100,
                                icon: "error"
                            });
                        }
                    });
                }
            };

            // Function untuk menyimpan jawaban ke local storage
            const saveAnswer = (idPertanyaan) => {
                const radioButtons = document.querySelectorAll(`input[name="${idPertanyaan}"]:checked`);
                if (radioButtons.length > 0) {
                    const nilaiPilihan = radioButtons[0].value;
                    answers[currentQuestionIndex] = {
                        id_pertanyaan: idPertanyaan,
                        nilai_pertanyaan: nilaiPilihan
                    };
                    localStorage.setItem("dataPenilaian", JSON.stringify(answers));
                }
            };

            // Function untuk mengembalikan jawaban pada pertanyaan sebelumnya
            const restorePreviousAnswer = () => {
                const previousAnswer = answers[currentQuestionIndex];
                if (previousAnswer) {
                    const radioButtons = document.querySelectorAll(`input[name="${previousAnswer.id_pertanyaan}"]`);
                    radioButtons.forEach((radioButton) => {
                        if (radioButton.value === previousAnswer.nilai_pertanyaan) {
                            radioButton.checked = true;
                        }
                    });
                }
            };

            // Tampilkan pertanyaan pertama
            showNextQuestion();
        }
    } catch (error) {
        console.error(error);
    }
});