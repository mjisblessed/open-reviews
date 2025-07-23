import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No reviews yet</h3>
      <p className="text-base-content/70">
      Want to build together? Share ideas. Want me to know something good? Create your review!
      </p>
      <Link to="/create" className="btn btn-primary">
        Create Your First Review
      </Link>
    </div>
  );
};
export default NotesNotFound;