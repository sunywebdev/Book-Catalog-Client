import { HiOutlineBookOpen } from "react-icons/hi";
import { Link } from "react-router-dom";
import { iBook } from "../types/globalTypes";

type iProps = {
  book: iBook;
};

const BookGrid = ({ book }: iProps) => {
  const date = new Date(book.publicationDate).toLocaleDateString();

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-1">
          <HiOutlineBookOpen className="text-lg"></HiOutlineBookOpen>
          <h2 className="text-lg font-semibold">{book.name}</h2>
          <p className="text-sm">
            By <span className="hover:underline">{book.author}</span>
          </p>

          <div className="text-sm font-medium flex justify-between mb-5">
            <span>{book.genre}</span>
            <span>{date}</span>
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/all-books/${book._id}`}
              className="btn btn-primary btn-sm w-full text-xs"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookGrid;
