import { Form, Navigate, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import FromTextArea from "../components/FromTextArea";
import { userCollection } from "../hooks/userCollection";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = userCollection("users");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    });
    setUserOptions(users || []);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    const task = {
      title,
      description,
      userOptions,
      dueTo,
      comments: [],
    };

    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => {
      alert("Mofaqiyatli qo'shildi !");
      navigate("/");
    });
  };

  return (
    <>
      <div
        className="max-w-2xl mx-auto bg-gradient-to-b from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md rounded-lg p-8 border border-gray-200  "
      >
        <form onSubmit={handleSubmit} method="post">
          <FormInput label="title" name="title" type="text" />
          <FromTextArea label="Description:" name="description" />
          <FormInput label="Due To" name="due-to" type="date" />
          <Select
            isMulti
            name="Users"
            options={userOptions}
            className="basic-multi-select mt-6 mb-6"
            classNamePrefix="select"
            formatOptionLabel={(option) => (
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full border border-gray-200">
                    <img
                      src={
                        option.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          option.label || "User"
                        )}&background=random`
                      }
                      alt={option.label}
                    />
                  </div>
                </div>
                <span className="text-gray-700">{option.label}</span>
              </div>
            )}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-medium px-6 py-2 rounded-lg shadow-md"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateTask;
