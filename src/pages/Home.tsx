import { Link } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { iBook } from "../types/globalTypes";

const Home = () => {
	const { data } = useGetBooksQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<>
			<div className='container'>
				<div className='py-16 flex flex-col' style={{ alignItems: "center" }}>
					<div className='text-center pb-8'>
						<h2 className='text-xl font-semibold'>Recently Added Books</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
						{data?.data?.slice(0, 10)?.map((book: iBook) => (
							<BookGrid key={book._id} book={book}></BookGrid>
						))}
					</div>
					<button className='bg-[#171547] text-white px-4 py-1 rounded-md w-40 mt-5'>
						<Link to='all-books'>View More</Link>
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
