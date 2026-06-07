import { Flex, Group, Image } from '@mantine/core'
import logo from '../../assets/Logo.svg'
import avatar from '../../assets/Avatar.svg';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'
import { useLocation } from 'react-router-dom';

function Header() {

    const location = useLocation()
    const isVacanciesActive = location.pathname.includes('/vacancies')

    return (
        <Flex px='sm' align='center' h={60}
        style={{boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'}}>
            <Group>
                <Image src={logo} alt='Logo' />
            </Group>
            <Group mx='auto'>
                <NavLink 
                to="/vacancies/moscow"
                className={ isVacanciesActive ? styles['active-link'] : styles.link }>
                <>
                    Вакансии FE
                    {isVacanciesActive && (<span className={styles['dot-active']}>•</span>)
                }
                </>
                
                </NavLink>
                    <NavLink 
                    to="/about"
                    className={({ isActive }) => 
                    isActive ? styles['active-link'] : styles.link }>
                        {({isActive}) => (
                            <Flex align='center' gap='3'>
                                <Image src={avatar} 
                                alt='Avatar'
                                style={{ width: '18px'}}
                                className={
                                    isActive ? styles['avatar_active'] : styles.avatar
                                }/>
                            Обо мне
                            {isActive && (<span className={styles['dot-active']}>•</span>)}
                            </Flex>
                        )}
                    </NavLink>
            </Group>
            <Group></Group>
        </Flex>
    )
}

export default Header;