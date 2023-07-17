import BookGrid from "../components/BookGrid";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { iBook } from "../types/globalTypes";

const Reading = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>loading</div>;
  return (
    <>
      <div className="container">
        <div className="py-16">
          <div className="text-center pb-8">
            <h2 className="text-xl font-semibold">Reading</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.data?.map((book: iBook) => (
              <BookGrid key={book._id} book={book}></BookGrid>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reading;
