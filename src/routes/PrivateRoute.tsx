import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IProps {
	children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
	const { data, isLoading } = useAppSelector((state) => state.user);

	const { pathname } = useLocation();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-20 w-20 border-t-4 border-[#171547] border-solid'></div>
			</div>
		);
	}

	if (!data?.email && !isLoading) {
		return <Navigate to='/signin' state={{ path: pathname }} />;
	}

	return children;
}
