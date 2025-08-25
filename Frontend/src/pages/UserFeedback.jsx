import { useState, useEffect } from "react";

export default function UserFeedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: ""
  });

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData(prev => ({
        ...prev,
        name: storedUser.username || "",
        email: storedUser.email || ""
      }));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Feedback submitted successfully!");
        setFormData(prev => ({ ...prev, feedback: "" }));
      } else {
        alert("Error submitting feedback");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Write your feedback here..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
