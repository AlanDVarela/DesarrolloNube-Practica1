const API_URL = "http://localhost:3000/api"; 

// Cargar Doctores (Index)
async function loadDoctors() {
    const container = document.getElementById('doctors-grid');
    if (!container) return;
    
    container.innerHTML = '<p>Cargando especialistas...</p>';

    try {
        const res = await fetch(`${API_URL}/doctors`);
        const doctors = await res.json();

        container.innerHTML = doctors.map(doc => `
            <div class="card">
                <img src="${doc.imageUrl}" alt="${doc.name}">
                <h3>${doc.name}</h3>
                <p style="color:#666">${doc.specialty}</p>
                <a href="booking.html?id=${doc._id}" class="btn">Reservar Cita</a>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p style="color:red">Error de conexión con la API (Backend apagado o CORS error)</p>';
        console.error(error);
    }
}

// Cargar Detalle Doctor (Booking)
async function loadBooking() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    try {
        const res = await fetch(`${API_URL}/doctors/${id}`);
        const doc = await res.json();
        
        document.getElementById('doc-name').innerText = doc.name;
        document.getElementById('doc-spec').innerText = doc.specialty;
        document.getElementById('doctorId').value = doc._id;
        
        const select = document.getElementById('timeSlot');
        select.innerHTML = doc.availableHours.map(h => `<option value="${h}">${h}</option>`).join('');
    } catch (e) { console.error(e); }
}

// Enviar Formulario
async function sendBooking(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    
    try {
        const res = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (res.ok) window.location.href = `success.html?name=${data.patientName}&time=${data.time}`;
        else alert('Error al reservar');
    } catch (error) { alert('Error de red'); }
}

// Router simple
if (document.getElementById('doctors-grid')) loadDoctors();
if (document.getElementById('booking-form')) {
    loadBooking();
    document.getElementById('booking-form').addEventListener('submit', sendBooking);
}
// Mostrar datos en success
if (window.location.pathname.includes('success.html')) {
    const p = new URLSearchParams(window.location.search);
    document.getElementById('success-msg').innerText = `Hola ${p.get('name')}, te esperamos a las ${p.get('time')}`;
}
