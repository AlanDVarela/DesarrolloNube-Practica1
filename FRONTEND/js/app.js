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

    const dateInput = document.getElementById('date');

    const setOptions = (doc) => {
        document.getElementById('doc-name').innerText = doc.name;
        document.getElementById('doc-spec').innerText = doc.specialty;
        document.getElementById('doctorId').value = doc._id;

        const select = document.getElementById('timeSlot');
        if (!doc.availableHours || doc.availableHours.length === 0) {
            select.innerHTML = '<option disabled>Ningún horario disponible</option>';
        } else {
            select.innerHTML = doc.availableHours.map(h => `<option value="${h}">${h}</option>`).join('');
        }
    };

    const loadForDate = async (date) => {
        try {
            const res = await fetch(`${API_URL}/doctors/${id}?date=${date}`);
            if (!res.ok) {
                console.error('Error cargando disponibilidad');
                return;
            }
            const doc = await res.json();
            setOptions(doc);
        } catch (e) { console.error(e); }
    };

    // set default date to today
    const today = new Date().toISOString().slice(0,10);
    if (dateInput) dateInput.value = today;
    await loadForDate(today);

    if (dateInput) dateInput.addEventListener('change', (e) => {
        const d = e.target.value;
        loadForDate(d);
    });
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
        if (res.ok) window.location.href = `success.html?name=${data.patientName}&date=${data.date}&time=${data.time}`;
        else if (res.status === 409) alert('Horario ya reservado');
        else {
            const err = await res.json().catch(()=>null);
            alert(err?.message || 'Error al reservar');
        }
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
    const name = p.get('name');
    const time = p.get('time');
    const date = p.get('date');
    document.getElementById('success-msg').innerText = date
        ? `Hola ${name}, te esperamos el ${date} a las ${time}`
        : `Hola ${name}, te esperamos a las ${time}`;
}
