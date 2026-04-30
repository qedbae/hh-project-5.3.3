import Header from '../components/Header/Header'
import SearchBar from '../components/TitleSeachSection/SearchBar'
import FilterSidebar from '../components/FilterSidebar/FilterSideBar'
import VacancyCard from '../components/VacancyCard/VacancyCard'
import { Text, Flex, Container, Divider, Pagination, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import KeySkillsInput from '../components/KeySkillsInput/KeySkillsInput'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { setPage, setSearch, setCity } from '../store/vacanciesSlice'
import { fetchVacancies } from '../store/vacanciesSlice'
import { useSearchParams } from 'react-router-dom'


function VacanciesPage() {
    const dispatch = useDispatch<AppDispatch>()

    const vacancies = useSelector((state: RootState) => state.vacancies.vacancies)
    const page = useSelector((state: RootState) => state.vacancies.page)
    const search = useSelector((state: RootState) => state.vacancies.search)
    const { loading, error } = useSelector((state: RootState) => state.vacancies)
    const city = useSelector((state: RootState) => state.vacancies.city)

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
        
        const matchesCity = 
            !city || vacancy.area.name === city

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
    }, [search, city])

    useEffect(() => {
        const searchParam = searchParams.get('search') || ''
        const cityParam = searchParams.get('city')

        if (searchParam) {
            dispatch(setSearch(searchParam))
        }

        if (cityParam) {
            dispatch(setCity(cityParam))
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
        <Header />
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
                    <FilterSidebar 
                    selectedCity={city}
                    onChange={(value) => {
                        dispatch(setCity(value))
                        setSearchParams((prev) => {
                        const params = new URLSearchParams(prev)
                        if(value) {
                            params.set('city', value)
                        } else {
                            params.delete('city')
                        }
                        return params
                        })
                    }}/>
                </Flex>
                <Flex direction='column' gap='md' 
                style={{flex: 1}}>
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