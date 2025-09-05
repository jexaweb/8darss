import { Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import FromTextArea from "../components/FromTextArea";

import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useCollection } from "../hooks/useCollection";

function CreateTask() {
  const { data } = userCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setAttachedUsers] = useState([]);

  useEffect(() => {
    if (!data) return;
    const users = data.map((user) => ({
      value: user.uid,
      label: user.displayName,
      uid: user.uid,
      PhotoURL: user.PhotoURL,
    }));

    setUserOptions(users);
  }, [data]);

  // Tanlangan userlarning uid'larini JSON shaklida yuborish
  const attachedUidsJson = useMemo(
    () => JSON.stringify(attachedUsers.map((u) => u.uid)),
    [attachedUsers]
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg p-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Task</h1>

      <Form method="post" className="space-y-6">
        {/* Task Title */}
        <FormInput label="Title:" name="title" type="text" />

        {/* Task Description */}
        <FromTextArea
          label="Description"
          name="description"
          placeholder="Task haqida batafsil yozing..."
        />

        {/* Due Date */}
        <FormInput label="Due to:" name="due-to" type="date" />

        <Select
          isMulti
          options={userOptions}
          value={attachedUsers}
          onChange={(selected) => setAttachedUsers(selected || [])}
          placeholder="Foydalanuvchilarni tanlang..."
          className="text-sm basic-multi-select"
          classNamePrefix="select"
          getOptionLabel={(opt) => opt.uid}
          formatOptionLabel={(opt) => opt.uid}
          formatOptionLabel={(opt) => (
            <div className="flex items-center gap-8">
              {opt.photoURL ? (
                <img
                  src={opt.photoURL}
                  alt={opt.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold"></div>
              )}
              <span className="text-gray-700">{opt.label}</span>
            </div>
          )}
        />
        <input type="hidden" name="assignedUsers" value={attachedUidsJson} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-medium px-6 py-2 rounded-lg shadow-md"
          >
            Create Task
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateTask;
