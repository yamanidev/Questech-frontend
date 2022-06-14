import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import Person from "@mui/icons-material/Person";
import DomainIcon from "@mui/icons-material/Domain";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import userService from "../../services/user/user-service";

const user = userService.getUser();
const navList = [];

if (user) {
	if (user.role === "ADMIN") {
		navList.push(
			{
				icon: DashboardOutlined,
				desc: "Dashboard",
				route: "/admin/dashboard",
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
				route: "/admin/courses",
				badge: 0,
			},
			{
				icon: DomainIcon,
				desc: "Facilities",
				route: "/admin/facilities",
				badge: 0,
			},
			{
				icon: GroupIcon,
				desc: "Groups",
				route: "/admin/levels",
				badge: 0,
			},
			{
				icon: CalendarMonthIcon,
				desc: "Schedule",
				route: "/admin/schedule",
				badge: 0,
			},
			{
				icon: AnnouncementIcon,
				desc: "Announcements",
				route: "/admin/announcements",
				badge: 0,
			}
		);
	} else if (user.role === "PROFESSOR") {
		navList.push(
			{
				icon: DashboardOutlined,
				desc: "Dashboard",
				route: "/teacher/dashboard",
				badge: 0,
			},
			{
				icon: MenuBookIcon,
				desc: "Courses",
				route: "/teacher/courses",
				badge: 0,
			},
			{
				icon: DomainIcon,
				desc: "Facilities",
				route: "/teacher/facilities",
				badge: 0,
			},
			{
				icon: CalendarMonthIcon,
				desc: "Schedule",
				route: "/teacher/schedule",
				badge: 0,
			},
			{
				icon: AnnouncementIcon,
				desc: "Announcements",
				route: "/teacher/announcements",
				badge: 0,
			}
		);
	} else if (user.role === "STUDENT") {
		navList.push(
			{
				icon: DashboardOutlined,
				desc: "Dashboard",
				route: "/student/dashboard",
				badge: 0,
			},
			{
				icon: MenuBookIcon,
				desc: "Courses",
				route: "/student/courses",
				badge: 0,
			},
			{
				icon: CalendarMonthIcon,
				desc: "Schedule",
				route: "/student/schedule",
				badge: 0,
			},
			{
				icon: AnnouncementIcon,
				desc: "Announcements",
				route: "/student/announcements",
				badge: 0,
			}
		);
	}
}

export default navList;
