const StorageManager = {
    KEY: "doctorpro_website_data",
    init() {
        if (!localStorage.getItem(this.KEY)) {
            this.save(defaultWebsiteData);
        }
    },
    load() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : defaultWebsiteData;
        } catch (e) {
            return defaultWebsiteData;
        }
    },
    save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },
    exportData() {
        const data = this.load();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `doctorpro_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    },
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed && parsed.doctor) {
                    StorageManager.save(parsed);
                    alert('Backup restored successfully!');
                    window.location.reload();
                } else {
                    alert('Invalid backup file!');
                }
            } catch (err) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    },
    resetData() {
        if (confirm("Are you sure you want to reset all data to default?")) {
            localStorage.removeItem(this.KEY);
            this.init();
            window.location.reload();
        }
    }
};
StorageManager.init();