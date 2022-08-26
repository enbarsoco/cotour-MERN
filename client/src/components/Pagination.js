import React from "react";
import { Box, Pagination } from "@mui/material";

const Paging = ({ setCurrentPage, currentPage, numberOfPages, dispatch }) => {
  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };
  return (
    <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
      <Pagination
          size={"medium"}
        count={numberOfPages}
        page={currentPage}
        onChange={handleChange}

      />
    </Box>
  );
};

export default Paging;
