import React from 'react';
import AppNavigator from './navigation/AppNavigator';
// import { clearDatabase } from './db/db'; // Ajusta la ruta según tu proyecto

// clearDatabase().then(() => console.log("DB reseteada"));


export default function App() {
  return <AppNavigator />;
}
