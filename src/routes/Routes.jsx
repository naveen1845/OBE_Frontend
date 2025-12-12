import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "../components/ProtectedRoutes/ProtectedRoute";
import Layout from "../components/Layout";
import Dashboard from "../pages/HOD/Dashboard";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        {/* <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/courses" element={
          <ProtectedRoute allowedRoles={['HOD', 'ADMIN']}>
            <Layout>
              <CourseManagement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/clos" element={
          <ProtectedRoute allowedRoles={['HOD', 'FACULTY']}>
            <Layout>
              <CLOManagement />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/pos" element={
          <ProtectedRoute allowedRoles={['HOD', 'ADMIN']}>
            <Layout>
              <POManagement />
            </Layout>
          </ProtectedRoute>
        } /> */}

        <Route path='*' element={<NotFound />}/>
      </Routes>
    );
};