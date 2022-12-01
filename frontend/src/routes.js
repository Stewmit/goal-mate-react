import CalendarPage from './pages/main_pages/CalendarPage'
import ChatPage from './pages/main_pages/ChatPage'
import FriendsPage from './pages/main_pages/FriendsPage'
import GoalsPage from './pages/main_pages/GoalsPage'
import HabitsPage from './pages/main_pages/HabitsPage'
import MyDay from './pages/main_pages/MyDay'
import ProfilePage from './pages/main_pages/ProfilePage'
import TasksPage from './pages/main_pages/TasksPage'
import AuthPage from './pages/main_pages/AuthPage'
import DefaultPage from './pages/main_pages/DefaultPage'
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
        Component: GoalsPage
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
        Component: TasksPage
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
        Component: DefaultPage
    }
]