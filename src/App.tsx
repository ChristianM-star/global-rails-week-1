import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SendForm from "./components/SendForm";
import ReceivePreview from "./components/ReceivePreview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendForm />} />
        <Route path="/receive" element={<ReceivePreview />} />
      </Routes>
    </BrowserRouter>
  );
}
