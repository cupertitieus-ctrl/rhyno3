// =============================================
// Ryhno - Main Script (Rebranded + Enhanced)
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    openPage('home-page');
    
    const savedWallpaper = localStorage.getItem('selectedWallpaper') || 'nightfall';
    changeWallpaper(savedWallpaper);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('theme', savedTheme);
    }

    // ==================== IMPROVED ABOUT:BLANK CLOAKING ====================
    if (localStorage.getItem("aboutblankEnabled") === "true") {
        let isFramed = true;
        try {
            isFramed = window !== top;
        } catch (e) {
            isFramed = true;
        }

        if (!isFramed) {
            const popup = window.open("about:blank", "_blank");
            
            if (popup) {
                const doc = popup.document;
                doc.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Google Classroom</title>
                        <style>
                            body, html { 
                                margin: 0; 
                                padding: 0; 
                                height: 100%; 
                                overflow: hidden; 
                                background: #ffffff; 
                            }
                            iframe { 
                                width: 100vw; 
                                height: 100vh; 
                                border: none; 
                            }
                        </style>
                    </head>
                    <body>
                        <iframe src="${window.location.href}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"></iframe>
                        <script>
                            history.replaceState({}, "Google Classroom", "https://classroom.google.com");
                        <\/script>
                    </body>
                    </html>
                `);
                doc.close();
                
                // Close original tab for better stealth
                setTimeout(() => window.close(), 600);
            } else {
                console.warn("Ryhno: Popup blocked by browser.");
            }
        }
    }

    // Tab Cloaking from localStorage
    let tabData = {};
    const savedTab = localStorage.getItem('tab');
    if (savedTab) {
        try {
            tabData = JSON.parse(savedTab);
        } catch (e) {}
    }

    if (tabData.title) document.title = tabData.title;
    if (tabData.icon) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) favicon.href = tabData.icon;
    }

    document.querySelector('.tab-link').click();

    // Proxy Status
    const proxyBackend = localStorage.getItem("proxy-backend") || 'ultraviolet';
    const statusEl = document.getElementById('proxy-status');
    if (statusEl) {
        statusEl.innerHTML = proxyBackend === "dynamic" 
            ? `<p>Using <b style="color: var(--blue);">Dynamic</b></p>`
            : `<p>Using <b style="color: var(--blue);">Ultraviolet</b></p>`;
    }

    // About Blank Toggle Buttons
    const aboutblankEnabled = localStorage.getItem('aboutblankEnabled');
    if (aboutblankEnabled === 'true' || aboutblankEnabled === '' || aboutblankEnabled === null) {
        const enableBtn = document.getElementById('enableAboutBlank');
        const disableBtn = document.getElementById('disableAboutBlank');
        if (enableBtn) enableBtn.disabled = true;
        if (disableBtn) disableBtn.disabled = false;
    }

    // Input Focus Effects
    const uvForm = document.getElementById('uv-form');
    if (uvForm) {
        const formInputs = uvForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => uvForm.classList.add('focused'));
            input.addEventListener('blur', () => uvForm.classList.remove('focused'));
        });
    }

    // Rest of your original code (games, AI, particles, etc.)
    // ... [I kept everything else unchanged below]
});

// ==================== REST OF YOUR ORIGINAL CODE ====================

// Particles, Games, AI, etc. (unchanged except small fixes)
let particlesActive = localStorage.getItem('particlesActive') === 'true';

function loadParticles() {
    // ... your particles code
}

// Tab Cloak Functions (Improved)
const settingsDefaultTab = {
    title: "Ryhno",
    icon: "./assets/ryhno-logo.svg"
};

function setTitle(title = "") {
    document.title = title || settingsDefaultTab.title;
    saveTabData({ title: document.title });
}

function setFavicon(icon) {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = icon || settingsDefaultTab.icon;
    saveTabData({ icon: favicon ? favicon.href : settingsDefaultTab.icon });
}

function saveTabData(newData) {
    let tabData = {};
    const saved = localStorage.getItem("tab");
    if (saved) {
        try { tabData = JSON.parse(saved); } catch(e){}
    }
    Object.assign(tabData, newData);
    localStorage.setItem("tab", JSON.stringify(tabData));
}

function setCloak(cloak) {
    switch (cloak) {
        case "canvas":
            setTitle("Dashboard");
            setFavicon("./assets/tab-logos/canvas.png");
            location.reload();
            break;
        case "google-classroom":
            setTitle("Classes");
            setFavicon("./assets/tab-logos/classroom.png");
            location.reload();
            break;
        case "google":
            setTitle("Google");
            setFavicon("./assets/tab-logos/google.ico");
            location.reload();
            break;
        case "google-drive":
            setTitle("Google Drive");
            setFavicon("./assets/tab-logos/googledrive.png");
            location.reload();
            break;
        case "khan-academy":
            setTitle("Khan Academy");
            setFavicon("./assets/tab-logos/khanacademy.png");
            location.reload();
            break;
    }
}

function resetTab() {
    document.title = settingsDefaultTab.title;
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = settingsDefaultTab.icon;
    localStorage.setItem("tab", JSON.stringify({}));
}

// Enable / Disable About:Blank
function enableAboutBlank() {
    localStorage.setItem('aboutblankEnabled', 'true');
    location.reload();
}

function disableAboutBlank() {
    localStorage.setItem('aboutblankEnabled', 'false');
    location.reload();
}

// Keep all your other functions (openPage, addGameTab, AI chat, games, etc.) as they are...
// I only updated the critical parts above.

console.log("%cRyhno loaded successfully ✅", "color: #0F172A; font-weight: bold;");
