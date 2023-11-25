import { FC } from "react";

const PAGE_SIZE = 20; // Adjust this based on your API's page size

interface PaginationProps<T> {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data?: {
    total?: number;
  };
  isPlaceholderData: boolean;
}
const Pagination: FC<PaginationProps<any>> = ({
  page,
  setPage,
  data,
  isPlaceholderData,
}) => {
  return (
    <div className="dui-join grid grid-cols-3 mt-4">
      <button
        className="dui-join-item dui-btn dui-btn-outline"
        onClick={() => {
          if (page > 0) {
            setPage((old) => old - 1);
          }
        }}
        disabled={page === 0}
      >
        Previous page
      </button>
      <span className="dui-join-item dui-btn dui-btn-disabled dui-btn-outline !text-neutral/90">
        Current Page: {page + 1}
      </span>

      <button
        className="dui-join-item dui-btn dui-btn-outline"
        onClick={() => {
          if (
            !isPlaceholderData &&
            data?.total !== undefined &&
            data.total > (page + 1) * PAGE_SIZE
          ) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={
          isPlaceholderData ||
          data?.total === undefined ||
          data.total <= (page + 1) * PAGE_SIZE
        }
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
