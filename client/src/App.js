import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import AdminDashboard from "./components/AdminDashboard";
import Header from "./components/Header";

function App() {
  const addCandidate = (candidate) => {
    console.log("Candidate added:", candidate);
  };

  const handleSave = () => {
    console.log("The Data is ***********");
  };

  return (
    <Router>
      <div className="App">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow p-4">
            {/* Content of your application pages will go here */}

            <Routes>
              <Route
                path="/add"
                element={
                  <CandidateForm
                    addCandidate={addCandidate}
                    onSave={handleSave}
                  />
                }
              />{" "}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<CandidateList />} />{" "}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
