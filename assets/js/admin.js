document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadAdminDashboard();
    setupHeroForm();
    setupThemeForm();
});

function checkAdminAuth() {
    if (!sessionStorage.getItem('doctorpro_admin_logged')) {
        document.getElementById('adminLoginModal').style.display = 'flex';
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    if (document.getElementById('adminPasswordInput').value === 'admin123') {
        sessionStorage.setItem('doctorpro_admin_logged', 'true');
        document.getElementById('adminLoginModal').style.display = 'none';
        loadAdminDashboard();
    } else {
        document.getElementById('loginErrorMsg').innerText = 'Wrong password! (admin123)';
    }
}

function adminLogout() {
    sessionStorage.removeItem('doctorpro_admin_logged');
    window.location.reload();
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.admin-nav a').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).style.display = 'block';
    event.currentTarget.classList.add('active');

    if (tabId === 'services') loadAdminServices();
    if (tabId === 'specializations') loadAdminSpecializations();
    if (tabId === 'faq') loadAdminFAQ();
    if (tabId === 'appointments') loadAdminAppointments();
    if (tabId === 'navigation') loadAdminNavigation();
    if (tabId === 'customSections') loadAdminCustomSections();
    if (tabId === 'hero') loadHeroFormValues();
}

function loadAdminDashboard() {
    const data = StorageManager.load();
    document.getElementById('countServices').innerText = data.services ? data.services.length : 0;
    document.getElementById('countAppointments').innerText = data.appointments ? data.appointments.length : 0;
    document.getElementById('countSpecializations').innerText = data.specializations ? data.specializations.length : 0;
    document.getElementById('countFaq').innerText = data.faq ? data.faq.length : 0;
}

function loadHeroFormValues() {
    const data = StorageManager.load();
    document.getElementById('adminHeroName').value = data.doctor.name || '';
    document.getElementById('adminHeroTitle').value = data.doctor.title || '';
    document.getElementById('adminHeroDesc').value = data.doctor.description || '';
    document.getElementById('adminHeroPhoto').value = data.doctor.photo || '';
    document.getElementById('adminHeroLogo').value = data.doctor.logo || '';
    document.getElementById('adminHeroAddress').value = data.doctor.address || '';
}

function setupHeroForm() {
    const form = document.getElementById('heroForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = StorageManager.load();
            data.doctor.name = document.getElementById('adminHeroName').value;
            data.doctor.title = document.getElementById('adminHeroTitle').value;
            data.doctor.description = document.getElementById('adminHeroDesc').value;
            data.doctor.photo = document.getElementById('adminHeroPhoto').value;
            data.doctor.logo = document.getElementById('adminHeroLogo').value;
            data.doctor.address = document.getElementById('adminHeroAddress').value;
            StorageManager.save(data);
            alert('Updated successfully!');
        });
    }
}

// Specializations
function loadAdminSpecializations() {
    const data = StorageManager.load();
    let html = `
        <div class="card" style="margin-bottom:1.5rem;">
            <h4>Add New Specialization</h4>
            <form onsubmit="handleAddSpec(event)" style="display:grid; gap:0.75rem; margin-top:0.5rem;">
                <input type="text" id="specTitle" class="form-control" placeholder="Title" required>
                <input type="text" id="specDesc" class="form-control" placeholder="Description" required>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        <h4>Existing</h4>
    `;
    if (data.specializations) {
        data.specializations.forEach((s, idx) => {
            html += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <div><strong>${s.title}</strong><p style="color:var(--muted-color); font-size:0.9rem;">${s.description}</p></div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="editSpec(${idx})" class="btn btn-outline" style="padding:0.3rem 0.6rem;">Edit</button>
                    <button onclick="deleteSpec(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.3rem 0.6rem;">Delete</button>
                </div>
            </div>`;
        });
    }
    document.getElementById('specializationsAdminList').innerHTML = html;
}
function handleAddSpec(e) {
    e.preventDefault();
    const data = StorageManager.load();
    if (!data.specializations) data.specializations = [];
    data.specializations.push({ id: 'sp-' + Date.now(), title: document.getElementById('specTitle').value, description: document.getElementById('specDesc').value, status: true });
    StorageManager.save(data);
    loadAdminSpecializations();
    loadAdminDashboard();
}
function editSpec(idx) {
    const data = StorageManager.load();
    const s = data.specializations[idx];
    const newTitle = prompt("Edit Title:", s.title);
    const newDesc = prompt("Edit Description:", s.description);
    if (newTitle !== null && newDesc !== null) {
        data.specializations[idx].title = newTitle;
        data.specializations[idx].description = newDesc;
        StorageManager.save(data);
        loadAdminSpecializations();
    }
}
function deleteSpec(idx) {
    const data = StorageManager.load();
    data.specializations.splice(idx, 1);
    StorageManager.save(data);
    loadAdminSpecializations();
    loadAdminDashboard();
}

// Services
function loadAdminServices() {
    const data = StorageManager.load();
    let html = `
        <div class="card" style="margin-bottom:1.5rem;">
            <h4>Add New Service</h4>
            <form onsubmit="handleAddService(event)" style="display:grid; gap:0.75rem; margin-top:0.5rem;">
                <input type="text" id="srvName" class="form-control" placeholder="Service Name" required>
                <input type="text" id="srvDesc" class="form-control" placeholder="Description" required>
                <input type="text" id="srvPrice" class="form-control" placeholder="Price">
                <button type="submit" class="btn btn-primary">Add Service</button>
            </form>
        </div>
        <h4>Existing Services</h4>
    `;
    if (data.services) {
        data.services.forEach((s, idx) => {
            html += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <div><strong>${s.name}</strong> (${s.price || ''})<p style="color:var(--muted-color); font-size:0.9rem;">${s.description}</p></div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="deleteService(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.3rem 0.6rem;">Delete</button>
                </div>
            </div>`;
        });
    }
    document.getElementById('servicesAdminList').innerHTML = html;
}
function handleAddService(e) {
    e.preventDefault();
    const data = StorageManager.load();
    if (!data.services) data.services = [];
    data.services.push({ id: 'srv-' + Date.now(), name: document.getElementById('srvName').value, description: document.getElementById('srvDesc').value, price: document.getElementById('srvPrice').value, status: true });
    StorageManager.save(data);
    loadAdminServices();
    loadAdminDashboard();
}
function deleteService(idx) {
    const data = StorageManager.load();
    data.services.splice(idx, 1);
    StorageManager.save(data);
    loadAdminServices();
    loadAdminDashboard();
}

// FAQ
function loadAdminFAQ() {
    const data = StorageManager.load();
    let html = `
        <div class="card" style="margin-bottom:1.5rem;">
            <h4>Add New FAQ</h4>
            <form onsubmit="handleAddFAQ(event)" style="display:grid; gap:0.75rem; margin-top:0.5rem;">
                <input type="text" id="faqQ" class="form-control" placeholder="Question" required>
                <textarea id="faqA" class="form-control" placeholder="Answer" rows="2" required></textarea>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        <h4>Existing</h4>
    `;
    if (data.faq) {
        data.faq.forEach((f, idx) => {
            html += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <div><strong>Q: ${f.question}</strong><p style="color:var(--muted-color); font-size:0.9rem;">A: ${f.answer}</p></div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="editFAQ(${idx})" class="btn btn-outline" style="padding:0.3rem 0.6rem;">Edit</button>
                    <button onclick="deleteFAQ(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.3rem 0.6rem;">Delete</button>
                </div>
            </div>`;
        });
    }
    document.getElementById('faqAdminList').innerHTML = html;
}
function handleAddFAQ(e) {
    e.preventDefault();
    const data = StorageManager.load();
    if (!data.faq) data.faq = [];
    data.faq.push({ id: 'faq-' + Date.now(), question: document.getElementById('faqQ').value, answer: document.getElementById('faqA').value, status: true });
    StorageManager.save(data);
    loadAdminFAQ();
    loadAdminDashboard();
}
function editFAQ(idx) {
    const data = StorageManager.load();
    const f = data.faq[idx];
    const newQ = prompt("Edit Question:", f.question);
    const newA = prompt("Edit Answer:", f.answer);
    if (newQ !== null && newA !== null) {
        data.faq[idx].question = newQ;
        data.faq[idx].answer = newA;
        StorageManager.save(data);
        loadAdminFAQ();
    }
}
function deleteFAQ(idx) {
    const data = StorageManager.load();
    data.faq.splice(idx, 1);
    StorageManager.save(data);
    loadAdminFAQ();
    loadAdminDashboard();
}

// Custom Sections
function loadAdminCustomSections() {
    const data = StorageManager.load();
    let html = `
        <div class="card" style="margin-bottom:1.5rem;">
            <h4>Add New Section</h4>
            <form onsubmit="handleAddCustomSec(event)" style="display:grid; gap:0.75rem; margin-top:0.5rem;">
                <input type="text" id="secTitle" class="form-control" placeholder="Title" required>
                <textarea id="secContent" class="form-control" placeholder="Content" rows="3" required></textarea>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        <h4>Existing</h4>
    `;
    if (data.customSections) {
        data.customSections.forEach((sec, idx) => {
            html += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <div><strong>${sec.title}</strong></div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="editCustomSec(${idx})" class="btn btn-outline" style="padding:0.3rem 0.6rem;">Edit</button>
                    <button onclick="deleteCustomSec(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.3rem 0.6rem;">Delete</button>
                </div>
            </div>`;
        });
    }
    document.getElementById('customSectionsAdminList').innerHTML = html;
}
function handleAddCustomSec(e) {
    e.preventDefault();
    const data = StorageManager.load();
    if (!data.customSections) data.customSections = [];
    data.customSections.push({ title: document.getElementById('secTitle').value, content: document.getElementById('secContent').value });
    StorageManager.save(data);
    loadAdminCustomSections();
}
function editCustomSec(idx) {
    const data = StorageManager.load();
    const sec = data.customSections[idx];
    const newTitle = prompt("Edit Title:", sec.title);
    const newContent = prompt("Edit Content:", sec.content);
    if (newTitle !== null && newContent !== null) {
        data.customSections[idx].title = newTitle;
        data.customSections[idx].content = newContent;
        StorageManager.save(data);
        loadAdminCustomSections();
    }
}
function deleteCustomSec(idx) {
    const data = StorageManager.load();
    data.customSections.splice(idx, 1);
    StorageManager.save(data);
    loadAdminCustomSections();
}

// Appointments with Print & CSV
function loadAdminAppointments() {
    const data = StorageManager.load();
    let html = `
        <div style="margin-bottom: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button onclick="exportAppointmentsCSV()" class="btn btn-primary">Download CSV / Excel</button>
            <button onclick="printAppointments()" class="btn btn-outline">Print Appointments</button>
        </div>
    `;
    if (data.appointments) {
        data.appointments.forEach((a, idx) => {
            let bgStyle = "background: var(--surface-color);";
            if (a.status === 'Confirmed') bgStyle = "background: #f0fdf4; border-left: 5px solid #22c55e;";
            if (a.status === 'Completed') bgStyle = "background: #f0f9ff; border-left: 5px solid #0ea5e9;";
            if (a.status === 'Cancelled') bgStyle = "background: #fef2f2; border-left: 5px solid #ef4444;";
            if (a.status === 'Pending') bgStyle = "background: #fefce8; border-left: 5px solid #eab308;";

            html += `
                <div class="card" style="margin-bottom: 1rem; ${bgStyle} display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h4>${a.name} (${a.phone})</h4>
                        <p style="color: var(--muted-color); font-size: 0.9rem;">Email: ${a.email} | Date: ${a.date} | Time: ${a.time}</p>
                        <p style="margin-top: 0.25rem;">Message: ${a.message || 'None'}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <select onchange="updateAppointmentStatus(${idx}, this.value)" class="form-control" style="padding: 0.4rem; font-size: 0.85rem;">
                            <option value="Pending" ${a.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Confirmed" ${a.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Completed" ${a.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Cancelled" ${a.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                        <button onclick="deleteAppointment(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.4rem 0.8rem;">Delete</button>
                    </div>
                </div>
            `;
        });
    }
    document.getElementById('appointmentsAdminList').innerHTML = html;
}
function updateAppointmentStatus(idx, val) {
    const data = StorageManager.load();
    data.appointments[idx].status = val;
    StorageManager.save(data);
    loadAdminAppointments();
}
function deleteAppointment(idx) {
    const data = StorageManager.load();
    data.appointments.splice(idx, 1);
    StorageManager.save(data);
    loadAdminAppointments();
    loadAdminDashboard();
}

function printAppointments() {
    const data = StorageManager.load();
    if (!data.appointments || data.appointments.length === 0) {
        alert('No appointments to print!');
        return;
    }
    let printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Appointments Report</title>');
    printWindow.document.write('<style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;margin-top:20px;} th,td{border:1px solid #ddd;padding:8px;text-align:left;} th{background:#0284c7;color:white;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Patient Appointments List</h2>');
    printWindow.document.write('<table><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Date</th><th>Time</th><th>Status</th><th>Message</th></tr></thead><tbody>');
    data.appointments.forEach(a => {
        printWindow.document.write(`<tr><td>${a.name}</td><td>${a.phone}</td><td>${a.email}</td><td>${a.date}</td><td>${a.time}</td><td>${a.status}</td><td>${a.message || ''}</td></tr>`);
    });
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
}

function loadAdminNavigation() {
    const data = StorageManager.load();
    let html = `
        <div class="card" style="margin-bottom:1.5rem;">
            <h4>Add New Menu</h4>
            <form onsubmit="handleAddNav(event)" style="display:grid; gap:0.75rem; margin-top:0.5rem;">
                <input type="text" id="navEn" class="form-control" placeholder="Label (English)" required>
                <input type="text" id="navBn" class="form-control" placeholder="Label (বাংলা)" required>
                <input type="text" id="navLink" class="form-control" placeholder="Link (e.g. #services)" required>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        <h4>Existing Menus</h4>
    `;
    if (data.navigation) {
        data.navigation.forEach((n, idx) => {
            html += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <div><strong>${n.labelEn} / ${n.labelBn}</strong> (${n.link})</div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="editNav(${idx})" class="btn btn-outline" style="padding:0.3rem 0.6rem;">Edit</button>
                    <button onclick="deleteNav(${idx})" class="btn btn-outline" style="border-color:#ef4444; color:#ef4444; padding:0.3rem 0.6rem;">Delete</button>
                </div>
            </div>`;
        });
    }
    document.getElementById('navigationAdminList').innerHTML = html;
}
function handleAddNav(e) {
    e.preventDefault();
    const data = StorageManager.load();
    if (!data.navigation) data.navigation = [];
    data.navigation.push({ labelEn: document.getElementById('navEn').value, labelBn: document.getElementById('navBn').value, link: document.getElementById('navLink').value, show: true });
    StorageManager.save(data);
    loadAdminNavigation();
}
function editNav(idx) {
    const data = StorageManager.load();
    const n = data.navigation[idx];
    const newEn = prompt("Edit English Label:", n.labelEn);
    const newBn = prompt("Edit Bangla Label:", n.labelBn);
    const newLink = prompt("Edit Link:", n.link);
    if (newEn !== null && newBn !== null && newLink !== null) {
        data.navigation[idx].labelEn = newEn;
        data.navigation[idx].labelBn = newBn;
        data.navigation[idx].link = newLink;
        StorageManager.save(data);
        loadAdminNavigation();
    }
}
function deleteNav(idx) {
    const data = StorageManager.load();
    data.navigation.splice(idx, 1);
    StorageManager.save(data);
    loadAdminNavigation();
}

function setupThemeForm() {
    const form = document.getElementById('themeForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = StorageManager.load();
            data.theme.primaryColor = document.getElementById('themePrimary').value;
            data.theme.backgroundColor = document.getElementById('themeBg').value;
            StorageManager.save(data);
            ThemeManager.applyTheme(data.theme);
            alert('Theme updated!');
        });
    }
}

function exportAppointmentsCSV() {
    const data = StorageManager.load();
    let csvContent = "data:text/csv;charset=utf-8,Name,Phone,Email,Date,Time,Status,Message\n";
    if (data.appointments) {
        data.appointments.forEach(a => {
            csvContent += `"${a.name}","${a.phone}","${a.email}","${a.date}","${a.time}","${a.status}","${(a.message||'').replace(/"/g,'""')}"\n`;
        });
    }
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `appointments.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
