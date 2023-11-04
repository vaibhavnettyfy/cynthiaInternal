import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function CommonSelect(props) {
  const {
    selectHead,
    selectList,
    labelSelect,
    label,
    className,
    width,
    MenuProps,
  } = props;

  const [selectValue, setSelectValue] = React.useState("");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      {labelSelect ? (
        <Typography fontSize={"14px"} fontWeight={600} marginBottom={"6px"}>
          {label}
        </Typography>
      ) : (
        ""
      )}
      <Select
        value={selectValue}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{
          fontSize: { xs: "12px", sm: "16px" },
          color: "#a4a4a4",
          width: width,
        }}
        className={className}
        MenuProps={MenuProps}
      >
        <MenuItem value="" hidden disabled>
          {selectHead}
        </MenuItem>
        {selectList.map((data, i) => {
          return (
            <MenuItem value={data.value} key={i}>
              {data.sideList ? (
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  width={"300px"}
                >
                  <Typography fontSize={"15px"}>{data.name}</Typography>
                  <Typography fontSize={"12px"}>{data.sideList}</Typography>
                </Stack>
              ) : data.icon ? (
                <Stack
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  gap={"10px"}
                  width={"300px"}
                  alignItems={"center"}
                >
                  <Image
                    src={data.icon}
                    style={{
                      width: "25px",
                      height: "25px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography fontSize={"15px"}>{data.name}</Typography>
                </Stack>
              ) : (
                data.name
              )}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
