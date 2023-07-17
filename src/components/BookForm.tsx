import { ChangeEvent } from "react";
import { genre, iBook } from "../types/globalTypes";

type iProps = {
	data?: iBook;
	handler: (event: ChangeEvent<HTMLFormElement>) => void;
};

const BookForm = ({ data, handler }: iProps) => {
	const date = new Date(data?.publicationDate as string);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const formattedDate = `${year}-${month}-${day}`;

	return (
		<form onSubmit={handler}>
			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>Book Name</span>
				</label>
				<input
					type='text'
					name='book_name'
					defaultValue={data?.name}
					className='input input-sm input-bordered w-full max-w-xs'
				/>
			</div>

			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>Author</span>
				</label>
				<input
					type='text'
					name='author'
					defaultValue={data?.author}
					className='input input-sm input-bordered w-full max-w-xs'
				/>
			</div>

			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>Publication Date</span>
				</label>
				<input
					type='date'
					name='publication_date'
					defaultValue={formattedDate}
					className='input input-sm input-bordered w-full max-w-xs'
				/>
			</div>

			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>Genre</span>
				</label>
				<select
					name='genre'
					className='select select-sm select-bordered'
					defaultValue={data ? data.genre : "Pick one"}>
					<option disabled>Pick one</option>
					{genre.map((item: string) => (
						<option key={item}>{item}</option>
					))}
				</select>
			</div>

			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<span className='label-text'>Summery</span>
				</label>
				<textarea
					name='summery'
					defaultValue={data?.summery}
					className='textarea textarea-bordered h-24'></textarea>
			</div>

			<button
				type='submit'
				className='btn btn-primary btn-sm text-xs px-16 mt-5'>
				{data ? "Update Book" : "Add New Book"}
			</button>
		</form>
	);
};

export default BookForm;
