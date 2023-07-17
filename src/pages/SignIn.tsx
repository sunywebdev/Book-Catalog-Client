/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../redux/features/user/userApi";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";

const SignIn = () => {
  const [signInUser] = useSignInUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await signInUser(data).then((data: any) => {
      if (data?.data) {
        toast.success("Login Successfull.");
        form.reset();
        navigate("/");
        dispatch(setUser(data?.data.data.user));
        localStorage.setItem("token", data?.data.data.accessToken);
      } else if (data?.error) {
        toast.error(data.error?.data?.message);
      }
    });
  };

  return (
    <form onSubmit={handleSignIn}>
      <div className="container">
        <div className="p-5 md:p-8 lg:p-16">
          <div className="mb-5">
            <h3 className="text-xl font-semibold">SignIn</h3>
            <p>Login to your account.</p>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>
          <button className="btn btn-primary btn-sm text-xs px-16 mt-5">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
