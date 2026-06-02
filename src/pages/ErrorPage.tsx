import { Flex, Card, Button, Text, Image } from '@mantine/core'
import { useNavigate, useRouteError } from 'react-router-dom'
import Header from '../components/Header/Header'
import sadCat from '../assets/sadCat.gif'

export function ErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()
    
    console.log(error)

    return (
        <>
        <Header />
        <Flex align='center'
        direction='column'
        style={{
            minHeight:'100vh',
            background: '#F6F6F7'
        }}
        >
            <Card w={707} mt='50px' p='45px'>
                <Flex justify='space-between' align='center' mb='md'>
                    <div>
                        <Text size='34px' fw={700} mb='5px'>Упс! Такой страницы</Text>
                        <Text size='34px' fw={700} mb='lg'>не существует</Text>
                        <Text size='18px' fw={400}>Давайте перейдем к началу.</Text>
                    </div>
                    <Button
                    style={{ background: '#4263EB' }}
                    onClick={() => navigate('/vacancies/moscow')}>
                        На главную
                    </Button>
                </Flex>
                <Image 
                src={sadCat}
                radius='md'
                mt='lg'
                />
            </Card>
        </Flex>
        </>
    )
}