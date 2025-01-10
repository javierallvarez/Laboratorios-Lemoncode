import React from 'react';
import logo from './logo.png';

const App: React.FC = () => {
    return (
        <div>
            <img src={logo} alt="Logo" className="logo" />
            <h1>Hola Mundo!</h1>
        </div>
    );
};

export default App;