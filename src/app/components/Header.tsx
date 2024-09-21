'use client';

import React, { useState, useEffect } from 'react';
import '../styles/header.scss';

export default function Header() {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const userName = prompt("Digite seu nome:") || "Usuário";
    setName(userName);

    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedDateTime = now.toLocaleDateString('pt-BR', options);
      setDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="welcome-message">
        <h1>Seja bem vindo, {name}!</h1>
      </div>
      <div className="date-time">
        <p>{dateTime}</p>
      </div>
    </header>
  );
}
