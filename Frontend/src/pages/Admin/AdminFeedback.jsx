

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedbacks from backend
  const fetchFeedback = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data);
      } else {
        console.error("Failed to fetch feedback");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/feedback/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedbackList(feedbackList.filter((item) => item.id !== id));
        toast.success(" Feedback deleted successfully!", {
         position: "top-center",
         style: { backgroundColor: 'orange', color: 'white' },
          autoClose: 2000,
        });
      } else {
        toast.error(" Failed to delete feedback.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(" Error deleting feedback.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading feedback...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">User Feedback List</h2>

      {feedbackList.length === 0 ? (
        <p className="text-gray-600 text-center">No feedback submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl">
            <thead className="bg-orange-600 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3 border">Name</th>
                <th className="px-6 py-3 border">Email</th>
                <th className="px-6 py-3 border">Feedback</th>
                <th className="px-6 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-3 border">{item.name}</td>
                  <td className="px-6 py-3 border">{item.email}</td>
                  <td className="px-6 py-3 border">{item.feedback}</td>
                  <td className="px-6 py-3 border text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

