import React from 'react'
import {useSelector} from "react-redux";
import {Menu} from "../../components/Menu";

const ProfilePage = () => {

    const user = useSelector(state => state.user)

    return (
        <div>
            <Menu/>
            <div>
                {'id: ' + user.id}
            </div>
            <div>
                {'name: ' + user.name}
            </div>
            <div>
                {'surname: ' + user.surname}
            </div>
            <div>
                {'email: ' + user.email}
            </div>
            <div>
                {'change password'}
            </div>
        </div>
    )
}

export default ProfilePage