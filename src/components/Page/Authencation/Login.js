import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContex";
import useToken from "../../Houcks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const { loginemail } = useContext(AuthContext);
  // const [loginUserEmail, setLoginUserEmail] = useState('');
  // const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navegate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // console.log(object);

 
//   if (token) {
//     navegate(from, { replace: true });
// }

  // const handleLogin = (data) => {
  
  //   loginemail(data.email, data.password)
  //     .then((result) => {
  //       setLoginError("");
  //       const user = result.user;
  //       console.log(user);
  //       setLoginUserEmail(data.email);

  //     })
  //     .catch((e) => {
  //       setLoginError(e.message);
  //       console.log(e);
  //     });
  // };



  const handleLogin = (value) => {
    console.log(value);
    loginemail(value.email, value.password)
      .then((result) => {
        setLoginError("");
        const user = result.user;
        console.log(user);
        tokenfunction(user.email)
        navegate(from, { replace: true });
        // setLoginUserEmail(value.email)
      })
      .catch((error) => {
        setLoginError(error.message);
        console.error(error);
      });
  };


   //joot token

   const tokenfunction = (email) => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data 70'  , data);
        if (data.accesstoken) {
          localStorage.setItem("token", data.accesstoken);
          navegate("/");
        }
      });
  };


  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96  border-2  p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {" "}
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p>
          New to Doctors Portal{" "}
          <Link className="text-secondary" to="/signup">
            Create new Account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
