import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Register = lazy(() => import('./components/Student/Register'));
const Login = lazy(() => import('./components/Student/Login'));
const StudentProfile = lazy(() => import('./components/Student/StudentProfile'));
const OutpassQRcode = lazy(() => import('./components/Student/OutpassQRcode'));
const History = lazy(() => import('./components/Student/NavBar/History'));

const WardenRegister = lazy(() => import('./components/Warden/WardenRegister'));
const WardernLogin = lazy(() => import('./components/Warden/WardenLogin'));
const WardernProfile = lazy(() => import('./components/Warden/WardernProfile'));

const GatekepperLogin = lazy(() => import('./components/GateKeeper/GatekepperLogin'));
const GatekeeperRegister = lazy(() => import('./components/GateKeeper/GatekeeperRegister'));
const GatekeeperProfile = lazy(() => import('./components/GateKeeper/GatekeeperProfile'));

import Test from './components/test';
import Home from './components/Home';
import Loding2 from './components/Loding/Loding2';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="user/login" element={<Login />} />
          <Route path="user/register" element={<Register />} />
          <Route path="user/profile" element={<StudentProfile />} />
          <Route path="user/profile/qrcode" element={<OutpassQRcode />} />
          <Route path="user/profile/history" element={<History />} />

          <Route path="wardern/login" element={<WardernLogin />} />
          <Route path="wardern/register" element={<WardenRegister />} />
          <Route path="wardern/profile" element={<WardernProfile />} />
          <Route path="/" element={<Test />} />

          <Route path="gatekeeper/login" element={<GatekepperLogin />} />
          <Route path="gatekeeper/register" element={<GatekeeperRegister />} />
          <Route path="gatekeeper/profile" element={<GatekeeperProfile />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
