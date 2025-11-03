const defaultConfig = {
    page_title: "Analisis Sentimen Publik – Film Sore: Istri dari Masa Depan",
    description: "Halaman ini menampilkan hasil analisis sentimen publik dari platform X (Twitter) mengenai film \"Sore: Istri dari Masa Depan.\" Data diperoleh melalui crawling tweet dan dikategorikan menjadi tiga jenis sentimen: positif, netral, dan negatif.",
    footer_text: "Dibuat oleh Ilham | Analisis Sentimen Publik FILM 2025",
    background_color: "#1E1E2F",
    accent_color: "#F5C518",
    positive_color: "#4CAF50",
    neutral_color: "#9E9E9E",
    negative_color: "#F44336",
    font_family: "Poppins",
    font_size: 16
};

// 1. Inisialisasi Chart.js
const ctx = document.getElementById('sentimentChart').getContext('2d');
const sentimentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Positif', 'Netral', 'Negatif'],
        datasets: [{
            data: [188, 726, 99],
            backgroundColor: [
                '#4CAF50',
                '#9E9E9E',
                '#F44336'
            ],
            borderColor: '#1E1E2F',
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                        family: 'Poppins'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 30, 47, 0.9)',
                titleColor: '#F5C518',
                bodyColor: '#FFFFFF',
                borderColor: '#F5C518',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} tweet (${percentage}%)`;
                    }
                }
            }
        }
    }
});

// 2. Logika Upload dan Download
let uploadedFile = null;

document.getElementById('fileUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const resultDiv = document.getElementById('fileResult');
    const downloadButton = document.getElementById('downloadButton');
    
    if (file) {
        uploadedFile = file;
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(2);
        
        // Memastikan tombol download ada di dalam div hasil dan ditampilkan
        resultDiv.innerHTML = `✅ File "${fileName}" berhasil diunggah (${fileSize} KB)<br>Dataset berisi 1013 tweet.<br>`;
        resultDiv.appendChild(downloadButton);
        resultDiv.style.display = 'block';
        downloadButton.style.display = 'inline-flex';
    }
});

function downloadFile() {
    if (uploadedFile) {
        const url = URL.createObjectURL(uploadedFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = uploadedFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Konfirmasi download visual
        const downloadButton = document.getElementById('downloadButton');
        const originalText = downloadButton.innerHTML;
        downloadButton.innerHTML = '✅ Downloaded!';
        downloadButton.style.background = 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
        
        setTimeout(() => {
            downloadButton.innerHTML = originalText;
            downloadButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)';
        }, 2000);
    }
}
// Membuat fungsi downloadFile dapat diakses secara global (karena dipanggil dari HTML)
window.downloadFile = downloadFile; 


// 3. Logika SDK (untuk penyesuaian/kostumisasi, jika Anda menggunakannya)
async function onConfigChange(config) {
    const pageTitle = config.page_title || defaultConfig.page_title;
    const description = config.description || defaultConfig.description;
    const footerText = config.footer_text || defaultConfig.footer_text;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const fontSize = config.font_size || defaultConfig.font_size;

    document.getElementById('pageTitle').textContent = pageTitle;
    document.getElementById('pageDescription').textContent = description;
    document.getElementById('footerText').textContent = footerText;

    document.body.style.fontFamily = `'${fontFamily}', sans-serif`;
    document.body.style.fontSize = `${fontSize}px`;
    
    const h1Elements = document.querySelectorAll('h1');
    h1Elements.forEach(el => {
        el.style.fontSize = `${fontSize * 2}px`;
    });

    const h2Elements = document.querySelectorAll('.card-title');
    h2Elements.forEach(el => {
        el.style.fontSize = `${fontSize * 1.5}px`;
    });

    const descriptionEl = document.querySelector('.description');
    descriptionEl.style.fontSize = `${fontSize}px`;

    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(el => {
        el.style.fontSize = `${fontSize * 0.9}px`;
    });

    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(el => {
        el.style.fontSize = `${fontSize * 2}px`;
    });
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                // Logika recolorables
                { get: () => config.background_color || defaultConfig.background_color, set: (value) => { config.background_color = value; window.elementSdk.setConfig({ background_color: value }); } },
                { get: () => config.accent_color || defaultConfig.accent_color, set: (value) => { config.accent_color = value; window.elementSdk.setConfig({ accent_color: value }); } },
                { get: () => config.positive_color || defaultConfig.positive_color, set: (value) => { config.positive_color = value; window.elementSdk.setConfig({ positive_color: value }); } },
                { get: () => config.neutral_color || defaultConfig.neutral_color, set: (value) => { config.neutral_color = value; window.elementSdk.setConfig({ neutral_color: value }); } },
                { get: () => config.negative_color || defaultConfig.negative_color, set: (value) => { config.negative_color = value; window.elementSdk.setConfig({ negative_color: value }); } }
            ],
            borderables: [],
            fontEditable: {
                get: () => config.font_family || defaultConfig.font_family,
                set: (value) => { config.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
            },
            fontSizeable: {
                get: () => config.font_size || defaultConfig.font_size,
                set: (value) => { config.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
            }
        }),
        mapToEditPanelValues: (config) => new Map([
            ["page_title", config.page_title || defaultConfig.page_title],
            ["description", config.description || defaultConfig.description],
            ["footer_text", config.footer_text || defaultConfig.footer_text]
        ])
    });
}