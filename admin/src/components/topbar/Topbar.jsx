import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import {useSelector} from 'react-redux'

export default function Topbar() {
const username = useSelector((state) => state.user.currentUser?.fullname)
const img = useSelector((state) => state.user.currentUser?.img)
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{username}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
