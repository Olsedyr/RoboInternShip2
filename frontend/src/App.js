import React, { useState, useEffect } from 'react';
import './App.css';

// Importing images
import headerImage from './assets/header.png';
import applicationIcon from './assets/ApplicationIcon.png';
import explorerIcon from './assets/explorer.png';
import usersIcon from './assets/users.png';
import settingsIcon from './assets/settings.png';
import controlsIcon from './assets/Controlspng.png';
import statusIcon from './assets/status.png';
import robotImage from './assets/robot.png'; // Add this image

function App() {
    const [data, setData] = useState({ timestamps: [], values: [] });
    const [activePage, setActivePage] = useState('application');
    const [programs, setPrograms] = useState([
        { id: 1, name: 'Program 1' },
        { id: 2, name: 'Program 2' },
        { id: 3, name: 'Program 3' },
    ]);
    const [programSteps, setProgramSteps] = useState([
        {
            programId: 1,
            steps: [
                'Robot ready',
                'Robot turn 90 degrees',
                'Robot pickup item',
                'Robot set item',
                'Robot move to destination',
                'Robot release item',
                'Robot return to start',
            ],
        },
        {
            programId: 2,
            steps: [
                'Sensor calibration',
                'Activate heater',
                'Start rotation',
                'Adjust speed',
                'Perform safety check',
                'Start cooling system',
            ],
        },
    ]);
    const [selectedProgramId, setSelectedProgramId] = useState(1);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepStatus, setStepStatus] = useState(
        Array(7).fill('Pending') // Default 7 steps
    );
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showControls, setShowControls] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        // Reset to the first step when a program is selected
        setCurrentStepIndex(0);
        const steps = programSteps.find(
            (program) => program.programId === selectedProgramId
        )?.steps;
        setStepStatus(steps ? Array(steps.length).fill('Pending') : []);
    }, [selectedProgramId]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        alert(`Logged in as ${username}`);
    };

    const runProgram = () => {
        const steps = programSteps.find(
            (program) => program.programId === selectedProgramId
        )?.steps;

        if (steps) {
            steps.forEach((step, index) => {
                setTimeout(() => {
                    setStepStatus((prevStatus) => {
                        const updatedStatus = [...prevStatus];
                        updatedStatus[index] = 'Running';
                        return updatedStatus;
                    });

                    setTimeout(() => {
                        setStepStatus((prevStatus) => {
                            const updatedStatus = [...prevStatus];
                            updatedStatus[index] = 'Completed';
                            return updatedStatus;
                        });
                    }, 1000);
                }, index * 2000);
            });
        }
    };

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    const adjustPosition = (axis, value) => {
        setPosition(prev => ({
            ...prev,
            [axis]: Math.max(0, Math.min(100, prev[axis] + value))
        }));
    };

    return (
        <div className="app-container">
            {/* Header Section */}
            <header className="app-header">
                <img src={headerImage} alt="Header" className="header-image" />
            </header>

            <div className="app-body">
                {/* Sidebar (Left) */}
                <aside className="app-sidebar">
                    <nav>
                        <ul>
                            <li>
                                <div
                                    className={`sidebar-item ${activePage === 'application' ? 'active' : ''}`}
                                    onClick={() => setActivePage('application')}
                                >
                                    <img src={applicationIcon} alt="Application" className="sidebar-icon" />
                                    <span>Application</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`sidebar-item ${activePage === 'programs' ? 'active' : ''}`}
                                    onClick={() => setActivePage('programs')}
                                >
                                    <img src={explorerIcon} alt="Programs" className="sidebar-icon" />
                                    <span>Programs</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`sidebar-item ${activePage === 'users' ? 'active' : ''}`}
                                    onClick={() => setActivePage('users')}
                                >
                                    <img src={usersIcon} alt="Users" className="sidebar-icon" />
                                    <span>Users</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Section */}
                <main className="app-main">
                    {activePage === 'application' && (
                        <div className="dashboard">
                            <h2>Program Actions</h2>
                            <div className="program-steps">
                                <h3>Steps for {programs.find((prog) => prog.id === selectedProgramId)?.name}</h3>
                                <div className="steps-container">
                                    {programSteps
                                        .find((program) => program.programId === selectedProgramId)
                                        ?.steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className={`step-box ${stepStatus[index].toLowerCase()}`}
                                            >
                                                <div className="step-number">{index + 1}</div>
                                                <div className="step-content">
                                                    <div className="step-name">{step}</div>
                                                    <div className="step-status">{stepStatus[index]}</div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <button onClick={runProgram} className="run-button">Run Program</button>
                            </div>
                        </div>
                    )}

                    {activePage === 'programs' && (
                        <div className="programs">
                            <h2>Programs</h2>
                            <table className="programs-table">
                                <thead>
                                <tr>
                                    <th>Program Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {programs.map((program) => (
                                    <tr key={program.id}>
                                        <td>{program.name}</td>
                                        <td>
                                            <button onClick={() => setSelectedProgramId(program.id)}>
                                                View Steps
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button onClick={() => {}}>Add Program</button>
                        </div>
                    )}

                    {activePage === 'users' && (
                        <div className="login-form">
                            <h2>Login</h2>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="input-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Login</button>
                            </form>
                        </div>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="app-right-sidebar">
                    <div className="right-option">
                        <img src={settingsIcon} alt="Settings" className="icon" />
                        <span>Settings</span>
                    </div>
                    <div className="right-option" onClick={toggleControls}>
                        <img src={controlsIcon} alt="Controls" className="icon" />
                        <span>Controls</span>
                    </div>
                    <div className="right-option">
                        <img src={statusIcon} alt="Status" className="icon" />
                        <span>Status</span>
                    </div>
                </aside>

                {/* Control Panel */}
                {showControls && (
                    <div className="control-panel">
                        <div className="control-panel-header">
                            <h3>Robot Controls</h3>
                            <button onClick={toggleControls} className="close-button">×</button>
                        </div>
                        <div className="robot-image-container">
                            <img src={robotImage} alt="Robot" className="robot-image" />
                        </div>
                        <div className="axis-controls">
                            {['x', 'y', 'z'].map((axis) => (
                                <div key={axis} className="axis-control">
                                    <span className="axis-label">{axis.toUpperCase()} Axis:</span>
                                    <div className="axis-buttons">
                                        <button onClick={() => adjustPosition(axis, -5)}>-</button>
                                        <span className="axis-value">{position[axis]}%</span>
                                        <button onClick={() => adjustPosition(axis, 5)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;