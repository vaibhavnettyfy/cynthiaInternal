import { Box, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
// import CommonButton from "../common/Button";
import React, { useState } from "react";
import CommonButton from "@/components/common/Button";
import CommonInput from "@/components/common/Input";
import { createOrganizationApiHandler } from "@/service/comman.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { useRouter } from "next/navigation";

const CreateOrganization = ({ handleClose }) => {
  const [orgName,setOrgName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const CreateOrganizationHandler = async () =>{
    if (!orgName.trim()) {
      setError("Organization name cannot be just blank spaces");
      return;
    }


    const payload = {
      organization_name:orgName
    }
    const {data,message,success} = await createOrganizationApiHandler(payload);
    if(success){
      successNotification(message);
      localStorage.clear();
      router.push(`/`);
    }else{
      errorNotification(message);
    }
  }

  return (
    <>
      <Box
        width={"450px"}
        height={"220px"}
        sx={{ borderRadius: "24px", padding: "30px" }}
      >
        <DialogContent
          sx={{
            height: "100%",
            padding: "0px",
            textAlign: "center",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography fontSize={"30px"} fontWeight={"700"} lineHeight={"40px"}>
            Enter your organisation name
          </Typography>

          <CommonInput style={{ width: "280px" }}
            name="organisation Name" value={orgName} onChange={(event)=>setOrgName(event.target.value)}/>
         
         {error && (
            <Typography color="error" variant="caption">
              {error}
            </Typography>
          )}
          <Stack flexDirection={"row"} gap={"10px"}>
            <CommonButton buttonName="save" onClick={()=>CreateOrganizationHandler()} />
            <CommonButton buttonName="Cancel" onClick={handleClose} />
          </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

// export default SwitchAccount;



export default CreateOrganization;
