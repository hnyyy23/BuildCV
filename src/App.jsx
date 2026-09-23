import React, { useState, useEffect } from 'react';

const indonesiaRegions = {
  "Jawa Timur": ["Surabaya", "Gresik", "Sidoarjo", "Malang", "Mojokerto", "Lamongan", "Jember"],
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Cimahi"],
  "Jawa Tengah": ["Semarang", "Surakarta", "Yogyakarta", "Salatiga", "Magelang"],
  "Bali": ["Denpasar", "Badung", "Gianyar", "Tabanan"]
};

const presetDigitalSkills = ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Google Docs", "Google Sheets", "Canva", "CapCut", "Python", "LaTeX", "SPSS"];
const presetSoftSkills = ["Komunikasi", "Public Speaking", "Kerja Tim", "Kepemimpinan", "Manajemen Acara", "Problem Solving", "Negosiasi", "Manajemen Waktu"];

export default function App() {
  const [view, setView] = useState('dashboard');
  const [layoutMode, setLayoutMode] = useState('split');

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('cv_projects_v5');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: 'CV Utama - Fisika ITS',
        paperSize: 'A4',
        margin: 1,
        zoom: 0.85,
        fileName: 'CV_Haniyyah_Salwa_Amatullah',
        province: 'Jawa Timur',
        city: 'Surabaya',
        name: 'Haniyyah Salwa Amatullah',
        address: 'Keputih, Sukolilo',
        email: '5001241080@student.its.ac.id',
        phone: '(62)813-6219-2288',
        linkedin: 'in/hnysalwa',
        portfolio: 'https://intip.in/Portovolio Salwa',
        summary: 'Mahasiswa Program Studi Fisika Institut Teknologi Sepuluh Nopember (ITS) angkatan 2024 yang memiliki minat dan pengalaman dalam manajemen acara, pengembangan sumber daya manusia (PSDM), koordinasi tim, serta eksperimen laboratorium dan fisika medis.',
        educations: [
          { id: 1, degree: 'S1 - Fisika', institution: 'Institut Teknologi Sepuluh Nopember (ITS)', startYear: '2024', endYear: 'Sekarang', isCurrent: true, score: 'IPK: 3,24', details: ['Seleksi Tahap 2 Beasiswa Rumah Kepemimpinan'] }
        ],
        experiences: [
          {
            id: 1,
            title: 'Project Officer (Ketua Pelaksana)',
            startMonth: 'Mei',
            startYear: '2026',
            endMonth: 'Sep',
            endYear: '2026',
            isCurrent: false,
            organization: '11th Physics Summit (BSO HIMASIKA ITS)',
            location: 'Surabaya, Jawa Timur',
            tasks: [
              'Mengoordinasikan struktur organisasi, penugasan tim, dan eksekusi operasional seluruh rangkaian acara Physics Summit',
              'Mengawasi pelaksanaan sub-event termasuk Physics Summit Olympiad, Innovation Competition, Open House, dan Student Ambassador'
            ]
          }
        ],
        certifications: ['LKMM Pra-TD', 'Pelatihan Dasar Microsoft 365 Copilot'],
        digitalSkills: ['Microsoft Word', 'Microsoft Excel', 'Canva', 'Python', 'LaTeX'],
        softSkills: ['Komunikasi', 'Kepemimpinan', 'Manajemen Waktu', 'Public Speaking'],
        // Fitur Baru: Subbab/Bagian Custom Tambahan
        customSections: [
          {
            id: 1,
            title: 'Pengalaman Kerja',
            items: [
              {
                id: 1,
                title: 'Freelance Telesurveyor',
                subtitle: 'MPM AHM Jawa Timur',
                period: '2026',
                location: 'Surabaya, Jawa Timur',
                details: ['Melakukan panggilan telepon sesuai database responden', 'Menyampaikan pertanyaan survei berdasarkan skrip dan mencatat laporan secara akurat']
              }
            ]
          }
        ]
      }
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || 1);
  const currentCv = projects.find(p => p.id === activeProjectId) || projects[0];

  useEffect(() => {
    localStorage.setItem('cv_projects_v5', JSON.stringify(projects));
  }, [projects]);

  const updateCurrentCv = (updatedFields) => {
    const updatedProjects = projects.map(p => p.id === activeProjectId ? { ...p, ...updatedFields } : p);
    setProjects(updatedProjects);
  };

  const createNewProject = () => {
    const newId = Date.now();
    const dummyProj = {
      id: newId,
      title: `CV Baru (${projects.length + 1})`,
      paperSize: 'A4',
      margin: 1,
      zoom: 0.85,
      fileName: 'CV_Nama_Lengkap',
      province: 'DKI Jakarta',
      city: 'Jakarta Pusat',
      name: 'Nama Lengkap Anda',
      address: 'Alamat Lengkap',
      email: 'email@domain.com',
      phone: '(62)8xx-xxxx-xxxx',
      linkedin: 'in/username',
      portfolio: 'https://link-portofolio.com',
      summary: 'Tuliskan ringkasan profil atau deskripsi singkat mengenai latar belakang, keahlian, dan tujuan karir Anda di sini.',
      educations: [
        { id: 1, degree: 'S1 - Jurusan', institution: 'Nama Universitas', startYear: '2022', endYear: '2026', isCurrent: false, score: 'IPK: 3.xx', details: ['Pencapaian atau aktivitas akademik'] }
      ],
      experiences: [],
      certifications: [],
      digitalSkills: ['Microsoft Word', 'Microsoft Excel'],
      softSkills: ['Komunikasi', 'Kerja Tim'],
      customSections: []
    };

    setProjects([...projects, dummyProj]);
    setActiveProjectId(newId);
    setView('editor');
  };

  const deleteProject = (id, e) => {
    e.stopPropagation();
    if (projects.length === 1) {
      alert("Minimal harus ada 1 project CV!");
      return;
    }
    if (confirm("Yakin ingin menghapus CV ini?")) {
      const filtered = projects.filter(p => p.id !== id);
      setProjects(filtered);
      setActiveProjectId(filtered[0].id);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('cv-preview-element');
    const options = {
      margin: 0,
      filename: `${currentCv.fileName || 'CV_Professional'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: currentCv.paperSize.toLowerCase(), orientation: 'portrait' }
    };
    window.html2pdf().from(element).set(options).save();
  };

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">📂 Daftar Dokumen CV Saya</h1>
              <p className="text-gray-500 text-sm mt-1">Pilih CV yang ingin diedit atau buat dokumen baru dengan data contoh.</p>
            </div>
            <button 
              onClick={createNewProject}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg shadow transition flex items-center gap-2"
            >
              + Buat CV Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(proj => (
              <div 
                key={proj.id}
                onClick={() => { setActiveProjectId(proj.id); setView('editor'); }}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md hover:border-blue-400 cursor-pointer transition flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{proj.title}</h3>
                    <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">{proj.paperSize}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{proj.name || 'Belum ada nama'}</p>
                  <p className="text-gray-400 text-xs mt-1">File: {proj.fileName}.pdf</p>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t text-sm">
                  <span className="text-blue-600 font-semibold group-hover:underline">✏️ Klik untuk Edit &rarr;</span>
                  <button 
                    onClick={(e) => deleteProject(proj.id, e)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded transition text-xs font-bold"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden font-sans relative">
      
      {/* KIRI: PANEL FORM EDITOR */}
      <div className={`${layoutMode === 'preview' ? 'hidden' : layoutMode === 'editor' ? 'w-full' : 'w-1/2'} h-full overflow-y-auto bg-white border-r p-6 no-print shadow-lg z-10 transition-all duration-300`}>
        
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg border flex-wrap gap-2">
          <button 
            onClick={() => setView('dashboard')}
            className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1"
          >
            &larr; Kembali ke Daftar CV
          </button>
          
          <div className="flex bg-gray-200 p-1 rounded-lg text-xs font-semibold">
            <button 
              onClick={() => setLayoutMode('editor')} 
              className={`px-3 py-1.5 rounded-md transition ${layoutMode === 'editor' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-black'}`}
            >
              📝 Form Saja
            </button>
            <button 
              onClick={() => setLayoutMode('split')} 
              className={`px-3 py-1.5 rounded-md transition ${layoutMode === 'split' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-black'}`}
            >
              ⚡ Keduanya
            </button>
            <button 
              onClick={() => setLayoutMode('preview')} 
              className={`px-3 py-1.5 rounded-md transition ${layoutMode === 'preview' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-black'}`}
            >
              👁️ Pratinjau Saja
            </button>
          </div>
        </div>

        {/* PENGATURAN DOKUMEN & ZOOM */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
          <h3 className="font-semibold mb-3">Pengaturan Dokumen & Download</h3>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Nama Dokumen (untuk di Daftar CV):</label>
            <input type="text" value={currentCv.title} onChange={(e) => updateCurrentCv({ title: e.target.value })} className="border p-2 rounded w-full bg-white text-sm" />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Nama File PDF saat di-Download:</label>
            <input type="text" value={currentCv.fileName} onChange={(e) => updateCurrentCv({ fileName: e.target.value })} className="border p-2 rounded w-full bg-white text-sm" placeholder="Cth: CV_Nama_Posisi" />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ukuran:</label>
              <select value={currentCv.paperSize} onChange={(e) => updateCurrentCv({ paperSize: e.target.value })} className="border rounded p-1.5 bg-white text-sm w-full">
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="F4">F4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Margin:</label>
              <select value={currentCv.margin} onChange={(e) => updateCurrentCv({ margin: Number(e.target.value) })} className="border rounded p-1.5 bg-white text-sm w-full">
                <option value={1}>1 cm</option>
                <option value={1.27}>1.27 cm</option>
                <option value={2}>2 cm</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Zoom:</label>
              <select value={currentCv.zoom || 0.85} onChange={(e) => updateCurrentCv({ zoom: Number(e.target.value) })} className="border rounded p-1.5 bg-white text-sm w-full">
                <option value={0.6}>60%</option>
                <option value={0.75}>75%</option>
                <option value={0.85}>85%</option>
                <option value={1}>100%</option>
              </select>
            </div>
          </div>

          <button onClick={handleDownloadPDF} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition flex items-center justify-center gap-2">
            📥 Download PDF Otomatis
          </button>
        </div>

        {/* DATA DIRI */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Data Diri & Kontak</h3>
        <div className="flex flex-col gap-3 mb-8">
          <input type="text" placeholder="Nama Lengkap" value={currentCv.name} onChange={(e) => updateCurrentCv({ name: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Alamat Detail" value={currentCv.address} onChange={(e) => updateCurrentCv({ address: e.target.value })} className="border p-2 rounded" />
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Provinsi:</label>
              <select 
                value={currentCv.province} 
                onChange={(e) => updateCurrentCv({ province: e.target.value, city: indonesiaRegions[e.target.value]?.[0] || '' })} 
                className="border p-2 rounded w-full bg-white text-sm"
              >
                {Object.keys(indonesiaRegions).map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Kabupaten / Kota:</label>
              <select 
                value={currentCv.city} 
                onChange={(e) => updateCurrentCv({ city: e.target.value })} 
                className="border p-2 rounded w-full bg-white text-sm"
              >
                {(indonesiaRegions[currentCv.province] || []).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <input type="text" placeholder="Email" value={currentCv.email} onChange={(e) => updateCurrentCv({ email: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Nomor Telepon" value={currentCv.phone} onChange={(e) => updateCurrentCv({ phone: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="LinkedIn" value={currentCv.linkedin} onChange={(e) => updateCurrentCv({ linkedin: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Link Portofolio" value={currentCv.portfolio} onChange={(e) => updateCurrentCv({ portfolio: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Ringkasan Profil" value={currentCv.summary} onChange={(e) => updateCurrentCv({ summary: e.target.value })} className="border p-2 rounded h-24" />
        </div>

        {/* PENDIDIKAN */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pendidikan</h3>
        {currentCv.educations.map((edu, eduIndex) => (
          <div key={edu.id} className="bg-gray-50 p-4 rounded border mb-4 relative">
            <button onClick={() => {
              const newEdu = [...currentCv.educations]; newEdu.splice(eduIndex, 1); updateCurrentCv({ educations: newEdu });
            }} className="absolute top-3 right-3 text-red-500 text-sm font-bold">Hapus</button>
            
            <div className="grid grid-cols-2 gap-2 mb-2 pr-16">
              <input type="text" placeholder="Jenjang / Jurusan (Cth: S1 - Fisika)" value={edu.degree} onChange={(e) => {
                const newEdu = [...currentCv.educations]; newEdu[eduIndex].degree = e.target.value; updateCurrentCv({ educations: newEdu });
              }} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Nama Institusi" value={edu.institution} onChange={(e) => {
                const newEdu = [...currentCv.educations]; newEdu[eduIndex].institution = e.target.value; updateCurrentCv({ educations: newEdu });
              }} className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="Tahun Mulai (Cth: 2024)" value={edu.startYear} onChange={(e) => {
                const newEdu = [...currentCv.educations]; newEdu[eduIndex].startYear = e.target.value; updateCurrentCv({ educations: newEdu });
              }} className="border p-2 rounded text-sm" />
              <input type="text" placeholder="Tahun Selesai / Sekarang" value={edu.endYear} onChange={(e) => {
                const newEdu = [...currentCv.educations]; newEdu[eduIndex].endYear = e.target.value; updateCurrentCv({ educations: newEdu });
              }} className="border p-2 rounded text-sm" />
            </div>
            <input type="text" placeholder="IPK / Skor (Cth: IPK: 3,24)" value={edu.score} onChange={(e) => {
              const newEdu = [...currentCv.educations]; newEdu[eduIndex].score = e.target.value; updateCurrentCv({ educations: newEdu });
            }} className="border p-2 rounded w-full mb-2 text-sm" />

            <div className="mt-2">
              <label className="text-sm font-semibold text-gray-700">Detail / Prestasi Pendidikan:</label>
              {edu.details.map((det, dIdx) => (
                <div key={dIdx} className="flex gap-2 mt-2">
                  <span className="mt-2 text-gray-400">•</span>
                  <input type="text" value={det} onChange={(e) => {
                    const newEdu = [...currentCv.educations]; newEdu[eduIndex].details[dIdx] = e.target.value; updateCurrentCv({ educations: newEdu });
                  }} className="border p-2 rounded w-full text-sm" placeholder="Tulis detail..." />
                  <button onClick={() => {
                    const newEdu = [...currentCv.educations]; newEdu[eduIndex].details.splice(dIdx, 1); updateCurrentCv({ educations: newEdu });
                  }} className="bg-red-100 text-red-600 px-3 rounded font-bold">X</button>
                </div>
              ))}
              <button onClick={() => {
                const newEdu = [...currentCv.educations]; newEdu[eduIndex].details.push(''); updateCurrentCv({ educations: newEdu });
              }} className="mt-2 text-blue-600 text-sm font-semibold">+ Tambah Detail Pendidikan</button>
            </div>
          </div>
        ))}
        <button onClick={() => updateCurrentCv({ educations: [...currentCv.educations, { id: Date.now(), degree: '', institution: '', startYear: '', endYear: '', score: '', details: [''] }] })} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-8">+ Tambah Pendidikan</button>

        {/* PENGALAMAN ORGANISASI */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pengalaman Organisasi & Kepanitiaan</h3>
        {currentCv.experiences.map((exp, expIndex) => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded border mb-4 relative">
            <button onClick={() => {
              const newExp = [...currentCv.experiences]; newExp.splice(expIndex, 1); updateCurrentCv({ experiences: newExp });
            }} className="absolute top-3 right-3 text-red-500 text-sm font-bold">Hapus</button>
            
            <div className="grid grid-cols-2 gap-2 mb-2 pr-16">
              <input type="text" placeholder="Jabatan" value={exp.title} onChange={(e) => {
                const newExp = [...currentCv.experiences]; newExp[expIndex].title = e.target.value; updateCurrentCv({ experiences: newExp });
              }} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Nama Organisasi / Acara" value={exp.organization} onChange={(e) => {
                const newExp = [...currentCv.experiences]; newExp[expIndex].organization = e.target.value; updateCurrentCv({ experiences: newExp });
              }} className="border p-2 rounded" />
            </div>

            <div className="bg-white p-3 rounded border mb-2 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Mulai:</label>
                <div className="flex gap-1">
                  <select value={exp.startMonth || 'Jan'} onChange={(e) => {
                    const newExp = [...currentCv.experiences]; newExp[expIndex].startMonth = e.target.value; updateCurrentCv({ experiences: newExp });
                  }} className="border p-1 rounded text-xs">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agust', 'Sep', 'Okt', 'Nov', 'Des'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input type="text" placeholder="Tahun" value={exp.startYear || ''} onChange={(e) => {
                    const newExp = [...currentCv.experiences]; newExp[expIndex].startYear = e.target.value; updateCurrentCv({ experiences: newExp });
                  }} className="border p-1 rounded text-xs w-20" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Selesai:</label>
                {!exp.isCurrent ? (
                  <div className="flex gap-1">
                    <select value={exp.endMonth || 'Des'} onChange={(e) => {
                      const newExp = [...currentCv.experiences]; newExp[expIndex].endMonth = e.target.value; updateCurrentCv({ experiences: newExp });
                    }} className="border p-1 rounded text-xs">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agust', 'Sep', 'Okt', 'Nov', 'Des'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <input type="text" placeholder="Tahun" value={exp.endYear || ''} onChange={(e) => {
                      const newExp = [...currentCv.experiences]; newExp[expIndex].endYear = e.target.value; updateCurrentCv({ experiences: newExp });
                    }} className="border p-1 rounded text-xs w-20" />
                  </div>
                ) : (
                  <span className="text-xs font-bold text-green-600 pt-2 block">Masih Berjalan / Sekarang</span>
                )}
                <label className="flex items-center gap-1 mt-1 text-xs cursor-pointer">
                  <input type="checkbox" checked={exp.isCurrent || false} onChange={(e) => {
                    const newExp = [...currentCv.experiences]; newExp[expIndex].isCurrent = e.target.checked; updateCurrentCv({ experiences: newExp });
                  }} /> Masih Berjalan / Sekarang
                </label>
              </div>
            </div>

            <input type="text" placeholder="Lokasi" value={exp.location} onChange={(e) => {
              const newExp = [...currentCv.experiences]; newExp[expIndex].location = e.target.value; updateCurrentCv({ experiences: newExp });
            }} className="border p-2 rounded w-full mb-2 text-sm" />

            <div className="mt-2">
              <label className="text-sm font-semibold text-gray-700">Tugas / Pencapaian:</label>
              {exp.tasks.map((task, tIdx) => (
                <div key={tIdx} className="flex gap-2 mt-2">
                  <span className="mt-2 text-gray-400">•</span>
                  <input type="text" value={task} onChange={(e) => {
                    const newExp = [...currentCv.experiences]; newExp[expIndex].tasks[tIdx] = e.target.value; updateCurrentCv({ experiences: newExp });
                  }} className="border p-2 rounded w-full text-sm" placeholder="Tulis kalimat..." />
                  <button onClick={() => {
                    const newExp = [...currentCv.experiences]; newExp[expIndex].tasks.splice(tIdx, 1); updateCurrentCv({ experiences: newExp });
                  }} className="bg-red-100 text-red-600 px-3 rounded font-bold">X</button>
                </div>
              ))}
              <button onClick={() => {
                const newExp = [...currentCv.experiences]; newExp[expIndex].tasks.push(''); updateCurrentCv({ experiences: newExp });
              }} className="mt-2 text-blue-600 text-sm font-semibold">+ Tambah Kalimat Tugas</button>
            </div>
          </div>
        ))}
        <button onClick={() => updateCurrentCv({ experiences: [...currentCv.experiences, { id: Date.now(), title: '', startMonth: 'Jan', startYear: '2025', endMonth: 'Des', endYear: '2025', isCurrent: false, organization: '', location: '', tasks: [''] }] })} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-8">+ Tambah Pengalaman</button>

        {/* ================= BAGIAN CUSTOM / SUBBAB TAMBAHAN ================= */}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-blue-800">✨ Subbab / Bagian Tambahan Custom</h3>
            <button 
              onClick={() => {
                const newCustom = [...(currentCv.customSections || []), { id: Date.now(), title: 'Bagian Baru', items: [] }];
                updateCurrentCv({ customSections: newCustom });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow"
            >
              + Buat Subbab Baru
            </button>
          </div>

          {(currentCv.customSections || []).map((sec, secIdx) => (
            <div key={sec.id} className="bg-blue-50/60 p-4 rounded-lg border border-blue-200 mb-6 relative">
              <div className="flex justify-between items-center mb-3 pr-12">
                <input 
                  type="text" 
                  value={sec.title} 
                  onChange={(e) => {
                    const newCustom = [...currentCv.customSections];
                    newCustom[secIdx].title = e.target.value;
                    updateCurrentCv({ customSections: newCustom });
                  }} 
                  className="border p-2 rounded font-bold text-blue-900 bg-white w-full text-sm" 
                  placeholder="Nama Subbab (Cth: Pengalaman Kerja, Proyek, Penghargaan)"
                />
              </div>
              <button 
                onClick={() => {
                  if(confirm(`Hapus subbab "${sec.title}" beserta isinya?`)){
                    const newCustom = [...currentCv.customSections];
                    newCustom.splice(secIdx, 1);
                    updateCurrentCv({ customSections: newCustom });
                  }
                }} 
                className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded font-bold text-xs"
              >
                🗑️ Hapus Subbab
              </button>

              {/* Items dalam Subbab Custom */}
              {sec.items.map((item, itemIdx) => (
                <div key={item.id} className="bg-white p-3 rounded border mb-3 relative">
                  <button 
                    onClick={() => {
                      const newCustom = [...currentCv.customSections];
                      newCustom[secIdx].items.splice(itemIdx, 1);
                      updateCurrentCv({ customSections: newCustom });
                    }} 
                    className="absolute top-2 right-2 text-red-500 font-bold text-xs"
                  >
                    X
                  </button>
                  <div className="grid grid-cols-2 gap-2 mb-2 pr-8">
                    <input type="text" placeholder="Judul / Posisi" value={item.title} onChange={(e) => {
                      const newCustom = [...currentCv.customSections];
                      newCustom[secIdx].items[itemIdx].title = e.target.value;
                      updateCurrentCv({ customSections: newCustom });
                    }} className="border p-1.5 rounded font-bold text-sm" />
                    <input type="text" placeholder="Instansi / Pemberi" value={item.subtitle} onChange={(e) => {
                      const newCustom = [...currentCv.customSections];
                      newCustom[secIdx].items[itemIdx].subtitle = e.target.value;
                      updateCurrentCv({ customSections: newCustom });
                    }} className="border p-1.5 rounded text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" placeholder="Periode (Cth: 2026)" value={item.period} onChange={(e) => {
                      const newCustom = [...currentCv.customSections];
                      newCustom[secIdx].items[itemIdx].period = e.target.value;
                      updateCurrentCv({ customSections: newCustom });
                    }} className="border p-1.5 rounded text-xs" />
                    <input type="text" placeholder="Lokasi" value={item.location} onChange={(e) => {
                      const newCustom = [...currentCv.customSections];
                      newCustom[secIdx].items[itemIdx].location = e.target.value;
                      updateCurrentCv({ customSections: newCustom });
                    }} className="border p-1.5 rounded text-xs" />
                  </div>

                  {/* Bullet points detail */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Poin Keterangan:</label>
                    {(item.details || []).map((det, dIdx) => (
                      <div key={dIdx} className="flex gap-2 mt-1">
                        <span className="text-gray-400">•</span>
                        <input type="text" value={det} onChange={(e) => {
                          const newCustom = [...currentCv.customSections];
                          newCustom[secIdx].items[itemIdx].details[dIdx] = e.target.value;
                          updateCurrentCv({ customSections: newCustom });
                        }} className="border p-1 rounded w-full text-xs" placeholder="Tulis keterangan..." />
                        <button onClick={() => {
                          const newCustom = [...currentCv.customSections];
                          newCustom[secIdx].items[itemIdx].details.splice(dIdx, 1);
                          updateCurrentCv({ customSections: newCustom });
                        }} className="text-red-500 font-bold text-xs px-1">X</button>
                      </div>
                    ))}
                    <button onClick={() => {
                      const newCustom = [...currentCv.customSections];
                      if (!newCustom[secIdx].items[itemIdx].details) newCustom[secIdx].items[itemIdx].details = [];
                      newCustom[secIdx].items[itemIdx].details.push('');
                      updateCurrentCv({ customSections: newCustom });
                    }} className="mt-1 text-blue-600 text-xs font-semibold">+ Tambah Poin</button>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => {
                  const newCustom = [...currentCv.customSections];
                  newCustom[secIdx].items.push({ id: Date.now(), title: '', subtitle: '', period: '', location: '', details: [''] });
                  updateCurrentCv({ customSections: newCustom });
                }} 
                className="w-full bg-white border border-blue-300 text-blue-700 text-xs font-bold py-1.5 rounded hover:bg-blue-50"
              >
                + Tambah Isi ke Subbab "{sec.title}"
              </button>
            </div>
          ))}
        </div>

        {/* KETERAMPILAN */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4 mt-6">Keterampilan</h3>
        <div className="mb-10 bg-gray-50 p-4 rounded border flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Keterampilan Digital:</label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {presetDigitalSkills.map(skill => {
                const isSelected = currentCv.digitalSkills.includes(skill);
                return (
                  <button 
                    key={skill}
                    onClick={() => {
                      if (isSelected) {
                        updateCurrentCv({ digitalSkills: currentCv.digitalSkills.filter(s => s !== skill) });
                      } else {
                        updateCurrentCv({ digitalSkills: [...currentCv.digitalSkills, skill] });
                      }
                    }}
                    className={`text-xs px-2.5 py-1 rounded border transition ${isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {isSelected ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                id="custom-digital-input" 
                placeholder="Ketik keterampilan lain..." 
                className="border p-2 rounded w-full bg-white text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = e.target.value.trim();
                    if (val && !currentCv.digitalSkills.includes(val)) {
                      updateCurrentCv({ digitalSkills: [...currentCv.digitalSkills, val] });
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button 
                type="button"
                onClick={() => {
                  const input = document.getElementById('custom-digital-input');
                  const val = input.value.trim();
                  if (val && !currentCv.digitalSkills.includes(val)) {
                    updateCurrentCv({ digitalSkills: [...currentCv.digitalSkills, val] });
                    input.value = '';
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {currentCv.digitalSkills.map((skill, sIdx) => (
                <span key={sIdx} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {skill}
                  <button onClick={() => updateCurrentCv({ digitalSkills: currentCv.digitalSkills.filter((_, i) => i !== sIdx) })} className="text-blue-400 hover:text-red-600 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Soft Skills:</label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {presetSoftSkills.map(skill => {
                const isSelected = currentCv.softSkills.includes(skill);
                return (
                  <button 
                    key={skill}
                    onClick={() => {
                      if (isSelected) {
                        updateCurrentCv({ softSkills: currentCv.softSkills.filter(s => s !== skill) });
                      } else {
                        updateCurrentCv({ softSkills: [...currentCv.softSkills, skill] });
                      }
                    }}
                    className={`text-xs px-2.5 py-1 rounded border transition ${isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {isSelected ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                id="custom-soft-input" 
                placeholder="Ketik soft skill lain..." 
                className="border p-2 rounded w-full bg-white text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = e.target.value.trim();
                    if (val && !currentCv.softSkills.includes(val)) {
                      updateCurrentCv({ softSkills: [...currentCv.softSkills, val] });
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button 
                type="button"
                onClick={() => {
                  const input = document.getElementById('custom-soft-input');
                  const val = input.value.trim();
                  if (val && !currentCv.softSkills.includes(val)) {
                    updateCurrentCv({ softSkills: [...currentCv.softSkills, val] });
                    input.value = '';
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {currentCv.softSkills.map((skill, sIdx) => (
                <span key={sIdx} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {skill}
                  <button onClick={() => updateCurrentCv({ softSkills: currentCv.softSkills.filter((_, i) => i !== sIdx) })} className="text-blue-400 hover:text-red-600 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: PRATINJAU KERTAS */}
      <div className={`${layoutMode === 'editor' ? 'hidden' : layoutMode === 'preview' ? 'w-full' : 'w-1/2'} h-full overflow-auto p-8 flex justify-center print-area bg-gray-100 transition-all duration-300 relative`}>
        
        {layoutMode === 'preview' && (
          <div className="absolute top-4 left-4 z-20 flex gap-2 bg-white p-2 rounded-lg shadow-md border">
            <button 
              onClick={() => setView('dashboard')}
              className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2 py-1 bg-gray-50 rounded border"
            >
              &larr; Daftar CV
            </button>
            <button 
              onClick={() => setLayoutMode('split')} 
              className="text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              ⚡ Kembali ke Form Edit
            </button>
          </div>
        )}

        <div style={{ transform: `scale(${currentCv.zoom || 0.85})`, transformOrigin: 'top center', transition: 'transform 0.2s ease', margin: 'auto' }}>
          <div 
            id="cv-preview-element"
            className="bg-white shadow-xl text-[10.5pt] mb-12 box-border shrink-0"
            style={{
              width: currentCv.paperSize === 'A4' ? '210mm' : currentCv.paperSize === 'A5' ? '148mm' : '215.9mm',
              padding: `${currentCv.margin}cm`,
              fontFamily: "'Times New Roman', Times, serif",
              color: "black",
              lineHeight: "1.15",
              minHeight: '297mm'
            }}
          >
            {/* HEADER */}
            <div className="text-center mb-2">
              <h1 className="text-[15pt] font-bold uppercase mb-0.5">{currentCv.name}</h1>
              <p className="text-[9.5pt]">
                {currentCv.address}, {currentCv.city}, {currentCv.province} | {currentCv.email} | {currentCv.phone} <br/>
                {currentCv.linkedin} | {currentCv.portfolio}
              </p>
            </div>

            {/* SUMMARY */}
            <div className="mb-2">
              <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Ringkasan Profil</h2>
              <p className="text-justify text-[10.0pt]">{currentCv.summary}</p>
            </div>

            {/* EDUCATION */}
            <div className="mb-2">
              <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pendidikan</h2>
              {currentCv.educations.map((edu, idx) => (
                <div key={idx} className="mb-1.5">
                  <div className="flex justify-between font-bold text-[10.0pt]">
                    <span>{edu.degree}</span>
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <div className="flex justify-between italic text-[10.0pt] mb-0.5">
                    <span>{edu.institution}</span>
                    <span>{edu.score}</span>
                  </div>
                  {edu.details && edu.details.length > 0 && (
                    <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                      {edu.details.map((d, dIdx) => (
                        d.trim() !== '' && <li key={dIdx} className="mb-0">{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* EXPERIENCES */}
            <div className="mb-2">
              <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pengalaman Organisasi & Kepanitiaan</h2>
              {currentCv.experiences.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between font-bold text-[10.0pt]">
                    <span>{exp.title}</span>
                    <span>{exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Sekarang' : `${exp.endMonth} ${exp.endYear}`}</span>
                  </div>
                  <div className="flex justify-between italic text-[10.0pt] mb-0.5">
                    <span>{exp.organization}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                    {exp.tasks.map((task, tIndex) => (
                      task.trim() !== '' && <li key={tIndex} className="mb-0">{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* RENDER DYNAMIC CUSTOM SECTIONS (SUBBAB TAMBAHAN) */}
            {(currentCv.customSections || []).map((sec) => (
              <div key={sec.id} className="mb-2">
                <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">{sec.title}</h2>
                {sec.items.map((item, iIdx) => (
                  <div key={iIdx} className="mb-2">
                    <div className="flex justify-between font-bold text-[10.0pt]">
                      <span>{item.title}</span>
                      <span>{item.period}</span>
                    </div>
                    <div className="flex justify-between italic text-[10.0pt] mb-0.5">
                      <span>{item.subtitle}</span>
                      <span>{item.location}</span>
                    </div>
                    {item.details && item.details.length > 0 && (
                      <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                        {item.details.map((d, dIdx) => (
                          d.trim() !== '' && <li key={dIdx} className="mb-0">{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* CERTIFICATIONS */}
            {currentCv.certifications.length > 0 && (
              <div className="mb-2">
                <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pelatihan dan Sertifikasi</h2>
                <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                  {currentCv.certifications.map((cert, index) => (
                    cert.trim() !== '' && <li key={index} className="mb-0">{index + 1}. {cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SKILLS */}
            <div>
              <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Keterampilan</h2>
              <div className="text-[9.5pt] mb-0.5">
                <span className="font-bold">Keterampilan Digital: </span>
                {currentCv.digitalSkills.join(', ')}
              </div>
              <div className="text-[9.5pt]">
                <span className="font-bold">Soft Skills: </span>
                {currentCv.softSkills.join(', ')}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
