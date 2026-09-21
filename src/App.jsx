import React, { useState } from 'react';

export default function App() {
  const [paperSize, setPaperSize] = useState('A4');
  const [margin, setMargin] = useState(1); // Margin 1 cm

  const [cvData, setCvData] = useState({
    name: 'Haniyyah Salwa Amatullah',
    address: 'Keputih, Sukolilo, Surabaya',
    email: '5001241080@student.its.ac.id',
    phone: '(62)813-6219-2288',
    linkedin: 'in/hnysalwa',
    portfolio: 'https://intip.in/Portovolio Salwa',
    summary: 'Mahasiswa Program Studi Fisika Institut Teknologi Sepuluh Nopember (ITS) angkatan 2024 yang memiliki minat dan pengalaman dalam manajemen acara, pengembangan sumber daya manusia (PSDM), serta koordinasi tim. Berpengalaman dalam menyusun rundown kegiatan, mengelola koordinasi antar divisi, serta mendukung pelaksanaan berbagai kegiatan organisasi dan kepanitiaan.',
    
    educations: [
      {
        id: 1,
        degree: 'S1-Fisika',
        institution: 'Institut Teknologi Sepuluh Nopember (ITS)',
        date: '2024 - Sekarang',
        score: 'IPK: 3,24',
        details: [
          'Seleksi Tahap 2 Program Beasiswa Rumah Kepemimpinan (2026)',
          'Awardee Beasiswa BAZNAS Kabupaten Gresik (2024)',
          'Asisten Laboratorium Fisika Listrik (2026)',
          'Asisten Dosen Fisika 2 (5 SKS) - 2026'
        ]
      }
    ],

    experiences: [
      {
        id: 1,
        title: 'Staff Event',
        date: 'Agust 2025 - Nov 2025',
        organization: 'Physic Summit 2025',
        location: 'Surabaya, Jawa Timur',
        tasks: [
          'Menyusun rundown beserta kebutuhan teknis welcome party dan upgrading student ambassador eksternal.',
          'Menyusun rundown roadshow dan hari-H acara.',
          'Menjadi PIC Student Ambassador'
        ]
      }
    ],

    workExperiences: [
      {
        id: 1,
        title: 'Freelance Telesurveyor',
        date: '08 Feb 2026 - 16 Feb 2026',
        organization: 'MPM AHM Jawa Timur',
        location: 'Surabaya, Jawa Timur',
        tasks: [
          'Melakukan panggilan telepon sesuai database responden.',
          'Menyampaikan pertanyaan survei berdasarkan skrip serta mencatat hasil secara akurat.'
        ]
      }
    ],

    certifications: [
      'LKMM Pra-TD',
      'LKMM TD',
      'LKMW',
      'PKTI TD',
      'Pelatihan Dasar Microsoft 365 Copilot',
      'Pelatihan Rumus Dasar Excel'
    ],

    digitalSkills: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Google Docs', 'Google Sheets', 'Canva', 'CapCut'],
    softSkills: ['Komunikasi', 'Public Speaking', 'Kerja Tim', 'Kepemimpinan', 'Manajemen Acara', 'Problem Solving', 'Manajemen Waktu']
  });

  const handlePrint = () => {
    window.print();
  };

  const addEducation = () => {
    setCvData({...cvData, educations: [...cvData.educations, { id: Date.now(), degree: '', institution: '', date: '', score: '', details: [''] }]});
  };

  const addExperience = () => {
    setCvData({...cvData, experiences: [...cvData.experiences, { id: Date.now(), title: '', date: '', organization: '', location: '', tasks: [''] }]});
  };

  const addWork = () => {
    setCvData({...cvData, workExperiences: [...cvData.workExperiences, { id: Date.now(), title: '', date: '', organization: '', location: '', tasks: [''] }]});
  };

  const getPaperDimensions = () => {
    if (paperSize === 'A4') return { width: '210mm' };
    if (paperSize === 'A5') return { width: '148mm' };
    if (paperSize === 'F4') return { width: '215.9mm' };
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden font-sans">
      
      {/* KIRI: PANEL EDITOR */}
      <div className="w-1/2 h-full overflow-y-auto bg-white border-r p-6 no-print shadow-lg z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">CV Builder ATS Friendly</h1>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">Live Editor</span>
        </div>

        {/* PENGATURAN KERTAS & MARGIN */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
          <h3 className="font-semibold mb-3">Pengaturan Dokumen</h3>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ukuran Kertas:</label>
              <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className="border rounded p-1 bg-white">
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="F4">F4 / Folio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Margin (Tepi):</label>
              <select value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="border rounded p-1 bg-white">
                <option value={1}>1 cm (Sempit)</option>
                <option value={1.27}>1.27 cm (Sedang)</option>
                <option value={2}>2 cm (Standar)</option>
              </select>
            </div>
          </div>
          <button onClick={handlePrint} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition">
            🖨️ Cetak / Simpan PDF
          </button>
        </div>

        {/* DATA DIRI */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Data Diri & Kontak</h3>
        <div className="flex flex-col gap-3 mb-8">
          <input type="text" placeholder="Nama Lengkap" value={cvData.name} onChange={(e) => setCvData({...cvData, name: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Alamat" value={cvData.address} onChange={(e) => setCvData({...cvData, address: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Email" value={cvData.email} onChange={(e) => setCvData({...cvData, email: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Nomor Telepon" value={cvData.phone} onChange={(e) => setCvData({...cvData, phone: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="LinkedIn" value={cvData.linkedin} onChange={(e) => setCvData({...cvData, linkedin: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Link Portofolio" value={cvData.portfolio} onChange={(e) => setCvData({...cvData, portfolio: e.target.value})} className="border p-2 rounded" />
          <textarea placeholder="Ringkasan Profil" value={cvData.summary} onChange={(e) => setCvData({...cvData, summary: e.target.value})} className="border p-2 rounded h-24" />
        </div>

        {/* PENDIDIKAN */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pendidikan</h3>
        {cvData.educations.map((edu, idx) => (
          <div key={edu.id} className="bg-gray-50 p-4 rounded border mb-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="Jenjang/Jurusan" value={edu.degree} onChange={(e) => {
                const newEdu = [...cvData.educations]; newEdu[idx].degree = e.target.value; setCvData({...cvData, educations: newEdu});
              }} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Tahun" value={edu.date} onChange={(e) => {
                const newEdu = [...cvData.educations]; newEdu[idx].date = e.target.value; setCvData({...cvData, educations: newEdu});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="Nama Institusi" value={edu.institution} onChange={(e) => {
                const newEdu = [...cvData.educations]; newEdu[idx].institution = e.target.value; setCvData({...cvData, educations: newEdu});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="IPK / Nilai" value={edu.score} onChange={(e) => {
                const newEdu = [...cvData.educations]; newEdu[idx].score = e.target.value; setCvData({...cvData, educations: newEdu});
              }} className="border p-2 rounded" />
            </div>
          </div>
        ))}
        <button onClick={addEducation} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-8">+ Tambah Pendidikan</button>

        {/* PENGALAMAN ORGANISASI */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pengalaman Organisasi & Kepanitiaan</h3>
        {cvData.experiences.map((exp, expIndex) => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded border mb-4 relative">
            <button onClick={() => {
              const newExp = [...cvData.experiences]; newExp.splice(expIndex, 1); setCvData({...cvData, experiences: newExp});
            }} className="absolute top-3 right-3 text-red-500 text-sm font-bold">Hapus</button>
            <div className="grid grid-cols-2 gap-2 mb-2 pr-16">
              <input type="text" placeholder="Jabatan" value={exp.title} onChange={(e) => {
                const newExp = [...cvData.experiences]; newExp[expIndex].title = e.target.value; setCvData({...cvData, experiences: newExp});
              }} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Waktu" value={exp.date} onChange={(e) => {
                const newExp = [...cvData.experiences]; newExp[expIndex].date = e.target.value; setCvData({...cvData, experiences: newExp});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="Nama Organisasi / Acara" value={exp.organization} onChange={(e) => {
                const newExp = [...cvData.experiences]; newExp[expIndex].organization = e.target.value; setCvData({...cvData, experiences: newExp});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="Lokasi" value={exp.location} onChange={(e) => {
                const newExp = [...cvData.experiences]; newExp[expIndex].location = e.target.value; setCvData({...cvData, experiences: newExp});
              }} className="border p-2 rounded" />
            </div>
            
            <div className="mt-3">
              <label className="text-sm font-semibold text-gray-700">Tugas / Pencapaian:</label>
              {exp.tasks.map((task, tIdx) => (
                <div key={tIdx} className="flex gap-2 mt-2">
                  <span className="mt-2 text-gray-400">•</span>
                  <input type="text" value={task} onChange={(e) => {
                    const newExp = [...cvData.experiences]; newExp[expIndex].tasks[tIdx] = e.target.value; setCvData({...cvData, experiences: newExp});
                  }} className="border p-2 rounded w-full" placeholder="Tulis kalimat..." />
                  <button onClick={() => {
                    const newExp = [...cvData.experiences]; newExp[expIndex].tasks.splice(tIdx, 1); setCvData({...cvData, experiences: newExp});
                  }} className="bg-red-100 text-red-600 px-3 rounded font-bold">X</button>
                </div>
              ))}
              <button onClick={() => {
                const newExp = [...cvData.experiences]; newExp[expIndex].tasks.push(''); setCvData({...cvData, experiences: newExp});
              }} className="mt-2 text-blue-600 text-sm font-semibold">+ Tambah Kalimat Tugas</button>
            </div>
          </div>
        ))}
        <button onClick={addExperience} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-8">+ Tambah Pengalaman</button>

        {/* PENGALAMAN KERJA */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pengalaman Kerja / Praktik</h3>
        {cvData.workExperiences.map((work, wIndex) => (
          <div key={work.id} className="bg-gray-50 p-4 rounded border mb-4 relative">
            <button onClick={() => {
              const newWork = [...cvData.workExperiences]; newWork.splice(wIndex, 1); setCvData({...cvData, workExperiences: newWork});
            }} className="absolute top-3 right-3 text-red-500 text-sm font-bold">Hapus</button>
            <div className="grid grid-cols-2 gap-2 mb-2 pr-16">
              <input type="text" placeholder="Jabatan" value={work.title} onChange={(e) => {
                const newWork = [...cvData.workExperiences]; newWork[wIndex].title = e.target.value; setCvData({...cvData, workExperiences: newWork});
              }} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Waktu" value={work.date} onChange={(e) => {
                const newWork = [...cvData.workExperiences]; newWork[wIndex].date = e.target.value; setCvData({...cvData, workExperiences: newWork});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="Perusahaan / Instansi" value={work.organization} onChange={(e) => {
                const newWork = [...cvData.workExperiences]; newWork[wIndex].organization = e.target.value; setCvData({...cvData, workExperiences: newWork});
              }} className="border p-2 rounded" />
              <input type="text" placeholder="Lokasi" value={work.location} onChange={(e) => {
                const newWork = [...cvData.workExperiences]; newWork[wIndex].location = e.target.value; setCvData({...cvData, workExperiences: newWork});
              }} className="border p-2 rounded" />
            </div>
            <div className="mt-3">
              <label className="text-sm font-semibold text-gray-700">Tugas / Tanggung Jawab:</label>
              {work.tasks.map((task, tIdx) => (
                <div key={tIdx} className="flex gap-2 mt-2">
                  <span className="mt-2 text-gray-400">•</span>
                  <input type="text" value={task} onChange={(e) => {
                    const newWork = [...cvData.workExperiences]; newWork[wIndex].tasks[tIdx] = e.target.value; setCvData({...cvData, workExperiences: newWork});
                  }} className="border p-2 rounded w-full" placeholder="Tulis kalimat..." />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={addWork} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-8">+ Tambah Pengalaman Kerja</button>

        {/* SERTIFIKASI */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pelatihan dan Sertifikasi</h3>
        <div className="flex flex-col gap-2 mb-8">
          {cvData.certifications.map((cert, cIdx) => (
            <div key={cIdx} className="flex gap-2">
              <input type="text" value={cert} onChange={(e) => {
                const newCerts = [...cvData.certifications]; newCerts[cIdx] = e.target.value; setCvData({...cvData, certifications: newCerts});
              }} className="border p-2 rounded w-full" />
              <button onClick={() => {
                const newCerts = [...cvData.certifications]; newCerts.splice(cIdx, 1); setCvData({...cvData, certifications: newCerts});
              }} className="bg-red-100 text-red-600 px-3 rounded font-bold">X</button>
            </div>
          ))}
          <button onClick={() => setCvData({...cvData, certifications: [...cvData.certifications, '']})} className="text-blue-600 text-sm font-semibold">+ Tambah Sertifikasi</button>
        </div>

        {/* KETERAMPILAN */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Keterampilan</h3>
        <div className="mb-10">
          <label className="block text-sm font-semibold mb-2">Keterampilan Digital:</label>
          <input type="text" value={cvData.digitalSkills.join(', ')} onChange={(e) => {
            setCvData({...cvData, digitalSkills: e.target.value.split(',').map(s => s.trim())});
          }} className="border p-2 rounded w-full mb-4" />

          <label className="block text-sm font-semibold mb-2">Soft Skills:</label>
          <input type="text" value={cvData.softSkills.join(', ')} onChange={(e) => {
            setCvData({...cvData, softSkills: e.target.value.split(',').map(s => s.trim())});
          }} className="border p-2 rounded w-full" />
        </div>
      </div>

      {/* KANAN: PRATINJAU KERTAS (DIBUAT SCROLLABLE PENUH KE BAWAH) */}
      <div className="w-1/2 h-full overflow-y-auto p-8 flex flex-col items-center print-area bg-gray-100">
        <div 
          className="bg-white shadow-xl text-[10.5pt] mb-12"
          style={{
            width: getPaperDimensions().width,
            padding: `${margin}cm`,
            fontFamily: "'Times New Roman', Times, serif",
            color: "black",
            lineHeight: "1.15",
            minHeight: '297mm'
          }}
        >
          {/* HEADER */}
          <div className="text-center mb-2 cv-section-item">
            <h1 className="text-[15pt] font-bold uppercase mb-0.5">{cvData.name}</h1>
            <p className="text-[9.5pt]">
              {cvData.address} | {cvData.email} | {cvData.phone} <br/>
              {cvData.linkedin} | {cvData.portfolio}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="mb-2 cv-section-item">
            <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Ringkasan Profil</h2>
            <p className="text-justify text-[10pt]">{cvData.summary}</p>
          </div>

          {/* EDUCATION */}
          <div className="mb-2 cv-section-item">
            <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pendidikan</h2>
            {cvData.educations.map((edu, idx) => (
              <div key={idx} className="mb-1.5">
                <div className="flex justify-between font-bold text-[10pt]">
                  <span>{edu.degree}</span>
                  <span>{edu.date}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-0.5">
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
          <div className="mb-2 cv-section-item">
            <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pengalaman Organisasi & Kepanitiaan</h2>
            {cvData.experiences.map((exp, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between font-bold text-[10pt]">
                  <span>{exp.title}</span>
                  <span>{exp.date}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-0.5">
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

          {/* WORK EXPERIENCE */}
          {cvData.workExperiences.length > 0 && (
            <div className="mb-2 cv-section-item">
              <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pengalaman Kerja</h2>
              {cvData.workExperiences.map((work, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between font-bold text-[10pt]">
                    <span>{work.title}</span>
                    <span>{work.date}</span>
                  </div>
                  <div className="flex justify-between italic text-[10pt] mb-0.5">
                    <span>{work.organization}</span>
                    <span>{work.location}</span>
                  </div>
                  <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                    {work.tasks.map((task, tIndex) => (
                      task.trim() !== '' && <li key={tIndex} className="mb-0">{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          <div className="mb-2 cv-section-item">
            <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Pelatihan dan Sertifikasi</h2>
            <ul className="list-disc pl-4 m-0 text-[9.5pt]">
              {cvData.certifications.map((cert, index) => (
                cert.trim() !== '' && <li key={index} className="mb-0">{cert}</li>
              ))}
            </ul>
          </div>

          {/* SKILLS */}
          <div className="cv-section-item">
            <h2 className="text-[10.5pt] font-bold uppercase border-b border-black mb-1 pb-0">Keterampilan</h2>
            <div className="text-[9.5pt] mb-0.5">
              <span className="font-bold">Keterampilan Digital: </span>
              {cvData.digitalSkills.join(', ')}
            </div>
            <div className="text-[9.5pt]">
              <span className="font-bold">Soft Skills: </span>
              {cvData.softSkills.join(', ')}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
