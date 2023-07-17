import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import BookForm from "../components/BookForm";
import { useCreateBookMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { iBook } from "../types/globalTypes";

const AddNewBook = () => {
	const [createBook] = useCreateBookMutation();
	const { data: user } = useAppSelector((state) => state.user);

	const handleAddNewBook = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target;

		const data: iBook = {
			banner: form.banner.value,
			name: form.book_name.value,
			author: form.author.value,
			publicationDate: form.publication_date.value,
			genre: form.genre.value,
			summary: form.summary.value,
			user: user?._id as string,
		};

		await createBook(data);
		toast.success("Book created successfull!");
		form.reset();
	};

	return (
		<>
			<div className='container'>
				<div className='p-5 md:p-8 lg:p-16'>
					<div className='mb-5'>
						<h3 className='text-xl font-semibold'>Add New Book</h3>
						<p>Fill the form & submit to add a new Book.</p>
					</div>
					<BookForm handler={handleAddNewBook} />
				</div>
			</div>
		</>
	);
};

export default AddNewBook;
