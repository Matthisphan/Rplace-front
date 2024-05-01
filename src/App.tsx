import { useState } from 'react';
import Layout from './layout';
import Grid from './components/Grid';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem('tokens') as string) || '');
  const setTokens = (data: any) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authTokens ? <Navigate to="/grid" /> : <Navigate to="/login" />} />
          <Route
            path="/grid"
            element={
              <Layout>
                <Grid />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
