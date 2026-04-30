import type { Vacancy } from "../../types/vacancy";
import { Text, Card, Flex } from '@mantine/core'

function CompanyInfo({ vacancy }: { vacancy: Vacancy}) {
    return (
        <>
        <Card>
            <Flex direction='column' gap='sm'>
                <Text fw={600} size='lg'>{vacancy.employer.name}</Text>
                <Text>{vacancy.snippet?.about_company}</Text>
                <Text fw={600}>О проекте</Text>
                <Text>{vacancy.snippet?.about_project}</Text>
            </Flex>
        </Card>
        </>
    )
}

export default CompanyInfo