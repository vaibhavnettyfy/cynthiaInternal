import React from "react";
import { Box, List, Divider, Tooltip } from "@mui/material";
import {
  Logout,
  Plus,
  Poll,
  Profileimage,
  Questionanswer,
  Settings,
  PollActive,
  QuestionAnswerActive,
  SettingsActive,
} from "@/helper/constant";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { EventEmitter } from "@/helper";
import * as amplitude from '@amplitude/analytics-browser';


const askCynthiaHandler = () =>{
  EventEmitter.dispatch('askCynthia',true);
}

export const SidebarList = [
  {
    icon: <Image src={Plus} alt="" style={{ width: "30px", height: "30px" }} />,
    activeIcon: (
      <Image src={Plus} alt="" style={{ width: "30px", height: "30px" }} />
    ),
    path: "/admin/uploadintegration",
    tooltip: "Upload",
  },
  {
    icon: (
      <Image
        src={Questionanswer}
        alt=""
        style={{ width: "30px", height: "30px" }}
      />
    ),
    activeIcon: (
      <Image
        src={QuestionAnswerActive}
        onClick={()=>askCynthiaHandler()}
        alt=""
        style={{ width: "30px", height: "30px" }}
      />
    ),
    path: "/admin/askcynthia",
    tooltip: "Ask Cynthia",
  },
  {
    icon: <Image src={Poll} alt="" style={{ width: "30px", height: "30px" }} />,
    activeIcon: (
      <Image
        src={PollActive}
        alt=""
        style={{ width: "30px", height: "30px" }}
      />
    ),
    path: "/admin/reports",
    tooltip: "Trends & Reports",
  },
];

const Sidebar = ({ handleDrawerToggle }) => {
  const amplitudekey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  amplitude.init(amplitudekey);

  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = () => {
    router.push(`/`);
    localStorage.clear();
    const eventpayload = {
      logged_in_at:Math.floor(Date.now() / 1000) 
    }
    amplitude.track("Logged Out",eventpayload)
  };

  return (
    <Box
      width={"80px"}
      sx={{
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "-webkit-fill-available",
      }}
    >
      <Box>
        <List
          sx={{ display: "flex", justifyContent: "center", cursor: "pointer",paddingBottom:'5px' }}
        >
          <Image
            src={Profileimage}
            alt="main_logo"
            style={{ width: "40px", height: "40px", borderRadius: "5px" }}
          />
        </List>
        <Divider sx={{ margin: "10px 0" }} />
        {SidebarList.map((data, index) => (
          <Tooltip title={data.tooltip} key={index} placement="right-start">
            <List
              onClick={() => router.push(`${data.path}`)}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 1,
                borderRadius: "6px",
                background: `${
                  pathname == data.path ? "rgba(111,6,242,0.31)" : "white"
                }`,
                cursor: "pointer",
              }}
            >
              {pathname == data.path ? data.activeIcon : data.icon}
            </List>
          </Tooltip>
        ))}
      </Box>
      <Box>
        <Tooltip title="Settings" placement="right-start">
          <List
            onClick={() => router.push(`/admin/settings`)}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 1,
              borderRadius: "6px",
              background: `${
                pathname == "/admin/settings" ? "rgba(111,6,242,0.31)" : "white"
              }`,
              cursor: "pointer",
            }}
          >
            {pathname == "/admin/settings" ? (
              <Image
                src={SettingsActive}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            ) : (
              <Image
                src={Settings}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </List>
        </Tooltip>
        <Tooltip title="Logout" placement="right-start">
          <List
            onClick={() => logoutHandler()}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 1,
              cursor: "pointer",
            }}
          >
            <Image
              src={Logout}
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
          </List>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
