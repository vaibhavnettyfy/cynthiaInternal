import { Box, Stack } from "@mui/material";
import React from "react";
import Image from "next/image";

function Sentiments({name,per,color,img}) {
  return (
    <Stack
      flexDirection={"row"}
      sx={{
        boxShadow: "0px 2px 4px rgba(3,3,3,0.08)",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <Box width={"100%"} sx={{ padding: "10px 15px" }}>
        <Stack fontSize={"20px"} fontWeight={"600"} color={"#7f7f7f"}>
          {name}
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          marginTop={"10px"}
        >
          <Box fontSize={"25px"} fontWeight={"500"}>
            {per}
          </Box>
          <Box>
            <Image  alt={img} src={img} style={{ width: "40px", height: "40px" }} />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "25px",
          borderRadius: "10px",
          background: `${color}`,
        }}
      ></Box>
    </Stack>
  );
}

export default Sentiments;
