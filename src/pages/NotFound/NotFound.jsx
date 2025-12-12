import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 text-center border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-800">404 - Not Found</h1>
        <p className="text-slate-500 mt-1">This page does not exist</p>

        <img
          className="rounded-xl shadow-md mt-4 w-full"
          src="https://media.istockphoto.com/id/1404059706/vector/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space.jpg?s=612x612&w=0&k=20&c=DvPAUof9UsNuNqCJy2Z7ZLLk75qDA3bbLXOOW_50wAk="
          alt="404 Illustration"
        />

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-5 py-2 border border-slate-400 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
