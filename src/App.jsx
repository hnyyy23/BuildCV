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
    const saved = localStorage.getItem('cv_projects_v6');
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
        digitalSkills: ['Microsoft Word', 'Microsoft Excel', 'Canva', 'Python', 'LaTeX'],
        softSkills: ['Komunikasi', 'Kepemimpinan', 'Manajemen Waktu', 'Public Speaking'],
        // Sistem Bagian Universal (All Custom Sections)
        sections: [
          {
            id: 1,
            title: 'Pendidikan',
            items: [
              {
                id: 1,
                title: 'S1 - Fisika',
                subtitle: 'Institut Teknologi Sepuluh Nopember (ITS)',
                period: '2024 - Sekarang',
                location: 'IPK: 3,24',
                details: ['Seleksi Tahap 2 Beasiswa Rumah Kepemimpinan']
              }
            ]
          },
          {
            id: 2,
            title: 'Pengalaman Akademik & Profesional',
            items: [
              {
                id: 1,
                title: 'Asisten Praktikum (Teaching Assistant)',
                subtitle: 'Departemen Fisika ITS (Mata Kuliah Fisika Listrik dan Magnet)',
                period: 'Feb 2026 - Sekarang',
                location: 'Surabaya, Jawa Timur',
                details: [
                  'Mempersiapkan materi instruksional, skrip presentasi, serta penjelasan mendalam terkait distribusi medan listrik',
                  'Membimbing mahasiswa dalam sesi asistensi dan pemecahan masalah rangkaian listrik'
                ]
              },
              {
                id: 2,
                title: 'Koordinator & Asisten Laboratorium',
                subtitle: 'Fisika Laboratorium 1 ITS',
                period: 'Mei 2026 - Agu 2026',
                location: 'Surabaya, Jawa Timur',
                details: [
                  'Mengelola jadwal praktikum, distribusi modul, presensi, serta penyusunan panduan pelatihan asisten laboratorium',
                  'Memimpin dan menyelenggarakan sesi pelatihan teknis bagi para asisten laboratorium baru'
                ]
              },
              {
                id: 3,
                title: 'Peserta Praktik Kerja / Magang',
                subtitle: 'Balai Pengamanan Alat dan Fasilitas Kesehatan (BPAFK)',
                period: 'Mei 2026 - Agu 2026',
                location: 'Surabaya, Jawa Timur',
                details: [
                  'Melakukan pengujian, kalibrasi, dan peninjauan alat serta fasilitas kesehatan di lapangan',
                  'Menyusun laporan teknis dan mendokumentasikan fungsi institusional balai kesehatan'
                ]
              }
            ]
          },
          {
            id: 3,
            title: 'Pengalaman Organisasi & Kepanitiaan',
            items: [
              {
                id: 1,
                title: 'Project Officer (Ketua Pelaksana)',
                subtitle: '11th Physics Summit (BSO HIMASIKA ITS)',
                period: 'Mei 2026 - Sep 2026',
                location: 'Surabaya, Jawa Timur',
                details: [
                  'Mengoordinasikan struktur organisasi, penugasan tim, dan eksekusi operasional seluruh rangkaian acara Physics Summit',
                  'Mengawasi pelaksanaan sub-event termasuk Physics Summit Olympiad, Innovation Competition, Open House, dan program Student Ambassador'
                ]
              },
              {
                id: 2,
                title: 'Staff Event',
                subtitle: 'Physics Summit 2025',
                period: 'Agust 2025 - Nov 2025',
                location: 'Surabaya, Jawa Timur',
                details: [
                  'Menyusun rundown dan konsep operasional acara',
                  'Bertugas sebagai PIC Student Ambassador dalam koordinasi peserta'
                ]
              }
            ]
          },
          {
            id: 4,
            title: 'Pelatihan dan Sertifikasi',
            items: [
              {
                id: 1,
                title: 'LKMM Pra-TD',
                subtitle: 'FSAD ITS',
                period: '2025',
                location: '',
                details: []
              },
              {
                id: 2,
                title: 'Pelatihan Dasar Microsoft 365 Copilot',
                subtitle: 'Sertifikasi Online',
                period: '2026',
                location: '',
                details: []
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
    localStorage.setItem('cv_projects_v6', JSON.stringify(projects));
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
      digitalSkills: ['Microsoft Word', 'Microsoft Excel'],
      softSkills: ['Komunikasi', 'Kerja Tim'],
      sections: [
        {
          id: 1,
          title: 'Pendidikan',
          items: [
            { id: 1, title: 'S1 - Jurusan', subtitle: 'Nama Universitas', period: '2022 - 2026', location: 'IPK: 3.xx', details: ['Pencapaian atau aktivitas akademik'] }
          ]
        }
      ]
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

        {/* ================= ALL CUSTOM SECTIONS (PENDIDIKAN, ORGANISASI, DLL) ================= */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="font-bold text-lg text-gray-800">Bagian Isi CV (All Custom)</h3>
          <button 
            onClick={() => {
              const newSections = [...(currentCv.sections || []), { id: Date.now(), title: 'Bagian Baru', items: [] }];
              updateCurrentCv({ sections: newSections });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow"
          >
            + Tambah Bagian Baru
          </button>
        </div>

        {(currentCv.sections || []).map((sec, secIdx) => (
          <div key={sec.id} className="bg-gray-50 p-4 rounded-lg border mb-6 relative">
            <div className="flex justify-between items-center mb-3 pr-20">
              <input 
                type="text" 
                value={sec.title} 
                onChange={(e) => {
                  const newSections = [...currentCv.sections];
                  newSections[secIdx].title = e.target.value;
                  updateCurrentCv({ sections: newSections });
                }} 
                className="border p-2 rounded font-bold text-blue-900 bg-white w-full text-sm" 
                placeholder="Judul Bagian (Cth: Pendidikan, Pengalaman, dll)"
              />
            </div>
            <button 
              onClick={() => {
                if(confirm(`Hapus bagian "${sec.title}" beserta isinya?`)){
                  const newSections = [...currentCv.sections];
                  newSections.splice(secIdx, 1);
                  updateCurrentCv({ sections: newSections });
                }
              }} 
              className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1.5 rounded font-bold text-xs"
            >
              🗑️ Hapus Bagian
            </button>

            {/* Items dalam Bagian */}
            {sec.items.map((item, itemIdx) => (
              <div key={item.id} className="bg-white p-3 rounded border mb-3 relative shadow-sm">
                <button 
                  onClick={() => {
                    const newSections = [...currentCv.sections];
                    newSections[secIdx].items.splice(itemIdx, 1);
                    updateCurrentCv({ sections: newSections });
                  }} 
                  className="absolute top-2 right-2 text-red-500 hover:bg-red-50 px-2 py-0.5 rounded font-bold text-xs"
                >
                  X Hapus Item
                </button>
                
                <div className="grid grid-cols-2 gap-2 mb-2 pr-20">
                  <input type="text" placeholder="Judul / Posisi / Jenjang" value={item.title} onChange={(e) => {
                    const newSections = [...currentCv.sections];
                    newSections[secIdx].items[itemIdx].title = e.target.value;
                    updateCurrentCv({ sections: newSections });
                  }} className="border p-1.5 rounded font-bold text-sm" />
                  <input type="text" placeholder="Instansi / Organisasi" value={item.subtitle} onChange={(e) => {
                    const newSections = [...currentCv.sections];
                    newSections[secIdx].items[itemIdx].subtitle = e.target.value;
                    updateCurrentCv({ sections: newSections });
                  }} className="border p-1.5 rounded text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input type="text" placeholder="Periode (Cth: 2024 - Sekarang)" value={item.period} onChange={(e) => {
                    const newSections = [...currentCv.sections];
                    newSections[secIdx].items[itemIdx].period = e.target.value;
                    updateCurrentCv({ sections: newSections });
                  }} className="border p-1.5 rounded text-xs" />
                  <input type="text" placeholder="Lokasi / IPK / Skor" value={item.location} onChange={(e) => {
                    const newSections = [...currentCv.sections];
                    newSections[secIdx].items[itemIdx].location = e.target.value;
                    updateCurrentCv({ sections: newSections });
                  }} className="border p-1.5 rounded text-xs" />
                </div>

                {/* Bullet points detail */}
                <div>
                  <label className="text-xs font-semibold text-gray-600">Poin Keterangan / Deskripsi:</label>
                  {(item.details || []).map((det, dIdx) => (
                    <div key={dIdx} className="flex gap-2 mt-1">
                      <span className="text-gray-400">•</span>
                      <input type="text" value={det} onChange={(e) => {
                        const newSections = [...currentCv.sections];
                        newSections[secIdx].items[itemIdx].details[dIdx] = e.target.value;
                        updateCurrentCv({ sections: newSections });
                      }} className="border p-1 rounded w-full text-xs" placeholder="Tulis kalimat..." />
                      <button onClick={() => {
                        const newSections = [...currentCv.sections];
                        newSections[secIdx].items[itemIdx].details.splice(dIdx, 1);
                        updateCurrentCv({ sections: newSections });
                      }} className="text-red-500 font-bold text-xs px-1">X</button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newSections = [...currentCv.sections];
                    if (!newSections[secIdx].items[itemIdx].details) newSections[secIdx].items[itemIdx].details = [];
                    newSections[secIdx].items[itemIdx].details.push('');
                    updateCurrentCv({ sections: newSections });
                  }} className="mt-1 text-blue-600 text-xs font-semibold">+ Tambah Poin Kalimat</button>
                </div>
              </div>
            ))}

            <button 
              onClick={() => {
                const newSections = [...currentCv.sections];
                newSections[secIdx].items.push({ id: Date.now(), title: '', subtitle: '', period: '', location: '', details: [''] });
                updateCurrentCv({ sections: newSections });
              }} 
              className="w-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold py-2 rounded hover:bg-blue-100 transition"
            >
              + Tambah Item ke Bagian "{sec.title}"
            </button>
          </div>
        ))}

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

            {/* RENDER DYNAMIC ALL-CUSTOM SECTIONS */}
            {(currentCv.sections || []).map((sec) => (
              <div key={sec.id} className="mb-2">
                <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">{sec.title}</h2>
                {sec.items.map((item, iIdx) => (
                  <div key={iIdx} className="mb-1.5">
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
