import React, { useState } from "react";
import FullPageLoader from "../components/Loader";

const useFullPageLoader = () => {
  const [loading, setLoading] = useState(true);

  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default useFullPageLoader;
