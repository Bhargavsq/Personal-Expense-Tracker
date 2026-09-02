import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Calendar from "./pages/Calendar";
import Analysis from "./pages/Analysis";
import Budgets from "./pages/Budgets";
import Bills from "./pages/Bills";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main Application */}
                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <DashboardLayout>
                            <Transactions />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <DashboardLayout>
                            <Calendar />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/analysis"
                    element={
                        <DashboardLayout>
                            <Analysis />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/budgets"
                    element={
                        <DashboardLayout>
                            <Budgets />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/bills"
                    element={
                        <DashboardLayout>
                            <Bills />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/goals"
                    element={
                        <DashboardLayout>
                            <Goals />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <DashboardLayout>
                            <Reports />
                        </DashboardLayout>
                    }
                />

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;