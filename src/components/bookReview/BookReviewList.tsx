import { BookReview } from "@/types/bookReview";
import BookReviewItem from "./BookReviewItem";

type BookReviewListProps = {
  bookReviews: BookReview[];
}

function BookReviewList({ bookReviews }: BookReviewListProps) {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookReviews.map((bookReview, index) => (
          <BookReviewItem bookReview={bookReview} key={index} />
        ))}
      </ul>
    </>
  );
}

export default BookReviewList;
