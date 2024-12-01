import { useNavigate } from 'react-router-dom';

type PaginationProps = {
  currentOffset: number | null;
  urlPath: string;
};

function Pagination({ currentOffset, urlPath }: PaginationProps) {
  const push = useNavigate();
  currentOffset = currentOffset ?? 0;
  return (
    <>
      <nav className="mx-auto flex justify-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500"
          onClick={() =>
            push(
              `${urlPath}?offset=${currentOffset - 10 < 0 ? 0 : currentOffset - 10}`
            )
          }
        >
          前のページ
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500"
          onClick={() => push(`${urlPath}?offset=${currentOffset + 10}`)}
        >
          次のページ
        </button>
      </nav>
    </>
  );
}

export default Pagination;
