import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { useSelector } from "react-redux";
import { userCollection } from "../hooks/userCollection";
import { getRandomGradientOImage } from "../utils";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { data } = userCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);
  console.log(data);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("check your Email ");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const bgSrc = data?.bgURL || getRandomGradientOImage();

  return (
    <div className="max-w-md mx-auto mt-50 pb-10 bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="h-50 w-full">
        <img src={bgSrc} alt="bg-img" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col items-center -mt-12">
        <img
          src={user.photoURL}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {user.displayName}
        </h3>
        <h3 className="text-gray-600">{user.email}</h3>

        <small className="mt-2 text-sm text-gray-500">
          {user.emailVerified ? (
            <p className="text-green-600 font-medium">✅ Email Verified</p>
          ) : (
            <>
              <p className="text-red-500 font-medium">❌ Email Not Verified</p>
              <button
                onClick={sendEmailLink}
                className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Verification Link
              </button>
            </>
          )}
        </small>
      </div>
    </div>
  );
}

export default Profile;
