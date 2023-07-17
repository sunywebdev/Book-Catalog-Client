import { Link } from "react-router-dom";
import { iBook } from "../types/globalTypes";

type iProps = {
	book: iBook;
};

const BookGrid = ({ book }: iProps) => {
	return (
		<>
			<div
				key={book.name}
				className='bg-white overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 text-center p-2'>
				<img
					className='mx-auto'
					src={book.banner}
					alt={book.name}
					style={{
						width: "200px",
						height: "275px",
					}}
				/>
				<div>
					<div className='font-bold  mb-2'>{book.name?.slice(0, 20)}...</div>
					<p className='text-gray-700 '>by - {book.author}</p>
					<p className='text-gray-700'>{book.genre}</p>
					<p className='text-gray-600 text-sm mt-2'>
						{new Date(book.publicationDate).toLocaleString()}
					</p>
				</div>
				<div className='card-actions mt-2'>
					<Link
						to={`/all-books/${book._id}`}
						className='btn btn-primary btn-sm text-xs mx-auto bg-[#171547]'>
						View Details
					</Link>
				</div>
			</div>
		</>
	);
};

export default BookGrid;
