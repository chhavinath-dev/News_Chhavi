import React from "react";
import { useSearchParams } from "react-router-dom";
export default function Query() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  return <div>{console.log(searchParams.get("Search"))}</div>;
}
