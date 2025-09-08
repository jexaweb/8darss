import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { AiOutlineAliwangwang } from "react-icons/ai";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment").trim();

    if (!comment) {
      alert("Comment yozishingiz kerak!");
      return;
    }

    const newComment = {
      text: comment,
      id: Math.random(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    const commentRef = doc(db, "tasks", data.id);

    await updateDoc(commentRef, {
      comments: [...(data.comments || []), newComment],
    });

    e.target.reset();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="max-w-1xl  ml-auto mr-auto pl-50 pr-50 mx-autobg-gradient-to-br  from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    px-4 py-12   "
    >
      <div className="bg-gradient-to-b bg-white to-blue-500 p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 shadow-sm border-b mb-6 p-4 rounded-lg">
        {" "}
        <div className="w-4 h-4  bg-indigo-500 rounded-full mb-30 ">
          <samp className="text-sm font-medium text-slate-500 uppercase tracking-wide flex mb-2 ml-5">
            TaskDetails
          </samp>{" "}
          <h1 className="text-3xl font-bold text-black leading-tight ">
            {data.title}
          </h1>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <h2 className="text-xl font-semibold text-white flex mb-8 mt-8 ">
          <AiOutlineAliwangwang className="text-2xl" /> Comments (
          {data.comments.length})
        </h2>

        {!data.comments || data.comments.length === 0 ? (
          <p className="text-gray-500">No Comments</p>
        ) : (
          data.comments.map((comment) => (
            <div
              key={comment.id}
              className={`chat ${
                comment.uid === user.uid ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={comment.photoURL} alt={comment.displayName} />
                </div>
              </div>
              <div className="chat-header">
                {comment.displayName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div className="chat-bubble">{comment.text}</div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2  bg-white  hover:shadow-md transition-all duration-200 shadow-sm border-b mb-6 p-4 rounded-l border-indigo-200 "
      >
        <input
          type="text"
          name="comment"
          placeholder="Add a comment"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none text-slate-700 placeholder-slate-400 bg-slate-50/50 focus:bg-white"
        />
        <button
          type="submit"
          className="px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Post_Comment
        </button>
      </form>
    </div>
  );
}

export default Task;
