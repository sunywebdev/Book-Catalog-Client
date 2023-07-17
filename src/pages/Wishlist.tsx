import BookGrid from "../components/BookGrid";
import { useGetUserQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { iBook } from "../types/globalTypes";

const Wishlist = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetUserQuery(user?._id as string, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>loading</div>;

  return (
    <>
      <div className="container">
        <div className="py-16">
          <div className="text-center pb-8">
            <h2 className="text-xl font-semibold">Wishlist</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.data?.wishlist?.map((book: iBook) => (
              <BookGrid key={book._id} book={book}></BookGrid>
            ))}
          </div>
          {data?.data?.wishlist.length === 0 && (
            <div>No books in whishlist.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
