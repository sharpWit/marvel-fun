"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constants";
import { PaginationWithLinks } from "./pagination-with-link";

interface PaginationProps {
  totalData?: number;
}

const Pagination: FC<PaginationProps> = ({ totalData }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  return (
    <div className="w-full mx-auto py-3 flex content-center items-center ">
      <PaginationWithLinks
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={totalData || 0}
      />
    </div>
  );
};

export default Pagination;
