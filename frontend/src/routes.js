import CalendarPage from './pages/CalendarPage.jsx'
import ChatPage from './pages/temp/ChatPage.jsx'
import FriendsPage from './pages/temp/FriendsPage.jsx'
import GoalPage from './pages/temp/GoalPage.jsx'
import HabitListPage from './pages/HabitListPage.jsx'
import HabitPage from "./pages/HabitPage.jsx"
import MyDay from './pages/temp/MyDay.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TaskPage from './pages/TaskPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import StartPage from './pages/StartPage.jsx'
import {CALENDAR_ROUTE, CHAT_ROUTE, DEFAULT_ROUTE, FRIENDS_ROUTE, GOALS_ROUTE, HABITS_ROUTE, LOGIN_ROUTE, MY_DAY_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TASKS_ROUTE} from './utils/consts'

export const authRoutes = [
    {
        path: CALENDAR_ROUTE,
        Component: CalendarPage
    },
    {
        path: CHAT_ROUTE,
        Component: ChatPage
    },
    {
        path: FRIENDS_ROUTE,
        Component: FriendsPage
    },
    {
        path: GOALS_ROUTE,
        Component: GoalPage
    },
    {
        path: HABITS_ROUTE,
        Component: HabitListPage
    },
    {
        path: HABITS_ROUTE + '/:id',
        Component: HabitPage
    },
    {
        path: MY_DAY_ROUTE,
        Component: MyDay
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: TASKS_ROUTE,
        Component: TaskPage
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: DEFAULT_ROUTE,
        Component: StartPage
    }
]