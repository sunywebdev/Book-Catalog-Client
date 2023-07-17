/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../redux/features/user/userApi";

const SignUp = () => {
  const [signUpUser] = useSignUpUserMutation();
  const navigate = useNavigate();

  const handleSignUp = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      name: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await signUpUser(data).then((data: any) => {
      if (data?.data) {
        toast.success("User SignUp Successfull. Please login.");
        form.reset();
        navigate("/signin");
      } else if (data?.error) {
        toast.error(data.error?.data?.message);
      }
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="container">
        <div className="p-5 md:p-8 lg:p-16">
          <div className="mb-5">
            <h3 className="text-xl font-semibold">SignUp</h3>
            <p>Register a new account.</p>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="fullname"
              className="input input-sm input-bordered w-full max-w-xs"
            />
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
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
