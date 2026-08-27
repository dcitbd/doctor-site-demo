let currentLang = localStorage.getItem('doctorpro_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('langSwitch');
    if (selector) selector.value = currentLang;
    renderWebsite();

    const appointmentForm = document.getElementById('publicAppointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = StorageManager.load();
            const newAppt = {
                id: 'app-' + Date.now(),
                name: document.getElementById('apptName').value,
                phone: document.getElementById('apptPhone').value,
                email: document.getElementById('apptEmail').value,
                date: document.getElementById('apptDate').value,
                time: document.getElementById('apptTime').value,
                message: document.getElementById('apptMessage').value,
                status: 'Pending',
                createdAt: new Date().toISOString().slice(0, 10)
            };
            if(!data.appointments) data.appointments = [];
            data.appointments.push(newAppt);
            StorageManager.save(data);
            alert(currentLang === 'bn' ? 'অ্যাপয়েন্টমেন্ট সফলভাবে জমা হয়েছে!' : 'Appointment submitted successfully!');
            appointmentForm.reset();
        });
    }
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('doctorpro_lang', lang);
    renderWebsite();
}

function renderWebsite() {
    const data = StorageManager.load();
    const t = data.translations && data.translations[currentLang] ? data.translations[currentLang] : {
        aboutTitle: "About Me", qualTitle: "Qualifications", specTitle: "Specializations", srvTitle: "Services", faqTitle: "Frequently Asked Questions", apptTitle: "Book an Appointment", bookBtn: "Book Appointment", nameLbl: "Full Name", phoneLbl: "Phone Number", emailLbl: "Email Address", dateLbl: "Preferred Date", timeLbl: "Preferred Time", msgLbl: "Symptoms / Message", submitBtn: "Confirm Appointment"
    };

    document.getElementById('aboutTitleText').innerText = t.aboutTitle;
    document.getElementById('qualTitleText').innerText = t.qualTitle;
    document.getElementById('specTitleText').innerText = t.specTitle;
    document.getElementById('srvTitleText').innerText = t.srvTitle;
    document.getElementById('faqTitleText').innerText = t.faqTitle;
    document.getElementById('apptTitleText').innerText = t.apptTitle;
    document.getElementById('ctaMain').innerText = t.bookBtn;
    document.getElementById('btnSubmitAppt').innerText = t.submitBtn;

    document.getElementById('lblName').innerText = t.nameLbl;
    document.getElementById('lblPhone').innerText = t.phoneLbl;
    document.getElementById('lblEmail').innerText = t.emailLbl;
    document.getElementById('lblDate').innerText = t.dateLbl;
    document.getElementById('lblTime').innerText = t.timeLbl;
    document.getElementById('lblMsg').innerText = t.msgLbl;

    if (data.doctor) {
        document.getElementById('brandLogo').innerHTML = `
            <img src="${data.doctor.logo || data.doctor.photo}" alt="Logo" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
            <span>${data.doctor.name}</span>
        `;
        document.getElementById('heroTitle').innerText = data.doctor.name;
        document.getElementById('heroSubtitle').innerText = data.doctor.title;
        document.getElementById('heroDescription').innerText = `${data.doctor.description}\n\n${currentLang === 'bn' ? 'ঠিকানা:' : 'Address:'} ${data.doctor.address}`;
        document.getElementById('heroImg').src = data.doctor.photo;
        document.getElementById('ctaSecondary').href = `tel:${data.doctor.phone}`;
        document.getElementById('ctaSecondary').innerText = data.doctor.phone;
    }

    const navMenu = document.getElementById('dynamicNavMenu');
    if (navMenu && data.navigation) {
        navMenu.innerHTML = data.navigation.filter(n => n.show !== false).map(n => `
            <a href="${n.link}">${currentLang === 'bn' ? n.labelBn : n.labelEn}</a>
        `).join('');
    }

    if (data.about) {
        document.getElementById('aboutBio').innerText = data.about.biography;
        document.getElementById('aboutQual').innerText = data.about.qualifications;
        document.getElementById('aboutImg').src = data.about.aboutImage;
    }

    const specContainer = document.getElementById('specializationsContainer');
    if (specContainer && data.specializations) {
        specContainer.innerHTML = data.specializations.filter(s => s.status !== false).map(s => `
            <div class="card">
                <h3>${s.title}</h3>
                <p style="color: var(--muted-color); margin-top: 0.5rem;">${s.description}</p>
            </div>
        `).join('');
    }

    const srvContainer = document.getElementById('servicesContainer');
    if (srvContainer && data.services) {
        srvContainer.innerHTML = data.services.filter(s => s.status !== false).map(s => `
            <div class="card">
                <h3>${s.name}</h3>
                <p style="color: var(--muted-color); margin: 0.5rem 0 1rem;">${s.description}</p>
                <strong style="color: var(--primary-color);">${s.price || ''}</strong>
            </div>
        `).join('');
    }

    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer && data.faq) {
        faqContainer.innerHTML = data.faq.filter(f => f.status !== false).map(f => `
            <div class="accordion-item">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <span>${f.question}</span>
                    <span>▼</span>
                </div>
                <div class="accordion-body">
                    <p>${f.answer}</p>
                </div>
            </div>
        `).join('');
    }

    const customContainer = document.getElementById('customSectionsContainer');
    if (customContainer && data.customSections) {
        customContainer.innerHTML = data.customSections.map(sec => `
            <section style="background: var(--surface-color); margin: 2rem auto; border-radius: var(--border-radius); padding: 3rem 2rem; max-width: 1200px;">
                <h2 class="section-title">${sec.title}</h2>
                <p class="section-subtitle">${sec.subtitle || ''}</p>
                <div style="padding: 1rem 0; font-size: 1.05rem; color: var(--muted-color);">${sec.content}</div>
            </section>
        `).join('');
    }

    const footerCredit = document.getElementById('developerCreditContainer');
    if (footerCredit) {
        footerCredit.innerHTML = `Developed by <span>${DEVELOPER_BRANDING.name}</span><br><small>${DEVELOPER_BRANDING.description}</small>`;
    }
}

function toggleAccordion(header) {
    header.parentElement.classList.toggle('active');
}