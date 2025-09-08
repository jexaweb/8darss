import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { userCollection } from "../hooks/userCollection";
import { CiWifiOn } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { use } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = userCollection("users");
  const { data: tasks } = userCollection("tasks");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-100">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user.displayName}
                </h1>
                <p className="text-sm text-gray-500">my peg</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={_logout}
                disabled={isPending}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                    isPending
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  }
                `}
              >
                <span>{isPending ? "Loading..." : "Logout"}</span>
              </button>
              <Link
                to="/Createtask"
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                    isPending
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  }
                `}
              >
                <span>{isPending ? "Loading..." : "Createtask"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-3 p-6 border-b border-gray-100">
            <FaUserGroup className="text-2xl" />
            <h3 className="text-xl font-semibold text-gray-900">
              Active Users
            </h3>
            {data && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {data.length} users
              </span>
            )}
          </div>

          <div className="p-6">
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((userl) => (
                  <div
                    key={userl.uid}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-indigo-100 transition-all duration-200">
                        <img
                          src={userl.photoURL}
                          alt={userl.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${
                          userl.online ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {userl.displayName}
                      </h4>
                      <p
                        className={`text-xs mt-1 ${
                          userl.online ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {userl.online ? (
                          <CiWifiOn className="text-2xl" />
                        ) : (
                          <CiWifiOn className="text-2xl" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No users found</p>
                <p className="text-gray-400 text-sm">
                  Users will appear here when they join
                </p>
              </div>
            )}
          </div>
        </div>

        <ul className="space-y-3 mt-30">
          {tasks &&
            tasks.map((task) => (
              <li
                key={task.uid}
                className="flex items-center justify-between bg-gradient-to-b bg-white to-blue-500 p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
              >
                <Link
                  to={`/task/${task.uid}`}
                  className="flex items-center gap-3"
                >
                  {" "}
                  <h5 className="text-gray-800 dark:text-gray-800 font-medium text-base">
                    {task.title}
                  </h5>
                  <div className="flex -space-x-2">
                    {task.userOptions.map((user) => (
                      <img
                        key={user.uid}
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full border border-gray-200 "
                      />
                    ))}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
