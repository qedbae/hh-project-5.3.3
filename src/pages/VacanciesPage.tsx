import Header from '../components/Header/Header'
import SearchBar from '../components/TitleSeachSection/SearchBar'
import VacancyCard from '../components/VacancyCard/VacancyCard'
import { Text, Flex, Container, Divider, Pagination, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import KeySkillsInput from '../components/KeySkillsInput/KeySkillsInput'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { setPage, setSearch } from '../store/vacanciesSlice'
import { fetchVacancies } from '../store/vacanciesSlice'
import { useSearchParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs } from '@mantine/core'


function VacanciesPage() {
    const dispatch = useDispatch<AppDispatch>()

    const location = useLocation()
    const navigate = useNavigate()

    const currentTab = location.pathname.includes('moscow')
    ? 'moscow'
    : 'petersburg'

    const vacancies = useSelector((state: RootState) => state.vacancies.vacancies)
    const page = useSelector((state: RootState) => state.vacancies.page)
    const search = useSelector((state: RootState) => state.vacancies.search)
    const { loading, error } = useSelector((state: RootState) => state.vacancies)

    const [searchParams, setSearchParams] = useSearchParams()

    const skillsParam = searchParams.get('skills')
    const [skills, setSkills] = useState<string[]>(
        skillsParam
            ? skillsParam.split(',')
            : ['TypeScript', 'React', 'Redux']
        )

    const itemsPerPage = 10

    const filteredVacancies = vacancies.filter(vacancy => {
        const query = search.toLowerCase()

        const matchesSearch = 
            vacancy.name.toLowerCase().includes(query) ||
            vacancy.employer.name.toLowerCase().includes(query)
        
        const selectCity = 
            currentTab === 'moscow'
            ? 'Москва'
            : 'Санкт-Петербург'
        
        const matchesCity = vacancy.area.name === selectCity

        const matchesSkills = 
            skills.length === 0 ||
            skills.some(skill => 
                vacancy.skills?.some(vacancySkill => 
                    vacancySkill.toLowerCase().includes(skill.toLowerCase())
                )
            )
            
        return matchesSearch && matchesCity && matchesSkills
    })

    const currentVacancies = filteredVacancies.slice(
        (page -1) * itemsPerPage,
        page * itemsPerPage
    )

    useEffect(() => {
        dispatch(fetchVacancies())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(setPage(1))
    }, [search])

    useEffect(() => {
        const searchParam = searchParams.get('search') || ''

        if (searchParam) {
            dispatch(setSearch(searchParam))
        }
        
    }, [])

    useEffect(() => {
        const skillsParam = searchParams.get('skills')
        if(!skillsParam && skills.length > 0) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev)
                params.set('skills', skills.join(','))
                return params
            })
        }
    }, [skills])

    useEffect(() => {
        const skillsParam = searchParams.get('skills')

            if (skillsParam) {
            const parsed = skillsParam.split(',')

            if(parsed.join(',') !== skills.join(',')) {
            setSkills(parsed)
            }
        }
    }, [searchParams])

    return (
        <>
        <Box bg='#F6F6F7'>
        <Container size='md' px={0} py='md'>
            <Flex justify='space-between' align='center'>
                <Flex direction='column'>
                    <Text size='xl' fw={700}>Список вакансий </Text>
                    <Text size='md' fw={500} c='dimmed'>по профессии Frontend-разработчик</Text>
                </Flex>
                <SearchBar value={search} 
                onChange={(value) => {
                    dispatch(setSearch(value))
                    setSearchParams((prev) => {
                        const params = new URLSearchParams(prev)
                        if(value) {
                            params.set('search', value)
                        } else {
                            params.delete('search')
                        }
                        return params
                    })
                }}/>
            </Flex>
        </Container>
        <Divider style={{ opacity: 0.2 }}/>
        <Container size='md' px={0} py='md'>
            <Flex justify='space-between' gap='md'>
                <Flex direction='column'>
                    <KeySkillsInput
                    skills={skills}
                    setSkills={(value) =>{
                        const newSkills = typeof value === 'function' ? 
                        value(skills) : value

                        setSkills(newSkills)
                        setSearchParams((prev) => {
                        const params = new URLSearchParams(prev)
                        if(newSkills.length > 0) {
                            params.set('skills', newSkills.join(','))
                        } else {
                            params.delete('skills')
                        }
                        return params
                        })
                    }} />
                </Flex>
                <Flex direction='column' gap='md' 
                style={{flex: 1}}>
                    <Tabs 
                        value={currentTab}
                        onChange={(value) => {
                        navigate(`/vacancies/${value}`)
                        }}
                    >
                        <Tabs.List w='fit-content'>
                            <Tabs.Tab value='moscow'>Москва</Tabs.Tab>
                            <Tabs.Tab value='petersburg'>Санкт-Петербург</Tabs.Tab>
                        </Tabs.List>   
                    </Tabs>
                {loading && <Text>Загрузка</Text>}
                {error && <Text c='red'>{error}</Text>}

                {!loading && ! error &&currentVacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy}/>
                ))}
                </Flex>
                
            </Flex>
        </Container>
        <Flex justify='center' py='md'>
            <Pagination 
                value={page}
                onChange={(value) => dispatch(setPage(value))}
                total={Math.ceil(filteredVacancies.length / itemsPerPage)}
                withEdges
                radius={0}
                color='gray'
                />
        </Flex>
        </Box>
        </>
    )
}

export default VacanciesPage