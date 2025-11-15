import { useState, useEffect } from "react";
import api from "../lib/axios";
import { LoaderIcon, BookOpenIcon, CalendarIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import { Link } from "react-router";

const UserHomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="size-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary font-mono tracking-tight">
                  Sermon Notes
                </h1>
                <p className="text-sm text-base-content/70">Public Collection</p>
              </div>
            </div>
            <Link to="/admin" className="btn btn-outline btn-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Browse Sermon Notes</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Welcome to our public collection of sermon notes. Click on any sermon to read the full content 
            and gain insights from God's word.
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
              <BookOpenIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">No Sermons Available</h3>
            <p className="text-base-content/70">
              Check back soon for new sermon notes to be added to the collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Link
                key={note._id}
                to={`/public/sermon/${note._id}`}
                className="card bg-base-100 hover:shadow-lg transition-all duration-200 
                border-t-4 border-solid border-[#00FF9D] hover:scale-105"
              >
                <div className="card-body">
                  <h3 className="card-title text-base-content line-clamp-2">{note.title}</h3>
                  <p className="text-base-content/70 line-clamp-3 mb-4">{note.content}</p>
                  <div className="card-actions justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <CalendarIcon className="size-4" />
                      {formatDate(new Date(note.createdAt))}
                    </div>
                    <div className="badge badge-primary badge-outline">Read More</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-base-300 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base-content/70">
            Want to build together? Share Sermon Notes. Want to contribute? Share your insights!
          </p>
          <p className="text-sm text-base-content/50 mt-2">
            Sermon Notes Collection • Inspiring Faith Through God's Word
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserHomePage;