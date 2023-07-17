/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useCreateCommentMutation,
	useDeleteBookMutation,
	useGetBookQuery,
	useGetCommentQuery,
} from "../redux/features/book/bookApi";
import { useUpdateUserWishlistMutation } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { iBook, iComment } from "../types/globalTypes";

const BookDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading } = useGetBookQuery(id);
	const { data: comment } = useGetCommentQuery(id);
	const { data: user } = useAppSelector((state) => state.user);
	const [createComment] = useCreateCommentMutation();
	const [updateUserWishlist] = useUpdateUserWishlistMutation();
	const [deleteBook] = useDeleteBookMutation();

	if (isLoading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-20 w-20 border-t-4 border-[#171547] border-solid'></div>
			</div>
		);

	const book: iBook = data.data;
	const isAuthorized = book.user === user?._id;

	const handleComment = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target;
		const comment = form.comment.value;

		const data = {
			user: user?._id,
			book: id,
			comment,
		};

		console.log(data);

		await createComment(data).then((data: any) => {
			if (data?.data) {
				toast.success("Comment added successfull.");
				form.reset();
			} else if (data?.error) {
				toast.error("Somthing is wrong");
			}
		});
	};

	const handleDelete = async () => {
		const isConfirm = window.confirm();

		if (isConfirm) {
			await deleteBook(id);
			toast.success("Book delete successfull.");
			navigate("/all-books");
		}
	};

	const handleWishlist = async () => {
		await updateUserWishlist({ id: user?._id, data: { wishlist: id } });
		toast.success("Wishlist added successfull.");
	};

	// const handleReading = () => {};

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
				{isAuthorized ? (
					<Link
						to={`/all-books/${id as string}/edit`}
						className='btn btn-sm btn-ghost px-1 text-2xl '>
						<BiEdit />
					</Link>
				) : (
					<button
						disabled={!isAuthorized}
						className='btn btn-sm btn-ghost px-1 text-2xl '>
						<BiEdit />
					</button>
				)}
				<button
					onClick={handleDelete}
					disabled={!isAuthorized}
					className='btn btn-sm btn-ghost px-1 text-2xl '>
					<AiOutlineDelete />
				</button>
				<button
					onClick={handleWishlist}
					disabled={!isAuthorized}
					className='btn btn-sm btn-ghost px-1 text-2xl '>
					<AiOutlineHeart />
				</button>
				<div>
					<div className='font-bold  mb-2'>{book.name}</div>
					<p className='text-gray-700 '>by - {book.author}</p>
					<p className='text-gray-700'>{book.genre}</p>
					<p className='text-gray-600 text-sm mt-2'>
						{new Date(book.publicationDate).toLocaleString()}
					</p>
					<p className='text-gray-600 text-sm mt-2'>{book.summary}</p>
				</div>

				<div className='max-w-2xl mx-auto mt-5'>
					<div className='font-bold text-2xl mb-2'>Reviews</div>
					<div className='border-t border-gray-200'>
						{comment?.data?.map((comment: iComment) => (
							<div
								key={comment._id}
								className='flex space-x-3 py-2 items-center border-b border-gray-200'>
								<img
									src='https://source.unsplash.com/35x35'
									alt=''
									className='rounded-full'
								/>
								<div className='text-sm text-left'>{comment?.comment}</div>
							</div>
						))}
					</div>
					<form onSubmit={handleComment} className='mt-5'>
						<textarea
							name='comment'
							className='textarea w-full textarea-bordered'
							placeholder='Comment'
							disabled={!user}></textarea>
						<button
							disabled={!user}
							className='btn btn-primary btn-sm w-full text-xs'>
							Submit Comment
						</button>
						{!user && (
							<p className='text-red-600 text-sm'>
								Please login for the comment.
							</p>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default BookDetails;
