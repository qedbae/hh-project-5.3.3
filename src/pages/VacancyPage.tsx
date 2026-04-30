import type { RootState } from '../store/store';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from '../components/Header/Header';
import VacancyCard from '../components/VacancyCard/VacancyCard';
import { Flex, Container, Box } from '@mantine/core';
import CompanyInfo from '../components/CompanyInfo/CompanyInfo';

function VacancyPage() {

    const { id } = useParams()

    const vacancies = useSelector((state: RootState) => state.vacancies.vacancies)
    const vacancy = vacancies.find(vac => vac.id === id)

    if (!vacancy) {
        return <div>Вакансия не найдена</div>
    }
    
    return (
        <>
        <Header/>
        <Box bg='#F6F6F7' style={{ minHeight: '100vh' }}>
            <Container size='sm'>
                <Flex direction='column' align='stretch'>
                    <div style={{margin: '25px 0'}}>
                        <VacancyCard vacancy={vacancy} 
                            showAction={false} 
                            actionText='Откликнуться на hh.ru'/>
                    </div>
                    <CompanyInfo vacancy={vacancy}/>
                </Flex>
            </Container>
        </Box>
        </>
    )
}

export default VacancyPage