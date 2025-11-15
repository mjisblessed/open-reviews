import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, CalendarIcon, BookOpenIcon } from "lucide-react";
import { formatDate } from "../lib/utils";

const DetailedViewPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching Sermon", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-error/10 rounded-full p-8 w-fit mx-auto mb-6">
              <BookOpenIcon className="size-10 text-error" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Sermon Not Found</h2>
            <p className="text-base-content/70 mb-6">
              The sermon you're looking for could not be found or may have been removed.
            </p>
            <Link to="/public" className="btn btn-primary">
              Back to All Sermons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <Link to="/public" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to All Sermons
            </Link>
            <Link to="/admin" className="btn btn-outline btn-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <article className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Sermon Header */}
              <header className="mb-6 pb-6 border-b border-base-content/10">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4 leading-tight">
                  {note.title}
                </h1>
                <div className="flex items-center gap-4 text-base-content/60">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    <span>Published on {formatDate(new Date(note.createdAt))}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="size-4" />
                    <span>Sermon Notes</span>
                  </div>
                </div>
              </header>

              {/* Sermon Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-base-content leading-relaxed">
                  {note.content}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-base-content/10">
                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Inspired by this sermon?</h3>
                  <p className="text-base-content/70 mb-4">
                    Share your thoughts, discuss with others, or explore more sermons in our collection.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/public" className="btn btn-primary">
                      Read More Sermons
                    </Link>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: note.title,
                            text: 'Check out this sermon note',
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          // You could add a toast here if you want
                        }
                      }}
                      className="btn btn-outline"
                    >
                      Share This Sermon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-300 mt-8 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base-content/70">
            Want to build together? Share Sermon Notes. Want to contribute? Share your insights!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DetailedViewPage;