import BookGrid from "../components/BookGrid";
import { useWishlistQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { iBook } from "../types/globalTypes";

const Wishlist = () => {
	const { data: user } = useAppSelector((state) => state.user);
	const { data, isLoading } = useWishlistQuery(user?._id as string, {
		refetchOnMountOrArgChange: true,
	});

	if (isLoading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-20 w-20 border-t-4 border-[#171547] border-solid'></div>
			</div>
		);

	return (
		<>
			<div className='container'>
				<div className='py-16'>
					<div className='text-center pb-8'>
						<h2 className='text-xl font-semibold'>Wishlist</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
						{data?.data?.map((book: iBook) => (
							<BookGrid key={book._id} book={book}></BookGrid>
						))}
					</div>
					{data?.data?.length === 0 && <div>No books in whishlist.</div>}
				</div>
			</div>
		</>
	);
};

export default Wishlist;
