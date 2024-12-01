import { BookReview } from "@/types/bookReview";
import { Link } from "react-router-dom";

type BookReviewItemProps = {
  bookReview: BookReview;
}

function BookReviewItem({ bookReview }: BookReviewItemProps) {
  return (
    <>
      <li className="col-span-1 flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 gap-3">
        <Link to={bookReview.url} className="text-lg font-bold">{bookReview.title}</Link>
        <p className="text-sm">{bookReview.detail}</p>
      </li>
    </>
  );
}

export default BookReviewItem;
