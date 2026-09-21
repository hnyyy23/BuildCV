import React, { useState, useEffect } from 'react';

// Data Provinsi dan Kota Utama di Indonesia
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

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('cv_projects_v3');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: 'CV Utama - Fisika ITS',
        paperSize: 'A4',
        margin: 1,
        zoom: 0.85, // Default zoom agar pas di layar
        fileName: 'CV_Haniyyah_Salwa_Amatullah',
        province: 'Jawa Timur',
        city: 'Surabaya',
        name: 'Haniyyah Salwa Amatullah',
        address: 'Keputih, Sukolilo',
        email: '5001241080@student.its.ac.id',
        phone: '(62)813-6219-2288',
        linkedin: 'in/hnysalwa',
        portfolio: 'https://intip.in/Portovolio Salwa',
        summary: 'Mahasiswa Program Studi Fisika Institut Teknologi Sepuluh Nopember (ITS) angkatan 2024 yang memiliki minat dan pengalaman dalam manajemen acara, pengembangan sumber daya manusia (PSDM), serta koordinasi tim.',
        educations: [
          { id: 1, degree: 'S1-Fisika', institution: 'Institut Teknologi Sepuluh Nopember (ITS)', startYear: '2024', endYear: 'Sekarang', isCurrent: true, score: 'IPK: 3,24', details: ['Seleksi Tahap 2 Beasiswa Rumah Kepemimpinan'] }
        ],
        experiences: [
          { id: 1, title: 'Staff Event', startMonth: 'Agust', startYear: '2025', endMonth: 'Nov', endYear: '2025', isCurrent: false, organization: 'Physic Summit 2025', location: 'Surabaya, Jawa Timur', tasks: ['Menyusun rundown acara', 'Menjadi PIC Student Ambassador'] }
        ],
        certifications: ['LKMM Pra-TD', 'Pelatihan Dasar Microsoft 365 Copilot'],
        digitalSkills: ['Microsoft Word', 'Microsoft Excel', 'Canva'],
        softSkills: ['Komunikasi', 'Kepemimpinan', 'Manajemen Waktu']
      }
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || 1);
  const currentCv = projects.find(p => p.id === activeProjectId) || projects[0];

  useEffect(() => {
    localStorage.setItem('cv_projects_v3', JSON.stringify(projects));
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
        { id: 1, degree: 'S1-Jurusan', institution: 'Nama Universitas', startYear: '2022', endYear: '2026', isCurrent: false, score: 'IPK: 3.xx', details: ['Pencapaian atau aktivitas akademik'] }
      ],
      experiences: [
        { id: 1, title: 'Nama Posisi / Jabatan', startMonth: 'Jan', startYear: '2025', endMonth: 'Des', endYear: '2025', isCurrent: false, organization: 'Nama Perusahaan / Organisasi', location: 'Kota, Provinsi', tasks: ['Deskripsi tugas atau pencapaian 1', 'Deskripsi tugas atau pencapaian 2'] }
      ],
      certifications: ['Nama Sertifikasi / Pelatihan'],
      digitalSkills: ['Microsoft Word', 'Microsoft Excel'],
      softSkills: ['Komunikasi', 'Kerja Tim']
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

  // ================= TAMPILAN 1: DASHBOARD =================
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

  // ================= TAMPILAN 2: EDITOR =================
  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden font-sans">
      
      {/* KIRI: PANEL FORM EDITOR */}
      <div className="w-1/2 h-full overflow-y-auto bg-white border-r p-6 no-print shadow-lg z-10">
        
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg border">
          <button 
            onClick={() => setView('dashboard')}
            className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1"
          >
            &larr; Kembali ke Daftar CV
          </button>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded">Edit: {currentCv.title}</span>
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

        {/* KETERAMPILAN */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Keterampilan</h3>
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

      {/* KANAN: PRATINJAU KERTAS DENGAN FITUR ZOOM SCALE */}
      <div className="w-1/2 h-full overflow-y-auto p-8 flex justify-center print-area bg-gray-100">
        <div style={{ transform: `scale(${currentCv.zoom || 0.85})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}>
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
                    <span>{edu.startYear} - {edu.isCurrent ? 'Sekarang' : edu.endYear}</span>
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

            {/* CERTIFICATIONS */}
            {currentCv.certifications.length > 0 && (
              <div className="mb-2">
                <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pelatihan dan Sertifikasi</h2>
                <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                  {currentCv.certifications.map((cert, index) => (
                    cert.trim() !== '' && <li key={index} className="mb-0">{cert}</li>
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
