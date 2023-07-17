import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import {
	useGetBookQuery,
	useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { iBook } from "../types/globalTypes";

const EditBook = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetBookQuery(id);

	const { data: user } = useAppSelector((state) => state.user);

	const [updateBook] = useUpdateBookMutation();

	const handleEditBook = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target;

		const data: iBook = {
			name: form.book_name.value,
			author: form.author.value,
			publicationDate: form.publication_date.value,
			genre: form.genre.value,
			summary: form.summary.value,
			user: user?._id as string,
			banner: form.banner.value,
		};

		await updateBook({ id, data });
		toast.success("Book updated successfull!");
	};

	if (isLoading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-20 w-20 border-t-4 border-[#171547] border-solid'></div>
			</div>
		);

	return (
		<>
			<div className='container'>
				<div className='p-5 md:p-8 lg:p-16  text-center'>
					<div className='mb-5'>
						<h3 className='text-xl font-semibold text-[#171547]'>Edit Book</h3>
						<p>Edit the form and submit to modify the book.</p>
					</div>
					<BookForm data={data?.data} handler={handleEditBook} />
				</div>
			</div>
		</>
	);
};

export default EditBook;
