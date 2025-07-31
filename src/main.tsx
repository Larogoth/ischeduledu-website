import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Optimize for reduced forced reflows
const root = createRoot(document.getElementById("root")!);

// Use requestAnimationFrame to avoid forced reflows
requestAnimationFrame(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
