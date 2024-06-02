import { Link, Navigate } from "react-router-dom";
import Input from "../component/input.component";
import { toast, Toaster } from "react-hot-toast";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { createSession } from "../comman/Session";

const Auth = ({ type }) => {

  const authform = useRef();
  const { userAuth, userAuth:{access_token}, setUserAuth } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
  let route = type == "signin" ? "/signin" : "/signup"
  const authorize = async (route, data) => {
    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_SERVER_ROUTE + route, data);
      const responseData = response.data.data;
      createSession(JSON.stringify(responseData));
      setUserAuth(responseData);
      toast.success("Authentication successful!");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "An error occurred during authentication.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(authform.current);
    const formData = {};
    form.forEach((value, key) => {
        formData[key] = value;
    });

    const { fullname, email, password } = formData;
    if (!fullname || fullname.length < 3) {
        return toast.error("Fullname must be at least 3 letters long");
    }
    if (!email) {
        return toast.error("Enter the email");
    }
    if (!emailRegex.test(email)) {
        return toast.error("Invalid email");
    }
    if (!password) {
        return toast.error("Enter the password");
    }
    if (!passwordRegex.test(password)) {
        return toast.error("Password should be 6-20 characters long and should contain at least 1 capital letter, 1 special character, and 1 number");
    }

    authorize(route, formData);
};


  

  return (
    access_token ? <Navigate to='/' /> :
    <section className="h-cover flex items-center justify-center">
      <Toaster />
      <form ref={authform} className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          {type === "sign-in" ? "Welcome back" : "Join us today"}
        </h1>

        {type !== "sign-in" && (
          <Input name="fullname" type="text" placeholder="Full Name" icon="fi-rr-user" />
        )}
        <Input name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
        <Input name="password" type="password" placeholder="Password" icon="fi-rr-key" />

        <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : type.replace("-", " ")}
        </button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
        </div>

        {type === "sign-in" ? (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black text-xl ml-1">Join us today</Link>
          </p>
        ) : (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Already a member?
            <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here</Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default Auth;
