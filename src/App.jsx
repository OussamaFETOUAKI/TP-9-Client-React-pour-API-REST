import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <div className="container my-5">
      <div className="p-4 mb-4 bg-light rounded-3 shadow-sm text-center">
        <h1 className="display-6 fw-bold text-primary">Gestion des Comptes Bancaires</h1>
        <p className="lead text-secondary mb-0">Client React pour API REST Spring Boot</p>
      </div>
      <CompteForm />
      <CompteList />
    </div>
  );
}

export default App;
