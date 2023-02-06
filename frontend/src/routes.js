import CalendarPage from './pages/CalendarPage'
import ChatPage from './pages/main_pages/ChatPage'
import FriendsPage from './pages/main_pages/FriendsPage'
import GoalPage from './pages/main_pages/GoalPage'
import HabitsPage from './pages/main_pages/HabitsPage'
import MyDay from './pages/main_pages/MyDay'
import ProfilePage from './pages/ProfilePage'
import TaskPage from './pages/TaskPage'
import AuthPage from './pages/AuthPage'
import StartPage from './pages/StartPage'
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
        Component: HabitsPage
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