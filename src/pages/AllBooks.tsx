import { ChangeEvent, useState } from "react";
import BookGrid from "../components/BookGrid";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { genre, iBook } from "../types/globalTypes";

const AllBooks = () => {
	const [query, setQuery] = useState("undefined");
	const { data, isLoading } = useGetBooksQuery(query, {
		refetchOnMountOrArgChange: true,
	});

	const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target;
		const search = form.search.value as string;
		const year = form.year.value as string;
		const genre = form.genre.value as string;

		const query = [`search=${search}`];

		if (genre !== "All") {
			query.push(`&genre=${genre}`);
		}
		if (year) {
			query.push(`&publicationDate=${year}`);
		}

		const finalQuery = query.join("");
		setQuery(finalQuery);
	};

	if (isLoading) return <div>loading</div>;

	return (
		<>
			<div className='container'>
				<div className='py-16'>
					<div className='text-center pb-8'>
						<h2 className='text-xl font-semibold'>All Books</h2>
					</div>
					<div className='mb-10 flex justify-center'>
						<form onSubmit={handleSearch}>
							<div className='join join-vertical md:join-horizontal'>
								<div>
									<div>
										<input
											name='search'
											className='input input-bordered join-item'
											placeholder='Search...'
										/>
									</div>
								</div>
								<div>
									<div>
										<input
											name='year'
											type='number'
											className='input input-bordered join-item'
											placeholder='year...'
										/>
									</div>
								</div>
								<select
									name='genre'
									className='select select-bordered join-item'
									defaultValue='All'>
									<option>All</option>
									{genre.map((item: string) => (
										<option key={item}>{item}</option>
									))}
								</select>
								<div className='indicator'>
									<button type='submit' className='btn join-item'>
										Search
									</button>
								</div>
							</div>
						</form>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{data?.data?.map((book: iBook) => (
							<BookGrid key={book._id} book={book}></BookGrid>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default AllBooks;
