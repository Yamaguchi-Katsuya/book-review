export type BookReview = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}

export type GetBookReviewsRequest = {
  offset: number;
}

export type GetBookReviewsResponse = [
  {
    id: string;
    title: string;
    url: string;
    detail: string;
    review: string;
    reviewer: string;
    isMine: boolean;
  }
]
