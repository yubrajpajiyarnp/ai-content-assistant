import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import CreateContent from "./pages/CreateContent";
import EditContent from "./pages/EditContent";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateContent />} />
        <Route path="/edit/:id" element={<EditContent />} />
        <Route path="/ai" element={<AIAssistant />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;