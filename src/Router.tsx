import { Route, Routes } from 'react-router-dom';
import { Homepage, Login } from './pages';
import { Viagens, Roles, Caminhoes, Postos, Rotas } from './pages/Admin';
// import { AuthProvider } from './shared/context/Authentication';
import { ColaboratorLayout } from './shared/layouts/CollaboratorLayout';
import { Dashboard } from './pages/Admin/Dashboard/Dashboard';
import store from './redux/store';

export const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Routes>
        {/* LandingPage Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        {/* Collaborator Routes */}
        {/* Privar rotas quando houver sistema de atutenticação */}
        <Route path="/usuario/" element={<ColaboratorLayout />}>
          <Route path="/usuario/dashboard" element={<Dashboard />} />
          <Route path="/usuario/viagens" element={<Viagens />} />
          <Route path="/usuario/efetivo" element={<Roles />} />
          <Route path="/usuario/caminhoes" element={<Caminhoes />} />
          <Route path="/usuario/postos" element={<Postos />} />
          <Route path="/usuario/rotas" element={<Rotas />} />
        </Route>
      </Routes>
    </Provider>
  );
};
