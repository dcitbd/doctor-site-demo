const LanguageManager = {
    currentLang: localStorage.getItem('doctorpro_lang') || 'bn',

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('doctorpro_lang', lang);
        document.documentElement.setAttribute('lang', lang);
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        if (typeof renderWebsite === 'function') {
            renderWebsite();
        }
    },

    translate(key) {
        const data = StorageManager.load();
        const dict = data.languageData || defaultWebsiteData.languageData;
        if (dict[this.currentLang] && dict[this.currentLang][key]) {
            return dict[this.currentLang][key];
        }
        return dict['en'] && dict['en'][key] ? dict['en'][key] : key;
    },

    init() {
        document.documentElement.setAttribute('lang', this.currentLang);
        const selector = document.getElementById('langSwitch');
        if (selector) {
            selector.value = this.currentLang;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LanguageManager.init();
});