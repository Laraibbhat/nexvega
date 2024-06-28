import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CandidateList = ({ isAdmin = false }) => {
  const [candidateList, setCandidatesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      const result = await axios.get("http://localhost:5000/candidates");
      setCandidatesList(result.data);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCandidates(candidateList);
    } else {
      const filteredCandidates = candidateList.filter((candidate) => {
        const searchTextLower = searchTerm.toLowerCase();
        console.log("the candidate is ***************", candidate.skills);
        return (
          candidate.name.toLowerCase().includes(searchTextLower) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          candidate.location.toLowerCase().includes(searchTextLower)
        );
      });
      setFilteredCandidates(filteredCandidates);
    }
  }, [candidateList, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Add New Button clicked");
    navigate("/add");
  };

  const onEdit = (candidate) => {
    console.log(JSON.stringify(candidate));
    // navigate("/add", candidate);
    navigate("/add", { state: candidate });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="search-container flex items-center">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {isAdmin && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleButtonClick}
          >
            Add New Candidate
          </button>
        )}
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Skills</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Location</th>
            {isAdmin && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr
              key={candidate._id}
              className="border border-gray-300 hover:bg-gray-100"
            >
              <td className="px-4 py-2">{candidate.name}</td>
              <td className="px-4 py-2">{candidate.skills.toString()}</td>
              <td className="px-4 py-2">{candidate.yearsOfExperience} years</td>
              <td className="px-4 py-2">{candidate.location}</td>
              {isAdmin && (
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="px-2 py-1 text-blue-500 hover:text-blue-700 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => onEdit(candidate)}
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
