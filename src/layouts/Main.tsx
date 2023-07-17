import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useGetMeQuery } from "../redux/features/user/userApi";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";

const Main = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");
  const { data, isLoading } = useGetMeQuery(token);

  useEffect(() => {
    if (data?.data?._id) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>loading</div>;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default Main;
