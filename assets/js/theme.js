const ThemeManager = {
    applyTheme(theme) {
        const root = document.documentElement;
        if (!theme) return;
        root.style.setProperty('--primary-color', theme.primaryColor || '#0284c7');
        root.style.setProperty('--background-color', theme.backgroundColor || '#f8fafc');
        root.style.setProperty('--surface-color', theme.surfaceColor || '#ffffff');
        root.style.setProperty('--text-color', theme.textColor || '#0f172a');
        root.style.setProperty('--muted-color', theme.mutedColor || '#64748b');
    },
    init() {
        const data = StorageManager.load();
        if (data && data.theme) this.applyTheme(data.theme);
    }
};
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());