// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ControlSlider from './components/ControlSlider';
import DataChart from './components/DataChart';
import headerImage from './assets/header.png'; // Adjust the filename if different

function App() {
    const [data, setData] = useState({ timestamps: [], values: [] });

    useEffect(() => {
        fetch('/api/data')
            .then((response) => response.json())
            .then((data) => {
                setData({
                    timestamps: data.timestamps,  // Example structure from your Modbus data
                    values: data.values,
                });
            });
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <img src={headerImage} alt="Header" className="header-image" />
            </header>

            <div className="app-body">
                <aside className="app-sidebar">
                    <nav>
                        <ul>
                            <li><button>Dashboard</button></li>
                            <li><button>Settings</button></li>
                            <li><button>Control</button></li>
                            <li><button>Logs</button></li>
                        </ul>
                    </nav>
                </aside>

                <main className="app-main">
                    <div className="dashboard">
                        <h2>Live Data</h2>
                        <DataChart data={data} />
                        <ControlSlider />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
