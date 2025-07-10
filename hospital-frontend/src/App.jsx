import React, { useEffect, useState } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: '' });

  const getPatients = async () => {
    const res = await fetch('http://localhost:8080/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  const addPatient = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: '', age: '', gender: '' });
      getPatients();
    }
  };

  const deletePatient = async (id) => {
    const res = await fetch(`http://localhost:8080/api/patients/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      getPatients();
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '40px 30px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#1976d2', marginBottom: '25px' }}>🏥 Hospital Patient System</h2>

        <form
          onSubmit={addPatient}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '30px'
          }}
        >
          <input
            type="text"
            placeholder="Enter Patient Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="number"
            placeholder="Enter Age"
            value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })}
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          <select
            value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })}
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            type="submit"
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '12px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ➕ Add Patient
          </button>
        </form>

        <h3 style={{ marginBottom: '15px', color: '#333' }}>🧾 Current Patients</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {patients.map(p => (
            <li
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                color: '#444'
              }}
            >
              <span>
                <strong>{p.name}</strong> — {p.age} yrs, {p.gender}
              </span>
              <button
                onClick={() => deletePatient(p.id)}
                style={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer'
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;