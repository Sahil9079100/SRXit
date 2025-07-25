import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Seperate_Socket_Listeners } from './Socket_code';

const Register = lazy(() => import('./components/Student/Register'));
const Login = lazy(() => import('./components/Student/Login'));
const StudentProfile = lazy(() => import('./components/Student/StudentProfile'));
const OutpassQRcode = lazy(() => import('./components/Student/OutpassQRcode'));
const History = lazy(() => import('./components/Student/NavBar/History'));
const EditDetails = lazy(() => import('./components/Student/NavBar/EditDetails'));

const WardenRegister = lazy(() => import('./components/Warden/WardenRegister'));
const WardernLogin = lazy(() => import('./components/Warden/WardenLogin'));
const WardernProfile = lazy(() => import('./components/Warden/WardernProfile'));

const GatekepperLogin = lazy(() => import('./components/GateKeeper/GatekepperLogin'));
const GatekeeperRegister = lazy(() => import('./components/GateKeeper/GatekeeperRegister'));
const GatekeeperProfile = lazy(() => import('./components/GateKeeper/GatekeeperProfile'));

const Visitor = lazy(() => import('./components/visitor/Visitor'));

import Test from './components/test';
import Home from './components/Home';
import Loding2 from './components/Loding/Loding2';
// import socket from './socket';

function App() {

  useEffect(() => {
    console.log("App component mounted");
        Seperate_Socket_Listeners();
    }, []);
  return (
    <Suspense>
      <Router>
        <Routes>
          {/* <Route path="/test" element={<EditDetails />} /> */}

          <Route path="user/login" element={<Login />} />
          <Route path="user/register" element={<Register />} />
          <Route path="user/profile" element={<StudentProfile />} />
          <Route path="user/profile/qrcode" element={<OutpassQRcode />} />
          <Route path="user/profile/history" element={<History />} />
          <Route path="user/profile/profileDetails" element={<History />} />
          <Route path="user/profile/aboutUs" element={<History />} />

          <Route path="wardern/login" element={<WardernLogin />} />
          <Route path="wardern/register" element={<WardenRegister />} />
          <Route path="wardern/profile" element={<WardernProfile />} />
          <Route path="/" element={<Home />} />

          <Route path="gatekeeper/login" element={<GatekepperLogin />} />
          <Route path="gatekeeper/register" element={<GatekeeperRegister />} />
          <Route path="gatekeeper/profile" element={<GatekeeperProfile />} />

          <Route path="/visitor" element={<Visitor />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
