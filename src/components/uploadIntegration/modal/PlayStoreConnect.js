"use Client";
import React, { useEffect, useState } from "react";
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
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";
import { EventEmitter } from "@/helper";

// const selectList = [{ name: "US", value: "us" }];

const PlayStoreConnect = ({ handleClose, handleClickBack1 ,modalOpen}) => {
  console.log("modalOpen",modalOpen);
  const [appId, setAppId] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);

  let userId = ""
  let orgId = ""
  let userRole = ""

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole");
    userId = localStorage.getItem("userId");
    orgId = localStorage.getItem("orgId");
  }

  const getCountryListHandler = async () => {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .eq("name", "country_code");
    if (error) {
      console.log("error", error);
    } else {
      setCountryList(data[0].metadata);
    }
  };

  useEffect(() => {
    getCountryListHandler();
  }, []);

  const connectHandler = async () =>{
    if(appId !==""&&country !==""){
      const payload = {
        integration_name : '',
        token:'',
        country_code:country,
        app_id:appId,
        integration_source:modalOpen.name === "Connect Google Play Store" ? "Play Store"  : "App Store"
      }

      if(userRole === "individual"){
        payload.user_id = userId
      }else{
        payload.organization_id = orgId
      }
      const {data,error} = await supabase.from('integrations').insert(payload);
      if(error){
        errorNotification(error.message);
      }else{
        EventEmitter.dispatch('appIntegrations',true);
        successNotification("update Sucessfull");
        handleClose();
      }
    }
  };

  return (
    <Stack
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ borderRadius: "10px", height: "calc(100% - 50px)",padding:'30px 25px 10px' }}
    >
      <DialogContent sx={{ padding: "0px" }}>
        <Typography
          fontSize={"35px"}
          fontWeight={"700"}
          lineHeight={"50px"}
          marginBottom={2}
        >
          Add your app
        </Typography>
        <Box margin={"30px 0"}>
          <Stack gap={2} marginTop={4} justifyContent={"center"}>
            <Box>
              <CommonInput
                placeholder="com.cynthia.com"
                labelInput
                onChange={(event) => [setAppId(event.target.value)]}
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
                selectList={countryList}
                onChange={(event) => [setCountry(event.target.value)]}
              >
                <MenuItem value="" disabled>
                  {"None"}
                </MenuItem>
                {countryList.map((res, i) => {
                  return <MenuItem value={res}>{res}</MenuItem>;
                })}
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
          onClick={connectHandler}
          fullWidth
        />
      </Stack>
    </Stack>
  );
};

export default PlayStoreConnect;
