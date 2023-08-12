import React from 'react';
import {Menu} from "../components/Menu.jsx";
import styled from "styled-components";
import {Chip} from "@mui/material";

const FeedPage = () => {

    const goals = [
        {
            id: 1,
            name: 'Прокачать английский',
            image: 'https://sun6-22.userapi.com/s/v1/if1/xviUP4M1PvSwkCGsVCgG4EFxYPpvrkLZfw2N44MUAcni4_h0TgW8pZiZkJnZs0q1Gyw6omDK.jpg?size=1035x1035&quality=96&crop=36,36,1035,1035&ava=1',
            category: 'Образование',
            tasks: '5',
            habits: '4',
            dueDate: '02.02.2023',
            user: {
                name: 'Михаил',
                surname: 'Демидов',
                img: 'http://www.informup.com/assets/frontend/pages/img/pics/img2-large.jpg'
            }
        },
        {
            id: 2,
            name: 'Отдохнуть на Кипре',
            image: 'https://cdn1.ozone.ru/s3/multimedia-o/6064706208.jpg',
            category: 'Путешествия',
            tasks: '6',
            habits: '0',
            dueDate: '07.06.2023',
            user: {
                name: 'Никита',
                surname: 'Васильев',
                img: 'https://sun9-51.userapi.com/impf/c626819/v626819641/4f999/ERE3QUpeEIs.jpg?size=536x525&quality=96&sign=3b476c826c8100090c05dee10de11484&c_uniq_tag=S7Dv9AEZTdCBIRFq7UIR_SwNKm4j9zfnJj1WCBHUbo4&type=album'
            }
        },
        {
            id: 3,
            name: 'Пробежать марафон',
            image: 'https://i1.sndcdn.com/artworks-000187115134-fkmm94-t500x500.jpg',
            category: 'Здоровье',
            tasks: '1',
            habits: '3',
            dueDate: '',
            user: {
                name: 'Даниил',
                surname: 'Воробьёв',
                img: 'https://sun6-23.userapi.com/s/v1/if1/yxGGgasjewC77qUwWPKvCYpn8ipdTiZsgk1XDKoEj6bsh49M8wykORNfp2KRxpd-Ljs6NsUe.jpg?size=1401x1401&quality=96&crop=49,49,1401,1401&ava=1'
            }
        },
        {
            id: 4,
            name: 'Завести блог',
            image: 'https://andreykirillov.art/wp-content/uploads/2020/08/blog.jpg',
            category: 'Досуг',
            tasks: '10',
            habits: '2',
            dueDate: '15.08.2023',
            user: {
                name: 'Ярослав',
                surname: 'Орехов',
                img: 'https://www.pngall.com/wp-content/uploads/8/Young-Man-PNG.png'
            }
        },
    ]

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '3px'
            }}>
                <FeedPageHeader>
                    <Menu/>
                    <div style={{
                        display: 'flex',
                        justifyContent: "center"
                    }}>
                        <TaskPageHeaderText>Фид</TaskPageHeaderText>
                    </div>
                </FeedPageHeader>
            </div>
            <FeedChips>
                <Chip label="Финансы" variant={'outlined'} />
                <Chip label="Путешествия" />
                <Chip label="Образование" />
                <Chip label="Досуг" />
                <Chip label="Семья" variant={'outlined'} />
                <Chip label="Здоровье" />
            </FeedChips>
            <FeedList>
                {goals.map(goal =>
                    <FeedLine>
                        <UserColumn>
                            <UserImage src={goal.user.img}/>
                            <UserName>
                                <div>
                                    {goal.user.name}
                                </div>
                                <div>
                                    {goal.user.surname}
                                </div>
                            </UserName>
                        </UserColumn>
                        <Goal key={goal.id}>
                            <GoalImage src={goal.image} alt=""/>
                            <GoalInfo>
                                <GoalName>{goal.name}</GoalName>
                                <GoalCategory>{goal.category}</GoalCategory>
                                <GoalStat>{'Задач: ' + goal.tasks}</GoalStat>
                                <GoalStat>{'Привычек: ' + goal.habits}</GoalStat>
                            </GoalInfo>
                            <GoalInteractionBox>
                                <OpenButton>этапы</OpenButton>
                            </GoalInteractionBox>
                        </Goal>
                    </FeedLine>
                )}
            </FeedList>
        </div>
    )
};

export default FeedPage;

const OpenButton = styled.button`
  margin-top: 10px;
  padding: 15px;
  font-size: 1em;
  height: 70px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
  margin-bottom: 10px;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`

const FeedPageHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 140px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const TaskPageHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;
`

const FeedChips = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 25px;
`

const FeedList = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: start;
  align-items: start;
  width: 100%;
  padding-left: 40px;
`

const FeedLine = styled.ul`
  align-items: start;
  display: flex;
  justify-content: left;
  gap: 60px;
`

const UserColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 80px;
`

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: black solid 2px;
`

const UserName = styled.div`
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  flex-direction: column;
`

const Goal = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 2px 6px #aaa;
  height: 160px;
  width: 800px;
`

const GoalImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 20px;
`

const GoalInfo = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`

const GoalName = styled.div`
  font-size: 30px;
  width: 350px;
`

const GoalCategory = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`

const GoalStat = styled.div`
  font-size: 20px;
`

const GoalInteractionBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 40px;
`