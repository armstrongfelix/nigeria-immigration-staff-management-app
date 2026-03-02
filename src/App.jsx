import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StaffList from "./pages/StaffList";
import StaffProfile from "./pages/StaffProfile";
import AddStaff from "./pages/AddStaff";
import Layoutt from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="staff" element={<StaffList />} />
        <Route path="staff/add" element={<AddStaff />} />
        <Route path="staff/:id" element={<StaffProfile />} />
      </Route>
    </Routes>
  );
}
