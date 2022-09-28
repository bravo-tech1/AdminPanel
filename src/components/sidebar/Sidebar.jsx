import "./sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import HotelIcon from "@mui/icons-material/Hotel";
import InventoryIcon from "@mui/icons-material/Inventory";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import AddIcon from "@mui/icons-material/Add";
import DomainIcon from "@mui/icons-material/Domain";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/departments" className="link">
              <li className="sidebarListItem newTitle">
                <InventoryIcon className="sidebarIcon" />
                Departments
              </li>
            </Link>
            <Link to="/department/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Depertment
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem newTitle">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/user/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New User
              </li>
            </Link>
            <Link to="/services" className="link">
              <li className="sidebarListItem newTitle">
                <DesignServicesRoundedIcon className="sidebarIcon" />
                Services
              </li>
            </Link>
            <Link to="/service/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Service
              </li>
            </Link>
            <Link to="/state" className="link">
              <li className="sidebarListItem newTitle">
                <DomainIcon className="sidebarIcon" />
                States
              </li>
            </Link>
            <Link to="/states/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New State
              </li>
            </Link>
            <Link to="/city" className="link">
              <li className="sidebarListItem newTitle">
                <LocationCityRoundedIcon className="sidebarIcon" />
                Cities
              </li>
            </Link>
            <Link to="/cities/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New City
              </li>
            </Link>
            <Link to="/hotels" className="link">
              <li className="sidebarListItem newTitle">
                <HotelIcon className="sidebarIcon" />
                Hotels
              </li>
            </Link>
            <Link to="/hotel/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Hotel
              </li>
            </Link>
            <Link to="/packages" className="link">
              <li className="sidebarListItem newTitle">
                <InventoryIcon className="sidebarIcon" />
                Packages
              </li>
            </Link>
            <Link to="/package/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Package
              </li>
            </Link>
            <Link to="/deatils" className="link">
              <li className="sidebarListItem newTitle">
                <InventoryIcon className="sidebarIcon" />
                Packages Deatils
              </li>
            </Link>
            <Link to="/deatil/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Deatils
              </li>
            </Link>
            <Link to="/packagesvideo" className="link">
              <li className="sidebarListItem newTitle">
                <InventoryIcon className="sidebarIcon" />
                Packages's Videos
              </li>
            </Link>
            <Link to="/packagevideo/create" className="link">
              <li className="sidebarListItem new">
                <AddIcon className="sidebarIcon" />
                New Package's Videos
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
