// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Tech from "./pages/Tech";
import AboutUs from "./pages/AboutUs";
import PostDetail from "./pages/PostDetail";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import { AdminDashboard } from "@/pages/managementpage/AdminDashBoard";
import { ProtectedRoute } from "@/pages/managementpage/ProtectedRoute";
import Header from "./components/Header";
import Tags from "./pages/Tags";
import TagPosts from "./pages/TagPosts";
import Test from "./pages/Test";
import { Layout } from "./components/Sidebar/Layout";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/posts/:postSlug" element={<PostDetail />} />
        </Routes>
        <Layout>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Home />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/:slug" element={<TagPosts />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/subject" element={<Subject />} />
            <Route path="/subject/:subjectName" element={<Subject />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/tech/:techName" element={<Tech />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
