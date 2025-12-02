import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendForm from "./pages/SendForm";
import ReceivePreview from "./pages/ReceivePreview";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendForm />} />
        <Route path="/receive" element={<ReceivePreview />} />
        <Route path='/history' element={<History/>} />
      </Routes>
    </BrowserRouter>
  );
}
