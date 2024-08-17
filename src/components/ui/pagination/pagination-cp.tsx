"use client";

import React, { useEffect, useState, useTransition } from "react";
import Pagination from "./Pagination";
import { IMarvelRes } from "@/types/response";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  data: IMarvelRes<any>;
}
const PaginationCP: React.FC<Props> = ({ data }) => {
  // const searchParams = useSearchParams();
  // const { replace } = useRouter();

  // const [page, setPage] = useState<number>(
  //   searchParams ? Number(searchParams.get("page")) || 0 : 0
  // );

  // console.log("PARAMS: ", { searchParams, page });
  // console.log("data: ", data);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //     if (page > 0) {
  //       params.set("page", (page + 1).toString()); // Set the new page number in the URL
  //     } else {
  //       params.delete("page"); // Remove the page parameter if it's 1 (or you could keep it)
  //     }
  //     replace(`/characters?${params.toString()}`);
  //   // Update the URL
  // }, [page, replace, searchParams]);

  return (
    <Pagination
      // page={page}
      totalData={data?.data.data.total}
    />
  );
};

export default PaginationCP;
