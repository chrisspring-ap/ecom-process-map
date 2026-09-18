import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import RoadmapOverview from "./routes/Index";
import MilestoneDetail from "./routes/MilestoneDetail";
import HistoryPage from "./routes/HistoryPage";
import InsightsPage from "./routes/InsightsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoadmapOverview />} />
        <Route
          path="/milestone/:phaseId/:milestoneIndex"
          element={<MilestoneDetail />}
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
