const DEVELOPER_BRANDING = Object.freeze({
    name: "Dream Career IT BD",
    description: "An IT & Digital Development Company"
});

const defaultWebsiteData = {
    doctor: {
        name: "Dr. AKM Lokman",
        title: "DHMS, MSc in Cytogenetics",
        specialty: "Homeopathic & Cytogenetics Specialist",
        description: "Providing modern and reliable homeopathic medical care with utmost dedication and clinical excellence.",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
        logo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
        phone: "01771770044",
        address: "Ground Floor, Pubali Bank, Poduar Bazar, Cumilla"
    },
    about: {
        biography: "Dr. AKM Lokman has completed DHMS in Homeopathic Medical Science and MSc in Cytogenetics. He is committed to offering effective and long-term therapeutic treatments to his patients.",
        aboutImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
        qualifications: "DHMS, MSc in Cytogenetics"
    },
    specializations: [
        { id: "sp1", title: "Homeopathic Treatment", description: "Effective homeopathic solutions for complex and chronic diseases.", status: true },
        { id: "sp2", title: "Cytogenetics Consultancy", description: "Hereditary and genetic health consultation services.", status: true }
    ],
    services: [
        { id: "srv1", name: "General Health Checkup & Consultation", description: "Comprehensive health evaluation and accurate prescription.", price: "Negotiable", status: true }
    ],
    faq: [
        { id: "f1", question: "What are the visiting hours?", answer: "Saturday to Thursday, 9:00 AM to 8:00 PM.", status: true }
    ],
    appointments: [],
    customSections: [],
    navigation: [
        { labelEn: "Home", labelBn: "হোম", link: "#hero", show: true },
        { labelEn: "About Me", labelBn: "আমার সম্পর্কে", link: "#about", show: true },
        { labelEn: "Specializations", labelBn: "বিশেষজ্ঞতা", link: "#specializations", show: true },
        { labelEn: "Services", labelBn: "সেবাসমূহ", link: "#services", show: true },
        { labelEn: "FAQ", labelBn: "জিজ্ঞাসা", link: "#faq", show: true },
        { labelEn: "Appointment", labelBn: "অ্যাপয়েন্টমেন্ট", link: "#appointment", show: true }
    ],
    translations: {
        en: {
            aboutTitle: "About Me",
            qualTitle: "Qualifications",
            specTitle: "Specializations",
            srvTitle: "Services",
            faqTitle: "Frequently Asked Questions",
            apptTitle: "Book an Appointment",
            bookBtn: "Book Appointment",
            nameLbl: "Full Name",
            phoneLbl: "Phone Number",
            emailLbl: "Email Address",
            dateLbl: "Preferred Date",
            timeLbl: "Preferred Time",
            msgLbl: "Symptoms / Message",
            submitBtn: "Confirm Appointment"
        },
        bn: {
            aboutTitle: "আমার সম্পর্কে",
            qualTitle: "শিক্ষাগত যোগ্যতা",
            specTitle: "বিশেষজ্ঞতা",
            srvTitle: "সেবাসমূহ",
            faqTitle: "সাধারণ জিজ্ঞাসা",
            apptTitle: "অ্যাপয়েন্টমেন্ট বুক করুন",
            bookBtn: "অ্যাপয়েন্টমেন্ট নিন",
            nameLbl: "সম্পূর্ণ নাম",
            phoneLbl: "মোবাইল নম্বর",
            emailLbl: "ইমেইল ঠিকানা",
            dateLbl: "তারিখ",
            timeLbl: "সময়",
            msgLbl: "সমস্যার বিবরণ",
            submitBtn: "অ্যাপয়েন্টমেন্ট কনফার্ম করুন"
        }
    },
    theme: {
        primaryColor: "#0284c7",
        backgroundColor: "#f8fafc",
        surfaceColor: "#ffffff",
        textColor: "#0f172a",
        mutedColor: "#64748b",
        borderRadius: "12px",
        shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
    }
};
