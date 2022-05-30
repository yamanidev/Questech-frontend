import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import Person from "@mui/icons-material/Person";
import DomainIcon from "@mui/icons-material/Domain";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import userService from "../../services/user/user-service";

const userRole = userService.getUser().role;
const navList = [];

if (userRole === "ADMIN") {
	navList.push(
		{
			icon: DashboardOutlined,
			desc: "Dashboard",
			route: "/dashboard",
			badge: 0,
		},
		{
			icon: Person,
			desc: "Users",
			badge: 0,
		},
		{
			icon: MenuBookIcon,
			desc: "Courses",
			route: "/courses",
			badge: 0,
		},
		{
			icon: DomainIcon,
			desc: "Facilities",
			route: "/facilities",
			badge: 0,
		},
		{
			icon: GroupIcon,
			desc: "Groups",
			route: "/groups",
			badge: 0,
		},
		{
			icon: CalendarMonthIcon,
			desc: "Schedule",
			route: "/schedule",
			badge: 0,
		},
		{
			icon: AnnouncementIcon,
			desc: "Announcements",
			route: "/announcements",
			badge: 0,
		}
	);
} else if (userRole === "PROFESSOR") {
	navList.push(
		{
			icon: DashboardOutlined,
			desc: "Dashboard",
			route: "/dashboard",
			badge: 0,
		},
		{
			icon: MenuBookIcon,
			desc: "Courses",
			route: "/profile",
			badge: 0,
		},
		{
			icon: DomainIcon,
			desc: "Facilities",
			route: "/profile",
			badge: 0,
		},
		{
			icon: CalendarMonthIcon,
			desc: "Schedule",
			route: "/profile",
			badge: 0,
		},
		{
			icon: AnnouncementIcon,
			desc: "Announcements",
			route: "/profile",
			badge: 0,
		}
	);
} else if (userRole === "STUDENT") {
	navList.push(
		{
			icon: DashboardOutlined,
			desc: "Dashboard",
			route: "/dashboard",
			badge: 0,
		},
		{
			icon: MenuBookIcon,
			desc: "Courses",
			route: "/profile",
			badge: 0,
		},
		{
			icon: CalendarMonthIcon,
			desc: "Schedule",
			route: "/profile",
			badge: 0,
		},
		{
			icon: AnnouncementIcon,
			desc: "Announcements",
			route: "/profile",
			badge: 0,
		}
	);
}

export default navList;
