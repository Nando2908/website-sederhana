// Pendidikan.js - Mengelola data pendidikan dan skill
let pendidikanData = {
    formal: [],
    nonFormal: [],
    skills: []
};

// Load data dari localStorage
function loadPendidikanData() {
    const saved = localStorage.getItem('pendidikanData');
    if (saved) {
        pendidikanData = JSON.parse(saved);
    } else {
        // Data default
        pendidikanData = {
            formal: [
                { institusi: 'SD Negeri 01 Jakarta', tahun: '2004-2010', jurusan: '-' },
                { institusi: 'SMP Negeri 05 Jakarta', tahun: '2010-2013', jurusan: '-' },
                { institusi: 'SMA Negeri 08 Jakarta', tahun: '2013-2016', jurusan: 'IPA' },
                { institusi: 'Universitas Indonesia', tahun: '2016-2020', jurusan: 'Teknik Informatika' }
            ],
            nonFormal: [
                { nama: 'Fullstack Web Development Bootcamp', penyelenggara: 'Dicoding', tahun: '2021' },
                { nama: 'Certified JavaScript Developer', penyelenggara: 'freeCodeCamp', tahun: '2022' }
            ],
            skills: ['JavaScript', 'React.js', 'Node.js', 'Python', 'HTML/CSS', 'Git']
        };
    }
    renderAll();
}

// Render semua
function renderAll() {
    renderFormalEducation();
    renderNonFormalEducation();
    renderSkills();
    updateSummary();
}

// Render pendidikan formal
function renderFormalEducation() {
    const container = document.getElementById('formalEducationList');
    if (!container) return;
    
    container.innerHTML = '';
    pendidikanData.formal.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <div class="education-fields">
                <input type="text" value="${escapeHtml(item.institusi)}" placeholder="Institusi" data-field="institusi" data-index="${index}" data-type="formal">
                <input type="text" value="${escapeHtml(item.tahun)}" placeholder="Tahun" data-field="tahun" data-index="${index}" data-type="formal">
                <input type="text" value="${escapeHtml(item.jurusan)}" placeholder="Jurusan" data-field="jurusan" data-index="${index}" data-type="formal">
            </div>
            <button class="delete-btn" data-type="formal" data-index="${index}">🗑️ Hapus</button>
        `;
        container.appendChild(div);
    });
    
    // Attach event listeners untuk input
    attachEducationEvents();
}

// Render non formal
function renderNonFormalEducation() {
    const container = document.getElementById('nonFormalList');
    if (!container) return;
    
    container.innerHTML = '';
    pendidikanData.nonFormal.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <div class="education-fields" style="grid-template-columns: 2fr 1fr 1fr;">
                <input type="text" value="${escapeHtml(item.nama)}" placeholder="Nama Sertifikasi" data-field="nama" data-index="${index}" data-type="nonFormal">
                <input type="text" value="${escapeHtml(item.penyelenggara)}" placeholder="Penyelenggara" data-field="penyelenggara" data-index="${index}" data-type="nonFormal">
                <input type="text" value="${escapeHtml(item.tahun)}" placeholder="Tahun" data-field="tahun" data-index="${index}" data-type="nonFormal">
            </div>
            <button class="delete-btn" data-type="nonFormal" data-index="${index}">🗑️ Hapus</button>
        `;
        container.appendChild(div);
    });
    
    attachEducationEvents();
}

// Render skills
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    pendidikanData.skills.forEach((skill, index) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${escapeHtml(skill)}
            <button class="delete-skill" data-index="${index}">✕</button>
        `;
        container.appendChild(skillTag);
    });
    
    // Tambah input untuk skill baru
    const addDiv = document.createElement('div');
    addDiv.className = 'add-skill-input';
    addDiv.innerHTML = `
        <input type="text" id="newSkillInput" placeholder="Tambah skill baru...">
        <button id="addNewSkillBtn" class="btn-small">+ Tambah</button>
    `;
    container.appendChild(addDiv);
    
    document.getElementById('addNewSkillBtn')?.addEventListener('click', addNewSkill);
    document.getElementById('newSkillInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addNewSkill();
    });
    
    // Hapus skill
    document.querySelectorAll('.delete-skill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            pendidikanData.skills.splice(index, 1);
            saveAndRender();
        });
    });
}

// Add new skill
function addNewSkill() {
    const input = document.getElementById('newSkillInput');
    const skill = input.value.trim();
    if (skill && !pendidikanData.skills.includes(skill)) {
        pendidikanData.skills.push(skill);
        saveAndRender();
        input.value = '';
    }
}

// Attach events untuk input pendidikan
function attachEducationEvents() {
    document.querySelectorAll('.education-fields input').forEach(input => {
        input.addEventListener('change', (e) => {
            const { type, index, field } = e.target.dataset;
            if (type === 'formal') {
                pendidikanData.formal[parseInt(index)][field] = e.target.value;
            } else if (type === 'nonFormal') {
                pendidikanData.nonFormal[parseInt(index)][field] = e.target.value;
            }
            saveToLocalStorage();
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { type, index } = btn.dataset;
            if (type === 'formal') {
                pendidikanData.formal.splice(parseInt(index), 1);
            } else if (type === 'nonFormal') {
                pendidikanData.nonFormal.splice(parseInt(index), 1);
            }
            saveAndRender();
        });
    });
}

// Update summary
function updateSummary() {
    document.getElementById('totalFormal').textContent = pendidikanData.formal.length;
    document.getElementById('totalNonFormal').textContent = pendidikanData.nonFormal.length;
    document.getElementById('totalSkills').textContent = pendidikanData.skills.length;
}

// Save ke localStorage
function saveToLocalStorage() {
    localStorage.setItem('pendidikanData', JSON.stringify(pendidikanData));
}

// Save and re-render
function saveAndRender() {
    saveToLocalStorage();
    renderAll();
}

// Reset ke default
function resetPendidikan() {
    pendidikanData = {
        formal: [
            { institusi: 'SD Negeri 01 Jakarta', tahun: '2004-2010', jurusan: '-' },
            { institusi: 'SMP Negeri 05 Jakarta', tahun: '2010-2013', jurusan: '-' },
            { institusi: 'SMA Negeri 08 Jakarta', tahun: '2013-2016', jurusan: 'IPA' },
            { institusi: 'Universitas Indonesia', tahun: '2016-2020', jurusan: 'Teknik Informatika' }
        ],
        nonFormal: [
            { nama: 'Fullstack Web Development Bootcamp', penyelenggara: 'Dicoding', tahun: '2021' },
            { nama: 'Certified JavaScript Developer', penyelenggara: 'freeCodeCamp', tahun: '2022' }
        ],
        skills: ['JavaScript', 'React.js', 'Node.js', 'Python', 'HTML/CSS', 'Git']
    };
    saveAndRender();
    showNotification('🔄 Data pendidikan telah direset!');
}

// Add formal education
function addFormalEducation() {
    pendidikanData.formal.push({
        institusi: 'Institusi Baru',
        tahun: '2024',
        jurusan: 'Jurusan'
    });
    saveAndRender();
    showNotification('➕ Formal education ditambahkan');
}

// Add non formal
function addNonFormalEducation() {
    pendidikanData.nonFormal.push({
        nama: 'Sertifikasi Baru',
        penyelenggara: 'Penyelenggara',
        tahun: '2024'
    });
    saveAndRender();
    showNotification('➕ Sertifikasi ditambahkan');
}

// Show notification
function showNotification(message) {
    const notif = document.getElementById('eduNotification');
    notif.textContent = message;
    notif.classList.remove('hidden');
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 3000);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
document.getElementById('saveEducationBtn')?.addEventListener('click', () => {
    saveToLocalStorage();
    showNotification('✅ Data pendidikan berhasil disimpan!');
});

document.getElementById('resetEducationBtn')?.addEventListener('click', resetPendidikan);
document.getElementById('addFormalBtn')?.addEventListener('click', addFormalEducation);
document.getElementById('addNonFormalBtn')?.addEventListener('click', addNonFormalEducation);

// Inisialisasi
loadPendidikanData();