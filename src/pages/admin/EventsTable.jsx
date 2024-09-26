import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:4000/api/events/${id}`);
        fetchEvents(); // Refresh events after deletion
      } catch (err) {
        alert('Error deleting event');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto relative">
    <Link to="/admin/create-event"
    className="absolute top-2 right-2 btn btn-primary flex items-center gap-x-2">
      <FaPlus /> Create Event
    </Link>
      <table className="min-w-full mt-14 card">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Logo</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td className="px-4 py-2 border">
                <img 
                  src={event.company.logo?.url } 
                  alt={event.company.name}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="px-4 py-2 border">{event.title}</td>
              <td className="px-4 py-2 border">{event.company.name}</td>
              <td className="px-4 py-2 border">{event.location}</td>
              <td className="px-4 py-2 border">{new Date(event.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
