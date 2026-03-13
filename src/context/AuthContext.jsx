import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const saved = localStorage.getItem("avb_candidate");
    if (saved) {
      try {
        setCandidate(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("avb_candidate");
      }
    }
    setLoading(false);
  }, []);

  const login = (candidateData) => {
    setCandidate(candidateData);
    localStorage.setItem("avb_candidate", JSON.stringify(candidateData));
  };

  const logout = () => {
    setCandidate(null);
    localStorage.removeItem("avb_candidate");
  };

  const updateProfile = (updatedData) => {
    const updated = { ...candidate, ...updatedData };
    setCandidate(updated);
    localStorage.setItem("avb_candidate", JSON.stringify(updated));
    // Also update in "database"
    const allCandidates = JSON.parse(localStorage.getItem("avb_candidates_db") || "[]");
    const idx = allCandidates.findIndex(c => c.id === candidate.id);
    if (idx !== -1) {
      allCandidates[idx] = { ...allCandidates[idx], ...updatedData };
      localStorage.setItem("avb_candidates_db", JSON.stringify(allCandidates));
    }
  };

  return (
    <AuthContext.Provider value={{ candidate, login, logout, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
