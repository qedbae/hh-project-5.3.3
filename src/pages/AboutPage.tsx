import { Box, Flex, Card, Text, Container } from '@mantine/core'

export const AboutPage = () => {
    return (
        <Box bg='#F6F6F7' pt='xl' style={{ minHeight: '100vh' }}>
            <Container size='sm'>
                <Card>
                    <Flex direction='column' gap='md'>
                        <Text fw={700} size='xl'>Иван Синев</Text>
                        <Text>Начинающий Frontend-разработчик. 
                            Изучаю JavaScript, TypeScript, React и Redux. 
                            Развиваю навыки создания современных веб-приложений, уделяю внимание качеству кода и удобству пользовательского интерфейса.
                        </Text>
                    </Flex>
                </Card>
            </Container>
        </Box>
    )
}