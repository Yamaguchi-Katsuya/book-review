import { getPublicBookReviews } from "@/api/bookReview";
import ApiErrorMsg from "@/components/ApiErrorMsg";
import BookReviewList from "@/components/bookReview/BookReviewList";
import Pagination from "@/components/Pagination";
import { handleApiError } from "@/handler/apiError";
import { BookReview } from "@/types/bookReview";
import { ApiError } from "@/types/error";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function BookPublicReviewList() {
  const [bookReviews, setBookReviews] = useState<BookReview[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const offsetParam = urlParams.get("offset") || "0";
    if (!isNaN(Number(offsetParam))) {
      setOffset(Number(offsetParam));
    }
  }, [location]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      if (offset === null) return;
      try {
        const res = await getPublicBookReviews({ offset });
        if (Array.isArray(res)) {
          const reviews = res.map((bookReview) => ({
            id: bookReview.id,
            title: bookReview.title,
            url: bookReview.url,
            detail: bookReview.detail,
            review: bookReview.review,
            reviewer: bookReview.reviewer,
            isMine: bookReview.isMine,
          }));
          setBookReviews(reviews);
        }
      } catch (err) {
        setError(handleApiError(err));
      }
    };

    fetchBookReviews();
  }, [offset]);

  return (
    <>
      <section className="my-4 w-11/12 lg:w-full max-w-screen-lg flex flex-col gap-4 mx-auto">
        <h2 className="text-2xl font-bold text-center">BookReviewList</h2>

        <section className="mx-auto">
          <ApiErrorMsg error={error} />
          <BookReviewList bookReviews={bookReviews} />
        </section>

        <Pagination currentOffset={offset} urlPath={window.location.pathname} />
      </section>
    </>
  );
}

export default BookPublicReviewList;
