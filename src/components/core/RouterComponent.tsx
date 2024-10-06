import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../home/HomePage';
import { LoginPage } from '../login/LoginPage';
import { RegisterPage } from '../register/RegisterPage';
import { EditUserComponent } from "../edit/EditUserComponent";
import { EmailComponent } from '../email/EmailComponent';
import PrivateRouteWrapper from './PrivateRouteWrapper';
import QrComponent from '../qr/QrComponent';
import UsersPage from '../users/UsersPage';

const wrapInPrivateRoute = (Component: React.ElementType) => {
    return <PrivateRouteWrapper>
        {<Component />}
    </PrivateRouteWrapper>
}

function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={wrapInPrivateRoute(HomePage)} />
            <Route path="/users" element={wrapInPrivateRoute(UsersPage)} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/edit-user" element={wrapInPrivateRoute(EditUserComponent)} />
            <Route path="/qr" element={wrapInPrivateRoute(QrComponent)} />
            <Route path="/email" element={wrapInPrivateRoute(EmailComponent)} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default RoutesComponent;
