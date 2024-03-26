document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput').value;
    const dataInput = document.getElementById('dataInput').value;
    sendDataToServer(nameInput, dataInput);
});

function sendDataToServer(nameInput, dataInput) {
    const dataArray = dataInput.split(',').map(item => item.trim());
    const payload = {
        name: nameInput,
        data: dataArray
    };

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Data sent successfully!');
        document.getElementById('nameInput').value = '';
        document.getElementById('dataInput').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred while sending data!');
    });
}

// Memuat data dari server saat halaman dimuat
window.addEventListener('load', () => {
    fetchDataFromServer();
});

// Fungsi untuk mengambil data dari server
function fetchDataFromServer() {
    fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Tambahkan kode untuk menampilkan data di dalam HTML
        displayData(data);
    })
    .catch(error => {
        console.error('Error while fetching data:', error);
        alert('Error occurred while fetching data!');
    });
}

// Fungsi untuk menampilkan data di dalam HTML
function displayData(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = ''; // Mengosongkan container sebelum menambahkan data baru

    data.data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p>Name: ${item.name}</p><p>Data: ${item.data.join(', ')}</p>`;
        container.appendChild(div);
    });
}

