import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// ⚠️ GANTI DENGAN CONFIG FIREBASE MILIKMU
const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "123456789",
  appId: "APP_ID_KAMU"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // State Pengaturan Kertas & Margin
  const [paperSize, setPaperSize] = useState('A4'); // A4, A5, F4
  const [margin, setMargin] = useState(2); // 1, 1.27, atau 2 cm

  // State Data CV
  const [cvData, setCvData] = useState({
    name: 'Haniyyah Salwa Amatullah',
    address: 'Keputih, Sukolilo, Surabaya',
    email: '5001241080@student.its.ac.id',
    phone: '(62)813-6219-2288',
    linkedin: 'in/hnysalwa',
    portfolio: 'https://intip.in/Portovolio Salwa',
    summary: 'Mahasiswa Program Studi Fisika Institut Teknologi Sepuluh Nopember (ITS) angkatan 2024 yang memiliki minat dan pengalaman dalam manajemen acara, pengembangan sumber daya manusia (PSDM), serta koordinasi tim.',
    experiences: [
      {
        id: 1,
        title: 'Staff Event',
        date: 'Agust 2025 - Nov 2025',
        organization: 'Physic Summit 2025',
        location: 'Surabaya, Jawa Timur',
        tasks: [
          'Menyusun rundown beserta kebutuhan teknis welcome party',
          'Menjadi MC Technical Meeting Physics Summit Olympiad (PSO)'
        ]
      }
    ]
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experiences: [...cvData.experiences, { id: Date.now(), title: '', date: '', organization: '', location: '', tasks: [''] }]
    });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...cvData.experiences];
    newExp[index][field] = value;
    setCvData({ ...cvData, experiences: newExp });
  };

  const removeExperience = (index) => {
    const newExp = [...cvData.experiences];
    newExp.splice(index, 1);
    setCvData({ ...cvData, experiences: newExp });
  };

  const addTask = (expIndex) => {
    const newExp = [...cvData.experiences];
    newExp[expIndex].tasks.push('');
    setCvData({ ...cvData, experiences: newExp });
  };

  const updateTask = (expIndex, taskIndex, value) => {
    const newExp = [...cvData.experiences];
    newExp[expIndex].tasks[taskIndex] = value;
    setCvData({ ...cvData, experiences: newExp });
  };

  const removeTask = (expIndex, taskIndex) => {
    const newExp = [...cvData.experiences];
    newExp[expIndex].tasks.splice(taskIndex, 1);
    setCvData({ ...cvData, experiences: newExp });
  };

  const getPaperDimensions = () => {
    if (paperSize === 'A4') return { width: '210mm', minHeight: '297mm' };
    if (paperSize === 'A5') return { width: '148mm', minHeight: '210mm' };
    if (paperSize === 'F4') return { width: '215.9mm', minHeight: '330.2mm' };
  };

  // HALAMAN LOGIN / REGISTER
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login CV Builder' : 'Daftar Akun'}</h2>
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold">
              {isLogin ? 'Masuk' : 'Buat Akun'}
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm text-blue-500 w-full text-center">
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login'}
          </button>
        </div>
      </div>
    );
  }

  // HALAMAN UTAMA BUILDER
  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden font-sans">
      
      {/* KIRI: PANEL EDITOR */}
      <div className="w-1/2 h-full overflow-y-auto bg-white border-r p-6 no-print shadow-lg z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editor CV</h1>
          <button onClick={() => signOut(auth)} className="text-red-500 text-sm font-semibold hover:underline">Logout</button>
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

        <h3 className="font-bold text-lg border-b pb-2 mb-4">Data Diri</h3>
        <div className="flex flex-col gap-3 mb-8">
          <input type="text" placeholder="Nama Lengkap" value={cvData.name} onChange={(e) => setCvData({...cvData, name: e.target.value})} className="border p-2 rounded" />
          <textarea placeholder="Ringkasan Profil" value={cvData.summary} onChange={(e) => setCvData({...cvData, summary: e.target.value})} className="border p-2 rounded h-24" />
        </div>

        <h3 className="font-bold text-lg border-b pb-2 mb-4">Pengalaman / Kepanitiaan</h3>
        {cvData.experiences.map((exp, expIndex) => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded border mb-4 relative">
            <button onClick={() => removeExperience(expIndex)} className="absolute top-3 right-3 text-red-500 font-bold hover:text-red-700">Hapus Pengalaman</button>
            <div className="grid grid-cols-2 gap-2 mb-2 pr-24">
              <input type="text" placeholder="Jabatan" value={exp.title} onChange={(e) => updateExperience(expIndex, 'title', e.target.value)} className="border p-2 rounded font-bold" />
              <input type="text" placeholder="Waktu (cth: Jun - Nov 2025)" value={exp.date} onChange={(e) => updateExperience(expIndex, 'date', e.target.value)} className="border p-2 rounded" />
              <input type="text" placeholder="Nama Acara/Organisasi" value={exp.organization} onChange={(e) => updateExperience(expIndex, 'organization', e.target.value)} className="border p-2 rounded" />
              <input type="text" placeholder="Lokasi" value={exp.location} onChange={(e) => updateExperience(expIndex, 'location', e.target.value)} className="border p-2 rounded" />
            </div>
            
            <div className="mt-3">
              <label className="text-sm font-semibold text-gray-700">Tugas / Pencapaian (1 Kolom = 1 Kalimat):</label>
              {exp.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex gap-2 mt-2">
                  <span className="mt-2 text-gray-400">•</span>
                  <input type="text" value={task} onChange={(e) => updateTask(expIndex, taskIndex, e.target.value)} className="border p-2 rounded w-full" placeholder="Tulis kalimat tugas..." />
                  <button onClick={() => removeTask(expIndex, taskIndex)} className="bg-red-100 text-red-600 px-3 rounded hover:bg-red-200 font-bold">X</button>
                </div>
              ))}
              <button onClick={() => addTask(expIndex)} className="mt-2 text-blue-600 text-sm font-semibold hover:underline">
                + Tambah Kalimat
              </button>
            </div>
          </div>
        ))}
        <button onClick={addExperience} className="w-full border-2 border-dashed border-gray-400 text-gray-600 font-bold py-2 rounded hover:bg-gray-50 mb-10">
          + Tambah Pengalaman Baru
        </button>
      </div>

      {/* KANAN: PRATINJAU KERTAS */}
      <div className="w-1/2 h-full overflow-y-auto p-8 flex justify-center print-area">
        <div 
          className="bg-white shadow-xl transition-all duration-300"
          style={{
            width: getPaperDimensions().width,
            minHeight: getPaperDimensions().minHeight,
            padding: `${margin}cm`,
            fontFamily: "'Times New Roman', Times, serif",
            color: "black"
          }}
        >
          {/* HEADER */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold uppercase mb-1">{cvData.name}</h1>
            <p className="text-sm">
              {cvData.address} | {cvData.email} | {cvData.phone} <br/>
              {cvData.linkedin} | {cvData.portfolio}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="mb-4">
            <h2 className="text-[13px] font-bold uppercase border-b border-black mb-2 pb-0.5">Ringkasan Profil</h2>
            <p className="text-sm text-justify leading-snug">{cvData.summary}</p>
          </div>

          {/* EXPERIENCES */}
          <div>
            <h2 className="text-[13px] font-bold uppercase border-b border-black mb-2 pb-0.5">Pengalaman</h2>
            {cvData.experiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{exp.title}</span>
                  <span>{exp.date}</span>
                </div>
                <div className="flex justify-between text-sm mb-1 italic">
                  <span>{exp.organization}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc pl-5 text-sm m-0">
                  {exp.tasks.map((task, tIndex) => (
                    task.trim() !== '' && <li key={tIndex} className="mb-0.5">{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}