// Biodata Diri - Fungsi untuk mengelola data pribadi
let bioData = {
    namaLengkap: 'Ahmad Fadillah',
    namaPanggilan: 'Ahmad',
    ttl: 'Jakarta, 15 Mei 1998',
    jenisKelamin: 'Laki-laki',
    goldar: 'O',
    agama: 'Islam',
    status: 'Belum Menikah',
    pekerjaan: 'Web Developer',
    avatar: null
};

// Load data dari localStorage
function loadBioData() {
    const saved = localStorage.getItem('bioData');
    if (saved) {
        bioData = JSON.parse(saved);
        applyBioDataToForm();
    }
    updateStats();
}

// Apply data ke form
function applyBioDataToForm() {
    document.getElementById('namaLengkap').value = bioData.namaLengkap;
    document.getElementById('namaPanggilan').value = bioData.namaPanggilan;
    document.getElementById('ttl').value = bioData.ttl;
    document.getElementById('jenisKelamin').value = bioData.jenisKelamin;
    document.getElementById('goldar').value = bioData.goldar;
    document.getElementById('agama').value = bioData.agama;
    document.getElementById('status').value = bioData.status;
    document.getElementById('pekerjaan').value = bioData.pekerjaan;
    
    if (bioData.avatar) {
        const avatarDiv = document.getElementById('avatarPreview');
        avatarDiv.innerHTML = `<img src="${bioData.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    }
}

// Hitung usia dari tanggal lahir
function hitungUsia(ttl) {
    const ttlMatch = ttl.match(/(\d+)\s+(\w+)\s+(\d+)/);
    if (ttlMatch) {
        const tahun = parseInt(ttlMatch[3]);
        const sekarang = new Date().getFullYear();
        return sekarang - tahun;
    }
    return '--';
}

// Update statistik
function updateStats() {
    const usia = hitungUsia(bioData.ttl);
    document.getElementById('usiaDisplay').textContent = `${usia} tahun`;
    document.getElementById('statusDisplay').textContent = bioData.status;
    document.getElementById('pekerjaanDisplay').textContent = bioData.pekerjaan;
}

// Simpan biodata
function saveBiodata() {
    bioData.namaLengkap = document.getElementById('namaLengkap').value;
    bioData.namaPanggilan = document.getElementById('namaPanggilan').value;
    bioData.ttl = document.getElementById('ttl').value;
    bioData.jenisKelamin = document.getElementById('jenisKelamin').value;
    bioData.goldar = document.getElementById('goldar').value;
    bioData.agama = document.getElementById('agama').value;
    bioData.status = document.getElementById('status').value;
    bioData.pekerjaan = document.getElementById('pekerjaan').value;
    
    localStorage.setItem('bioData', JSON.stringify(bioData));
    updateStats();
    
    showNotification('✅ Biodata berhasil disimpan!');
}

// Reset biodata ke default
function resetBiodata() {
    bioData = {
        namaLengkap: 'Ahmad Fadillah',
        namaPanggilan: 'Ahmad',
        ttl: 'Jakarta, 15 Mei 1998',
        jenisKelamin: 'Laki-laki',
        goldar: 'O',
        agama: 'Islam',
        status: 'Belum Menikah',
        pekerjaan: 'Web Developer',
        avatar: null
    };
    localStorage.setItem('bioData', JSON.stringify(bioData));
    applyBioDataToForm();
    updateStats();
    showNotification('🔄 Data telah direset ke default!');
}

// Export sebagai teks (simulasi PDF)
function exportBiodata() {
    const content = `
BIODATA DIRI
================================
Nama Lengkap: ${bioData.namaLengkap}
Nama Panggilan: ${bioData.namaPanggilan}
Tempat/Tanggal Lahir: ${bioData.ttl}
Jenis Kelamin: ${bioData.jenisKelamin}
Golongan Darah: ${bioData.goldar}
Agama: ${bioData.agama}
Status: ${bioData.status}
Pekerjaan: ${bioData.pekerjaan}
Usia: ${hitungUsia(bioData.ttl)} tahun
    `;
    
    const blob = new Blob([content], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'biodata.txt';
    link.click();
    URL.revokeObjectURL(link.href);
    
    showNotification('📄 Biodata telah diekspor!');
}

// Upload avatar
function setupAvatarUpload() {
    const changeBtn = document.getElementById('changeAvatarBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarPreview = document.getElementById('avatarPreview');
    
    changeBtn.addEventListener('click', () => {
        avatarUpload.click();
    });
    
    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgData = event.target.result;
                bioData.avatar = imgData;
                localStorage.setItem('bioData', JSON.stringify(bioData));
                avatarPreview.innerHTML = `<img src="${imgData}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
                showNotification('🖼️ Avatar berhasil diubah!');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Show notification
function showNotification(message) {
    const notif = document.getElementById('saveNotification');
    notif.textContent = message;
    notif.classList.remove('hidden');
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 3000);
}

// Event listeners
document.getElementById('saveBioBtn')?.addEventListener('click', saveBiodata);
document.getElementById('resetBioBtn')?.addEventListener('click', resetBiodata);
document.getElementById('exportBioBtn')?.addEventListener('click', exportBiodata);

// Inisialisasi
loadBioData();
setupAvatarUpload();

// Auto update stats saat input berubah
document.getElementById('ttl')?.addEventListener('input', () => {
    const ttl = document.getElementById('ttl').value;
    const usia = hitungUsia(ttl);
    document.getElementById('usiaDisplay').textContent = `${usia} tahun`;
});

document.getElementById('status')?.addEventListener('change', (e) => {
    document.getElementById('statusDisplay').textContent = e.target.value;
});

document.getElementById('pekerjaan')?.addEventListener('input', (e) => {
    document.getElementById('pekerjaanDisplay').textContent = e.target.value;
});