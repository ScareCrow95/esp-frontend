import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-paho-mqtt'

const App = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Temperature',
                backgroundColor: 'rgba(68, 102, 242, 0.4)',
                borderColor: '#4466f2',
                pointBackgroundColor: 'rgba(68, 102, 242, 0.4)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(68, 102, 242, 0.4)',
                data: [],
            },
        ],
    })

    const lineChartOptions = {
        maintainAspectRatio: true,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    display: false,
                },
            ],
            yAxes: [
                {
                    suggestedMin: 60,
                },
            ],
        },
    }

    useEffect(() => {
        const client = connect(
            'broker.hivemq.com',
            Number(8000),
            'mqtts',
            () => {},
            ({ payloadString }) => {
                const tempData = { ...data }
                if (tempData.labels.length > 80) {
                    tempData.labels = []
                    tempData.datasets[0].data = []
                }
                tempData.labels.push(new Date().toLocaleTimeString('en-US'))
                tempData.datasets[0].data.push(Math.max(0, Math.min(parseFloat(payloadString), 60)))
                setData(tempData)
            },
        )
        client.connect({
            onSuccess: () => {
                client.subscribe('pareek/temp')
            },
        })
    })
    return (
        <Flex direction="column" w="100vw" h="100vh" bg="gray.900" justify="center" align="center">
            <Text fontSize="3xl">ESP32 Temperature Realtime Data</Text>
            <Text fontSize="xl" mb={8} color="blue.400">
                1000ms
            </Text>
            <Box w="70%" h="20%">
                <Line data={data} options={lineChartOptions} width={300} height={60} />
            </Box>
            <Flex position="absolute" bottom="0px" right="0px" m={8} color="gray.300">
                <Text mr={1}>Mridul Pareek</Text>
                <Text color="blue.400">• Physics 387 </Text>
            </Flex>
        </Flex>
    )
}

export default App
