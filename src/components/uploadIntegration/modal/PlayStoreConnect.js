import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "@/components/common/Button";
import CommonInput from "@/components/common/Input";
import CommonSelect from "@/components/common/Select";

const selectList = [{ name: "US", value: "us" }];

const PlayStoreConnect = ({ handleClose, handleClickBack1 }) => {
  const [appId, setAppId] = useState("");
  const [country, setCountry] = useState("");

  return (
    <Stack
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ borderRadius: "10px", height: "calc(100% - 50px)" }}
    >
      <DialogContent sx={{ padding: "0px" }}>
        <Typography
          fontSize={"35px"}
          fontWeight={"700"}
          lineHeight={"50px"}
          marginBottom={2}
        >
          Add your Android app
        </Typography>
        <Box margin={"30px 0"}>
          <Stack gap={2} marginTop={4} justifyContent={"center"}>
            <Box>
              <CommonInput
                placeholder="com.cynthia.com"
                labelInput
                onChange={(event) => [
                  setAppId(event.target.value),
                ]}
                labal="Add your app ID"
              />
            </Box>
            <Box>
              <Typography
                fontSize={"12px"}
                fontWeight={500}
                marginBottom={"6px"}
                sx={{ color: "#080a0b" }}
              >
                Country
              </Typography>
              <Select
                fullWidth
                value={country}
                selectList={selectList}
                onChange={(event) => [
                  setCountry(event.target.value),
                ]}
              >
                <MenuItem value="" disabled>
                    {"None"}
                </MenuItem>
                {
                    selectList.map((res,i)=>{
                        return (
                        <MenuItem value={res.value}>
                            {res.name}
                        </MenuItem>
                        )
                    })
                }
              </Select>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <Stack flexDirection={"row"} marginBottom={1} padding={"20px 0"} gap={2}>
        <CommonButton
          buttonName="Back"
          variant="outlined"
          onClick={handleClose}
          fullWidth
        />
        <CommonButton
          buttonName="Connect"
          onClick={handleClickBack1}
          fullWidth
        />
      </Stack>
    </Stack>
  );
};

export default PlayStoreConnect;
