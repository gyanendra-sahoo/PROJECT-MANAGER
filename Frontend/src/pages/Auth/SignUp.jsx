import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfileSelector from "../../components/Input/ProfileSelector";
import InputBox from "../../components/Input/InputBox.jsx";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");
    try {

      if(profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const { token, role } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if(role === "admin") {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
      
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-black">Create an account</h2>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfileSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBox
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <InputBox
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <InputBox
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              required
            />
            <InputBox
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              type="text"
              placeholder="6 Digit Code"
            />
            </div>
            {error && (
              <p className="text-red-500 text-xs pb-2.5 pt-2.5">{error}</p>
            )}
            <button type="submit" className="btn-primary">
              SIGN UP
            </button>
            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account ?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
