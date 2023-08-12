import React, {useEffect, useState} from 'react'
import {Menu} from "../components/Menu.jsx"
import styled from 'styled-components'
import {addFriend, getUsers} from "../http/userAPI.js";
import {IconButton, Button, CircularProgress} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const FriendsPage = () => {

    const [searchValue, setSearchValue] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            getUsers(searchValue).then(userList => {
                setUsers(userList)
                setIsLoading(false)
            })
        }, 500)

        return () => clearTimeout(timer)
    }, [searchValue])

    const handleSearch = e => {
        setSearchValue(e.target.value)
        setIsLoading(true)
    }

    const handleAddFriend = async user => {
        await addFriend({friendId: user.id})
    }

    return (
        <PageContent>
            <FriendsBrowser>
                <Header>
                    <Menu/>
                    <SearchLine
                        placeholder='Поиск контактов'
                        onChange={handleSearch}
                        value={searchValue}
                    />
                </Header>
                {
                    isLoading
                        ?
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <CircularProgress size={30} color={"inherit"} />
                        </div>
                        :
                        <UserList>
                            {
                                users.map((user, index) =>
                                    <UserTile key={index}>
                                        <div style={{display: 'flex', alignItems: "center", gap: '15px'}}>
                                            <UserTilePicture
                                                src={user.avatar ? import.meta.env.VITE_APP_API_URL + user.avatar : 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
                                                alt="Avatar"
                                            />
                                            <UserInfo>
                                                <UserName>{user.name + ' ' + user.surname}</UserName>
                                                <UserEmail>{user.email}</UserEmail>
                                            </UserInfo>
                                        </div>
                                        <Button onClick={() => handleAddFriend(user)}>
                                            <AddCircleOutlineIcon />
                                        </Button>
                                    </UserTile>
                                )
                            }
                        </UserList>
                }
            </FriendsBrowser>
            <div style={{
                width: '80%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end'
            }}>
                <InfoCard>
                    <InfoCardHeader>
                        Ваши контакты
                    </InfoCardHeader>
                    <InfoCardContent>
                        <InfoCardItem>
                            <InfoCardImage src='https://cdn.icon-icons.com/icons2/2630/PNG/512/diversity_avatar_man_boy_people_white_race_smiling_icon_159092.png'/>
                            <InfoCardName>
                                Иван Иванов
                            </InfoCardName>
                            <InfoCardEmail>
                                ivan.mail@yandex.ru
                            </InfoCardEmail>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <IconButton color="primary">
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveIcon style={{color: "#d90d21"}} />
                                </IconButton>
                            </div>
                        </InfoCardItem>
                        <InfoCardItem>
                            <InfoCardImage src='https://content.wepik.com/statics/21209543/preview-page6.jpg'/>
                            <InfoCardName>
                                Никита Михайлов
                            </InfoCardName>
                            <InfoCardEmail>
                                nick.mail@yandex.ru
                            </InfoCardEmail>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <IconButton color="primary">
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveIcon style={{color: "#d90d21"}} />
                                </IconButton>
                            </div>
                        </InfoCardItem>
                        <InfoCardItem>
                            <InfoCardImage src='https://www.tu-ilmenau.de/unionline/fileadmin/_processed_/0/0/csm_Person_Yury_Prof_Foto_AnLI_Footgrafie__2_.JPG_94f12fbf25.jpg'/>
                            <InfoCardName>
                                Давид Ушаков
                            </InfoCardName>
                            <InfoCardEmail>
                                david.mail@yandex.ru
                            </InfoCardEmail>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <IconButton color="primary">
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveIcon style={{color: "#d90d21"}} />
                                </IconButton>
                            </div>
                        </InfoCardItem>
                        <InfoCardItem>
                            <InfoCardImage src='https://engineering.unl.edu/images/staff/Kayla-Person.jpg'/>
                            <InfoCardName>
                                Ирина Соболева
                            </InfoCardName>
                            <InfoCardEmail>
                                irina.mail@yandex.ru
                            </InfoCardEmail>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <IconButton color="primary">
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveIcon style={{color: "#d90d21"}} />
                                </IconButton>
                            </div>
                        </InfoCardItem>
                        <InfoCardItem>
                            <InfoCardImage src='https://www.transparentpng.com/thumb/happy-person/ow7OmE-happy-person-cut-out-pic.png'/>
                            <InfoCardName>
                                Степан Пономарёв
                            </InfoCardName>
                            <InfoCardEmail>
                                stepan.mail@yandex.ru
                            </InfoCardEmail>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <IconButton color="primary">
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveIcon style={{color: "#d90d21"}} />
                                </IconButton>
                            </div>
                        </InfoCardItem>
                    </InfoCardContent>
                </InfoCard>
                <div style={{
                    marginLeft: '50px',
                    display: 'flex',
                    width: '30%',
                    justifyContent: 'end'
                }}>
                    <RequestCard>
                        <RequestCardHeader>
                            Текущие запросы
                        </RequestCardHeader>
                        <RequestItem>
                            <div style={{display: 'flex', alignItems: "center", gap: '15px'}}>
                                <UserTilePicture
                                    src={'https://i.pinimg.com/originals/1c/d7/d1/1cd7d1710afbd03acb6144ba2a8f7a7e.jpg'}
                                    alt="Avatar"
                                />
                                <UserInfo>
                                    <UserName>Фёдор Потапов</UserName>
                                    <UserEmail>potapov.mail@gmail.com</UserEmail>
                                </UserInfo>
                            </div>
                            <div style={{display: "flex", justifyContent: 'right'}}>
                                <IconButton>
                                    <CheckIcon fontSize={'small'} sx={{color: '#17d123'}}/>
                                </IconButton>
                                <IconButton>
                                    <CloseIcon fontSize={'small'} sx={{color: '#d90d21'}}/>
                                </IconButton>
                            </div>
                        </RequestItem>
                    </RequestCard>
                </div>
            </div>
        </PageContent>
    )
}

export default FriendsPage

const PageContent = styled.div`
  display: flex;
  height: 100vh;
`

const FriendsBrowser = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 20%;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-left: 25px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
  width: 300px;
  padding: 5px;
`

const InfoCard = styled.div`
  width: 70%;
  border-radius: 20px;
  box-shadow: 2px 2px 10px #aaa;
  height: 800px;
  margin-right: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`

const InfoCardHeader = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-top: 20px;
`

const InfoCardContent = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

const InfoCardItem = styled.div`
  border: black 2px solid;
  border-radius: 15px;
  width: 205px;
  height: 205px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InfoCardImage = styled.img`
  margin-top: 10px;
  width: 110px;
  height: 110px;
  border-radius: 60px;
  background-color: white;
  border: black 2px solid;
  object-fit: cover;
`

const InfoCardName = styled.div`
  margin-top: 5px;
  font-weight: bold;
  font-size: 18px;
`

const InfoCardEmail = styled.div`
  margin-top: 2px;
  font-size: 12px;
`

const RequestCard = styled.div`
  width: 400px;
  border-radius: 20px;
  box-shadow: 2px 2px 10px #aaa;
  height: 800px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const RequestCardHeader = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`

const RequestItem = styled.div`
  padding-left: 10px;
  background-color: white;
  box-shadow: 2px 2px 10px #aaa;
  width: 80%;
  height: 70px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding-right: 5px;
`

const SearchLine = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  padding: 15px 30px 15px 10px;
  border-radius: 20px;
  border: 2px solid white;
  background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat right white;
  background-size: 20px;
  margin-right: 20px;
`

const UserList = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style: none;
  margin-left: 15px;
`

const UserTile = styled.li`
  margin: 10px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #bbb;
  background-color: white;
`

const UserTilePicture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.div`
  font-weight: bold;
`

const UserEmail = styled.div`
  font-size: 0.8rem;
`