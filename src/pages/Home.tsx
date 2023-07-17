import BookGrid from "../components/BookGrid";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { iBook } from "../types/globalTypes";

const Home = () => {
  const { data } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <div className="hero min-h-[90vh] bg-gray-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="py-16">
          <div className="text-center pb-8">
            <h2 className="text-xl font-semibold">Recently Added Books</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.data?.map((book: iBook) => (
              <BookGrid key={book._id} book={book}></BookGrid>
            ))}
          </div>
          <div className="text-center pt-16">
            <button className="btn btn-primary btn-sm text-xs px-16">
              View More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
