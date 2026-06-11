// Kontak.js - Mengelola data kontak dan sosial media
let kontakData = {
    email: 'ahmad.fadillah@email.com',
    telepon: '+62 812 3456 7890',
    whatsapp: '+62 812 3456 7890',
    alamat: 'Jl. Merdeka No. 123, RT 01/RW 02, Kel. Kebon Jeruk, Kec. Tanah Abang, Jakarta Pusat, 10150',
    kodepos: '10150',
    facebook: 'https://facebook.com/ahmad.fadillah',
    instagram: 'https://instagram.com/ahmadfadillah',
    twitter: 'https://twitter.com/ahmadf',
    linkedin: 'https://linkedin.com/in/ahmad-fadillah',
    github: 'https://github.com/ahmadfadillah'
};

// Load data dari localStorage
function loadKontakData() {
    const saved = localStorage.getItem('kontakData');
    if (saved) {
        kontakData = JSON.parse(saved);
    }
    applyKontakDataToForm();
    updateVcardPreview();
}

// Apply ke form
function applyKontakDataToForm() {
    document.getElementById('email').value = kontakData.email;
    document.getElementById('telepon').value = kontakData.telepon;
    document.getElementById('whatsapp').value = kontakData.whatsapp;
    document.getElementById('alamat').value = kontakData.alamat;
    document.getElementById('kodepos').value = kontakData.kodepos;
    document.getElementById('facebook').value = kontakData.facebook;
    document.getElementById('instagram').value = kontakData.instagram;
    document.getElementById('twitter').value = kontakData.twitter;
    document.getElementById('linkedin').value = kontakData.linkedin;
    document.getElementById('github').value = kontakData.github;
}

// Update preview vCard
function updateVcardPreview() {
    const nama = localStorage.getItem('bioData') ? 
        JSON.parse(localStorage.getItem('bioData')).namaLengkap : 'Ahmad Fadillah';
    
    document.querySelector('.vcard-name').textContent = nama;
    document.querySelector('.vcard-email').textContent = kontakData.email;
    document.querySelector('.vcard-phone').textContent = kontakData.telepon;
}

// Simpan kontak
function saveKontak() {
    kontakData.email = document.getElementById('email').value;
    kontakData.telepon = document.getElementById('telepon').value;
    kontakData.whatsapp = document.getElementById('whatsapp').value;
    kontakData.alamat = document.getElementById('alamat').value;
    kontakData.kodepos = document.getElementById('kodepos').value;
    kontakData.facebook = document.getElementById('facebook').value;
    kontakData.instagram = document.getElementById('instagram').value;
    kontakData.twitter = document.getElementById('twitter').value;
    kontakData.linkedin = document.getElementById('linkedin').value;
    kontakData.github = document.getElementById('github').value;
    
    localStorage.setItem('kontakData', JSON.stringify(kontakData));
    updateVcardPreview();
    showNotification('✅ Kontak berhasil disimpan!');
}

// Reset kontak
function resetKontak() {
    kontakData = {
        email: 'ahmad.fadillah@email.com',
        telepon: '+62 812 3456 7890',
        whatsapp: '+62 812 3456 7890',
        alamat: 'Jl. Merdeka No. 123, RT 01/RW 02, Kel. Kebon Jeruk, Kec. Tanah Abang, Jakarta Pusat, 10150',
        kodepos: '10150',
        facebook: 'https://facebook.com/ahmad.fadillah',
        instagram: 'https://instagram.com/ahmadfadillah',
        twitter: 'https://twitter.com/ahmadf',
        linkedin: 'https://linkedin.com/in/ahmad-fadillah',
        github: 'https://github.com/ahmadfadillah'
    };
    localStorage.setItem('kontakData', JSON.stringify(kontakData));
    applyKontakDataToForm();
    updateVcardPreview();
    showNotification('🔄 Kontak telah direset!');
}

// Copy vCard
function copyVcard() {
    const nama = localStorage.getItem('bioData') ? 
        JSON.parse(localStorage.getItem('bioData')).namaLengkap : 'Ahmad Fadillah';
    
    const vcardText = `BEGIN:VCARD
VERSION:3.0
FN:${nama}
EMAIL:${kontakData.email}
TEL:${kontakData.telepon}
ADR:${kontakData.alamat}
URL-FACEBOOK:${kontakData.facebook}
URL-INSTAGRAM:${kontakData.instagram}
URL-LINKEDIN:${kontakData.linkedin}
URL-GITHUB:${kontakData.github}
END:VCARD`;
    
    navigator.clipboard.writeText(vcardText).then(() => {
        showNotification('📋 vCard berhasil disalin ke clipboard!');
    });
}

// Share kontak (Web Share API)
function shareContact() {
    const nama = localStorage.getItem('bioData') ? 
        JSON.parse(localStorage.getItem('bioData')).namaLengkap : 'Ahmad Fadillah';
    
    const shareData = {
        title: `Kontak ${nama}`,
        text: `Email: ${kontakData.email}\nTelepon: ${kontakData.telepon}\nAlamat: ${kontakData.alamat}`,
        url: kontakData.linkedin
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        showNotification('⚠️ Browser tidak support share, silakan copy manual');
    }
}

// Auto update preview saat input berubah
function setupLivePreview() {
    const inputs = ['email', 'telepon'];
    inputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => {
            kontakData[id] = document.getElementById(id).value;
            updateVcardPreview();
        });
    });
}

// Show notification
function showNotification(message) {
    const notif = document.getElementById('contactNotification');
    notif.textContent = message;
    notif.classList.remove('hidden');
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 3000);
}

// Event listeners
document.getElementById('saveContactBtn')?.addEventListener('click', saveKontak);
document.getElementById('resetContactBtn')?.addEventListener('click', resetKontak);
document.getElementById('copyVcardBtn')?.addEventListener('click', copyVcard);
document.getElementById('shareContactBtn')?.addEventListener('click', shareContact);

// Inisialisasi
loadKontakData();
setupLivePreview();