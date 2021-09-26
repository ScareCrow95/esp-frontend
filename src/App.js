import React, { useState, useEffect } from 'react'
import { Box, Text, Center, Flex, Image, Circle, Icon } from '@chakra-ui/react'
import * as mqtt from 'react-paho-mqtt'
import { Line } from 'react-chartjs-2'

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
        const client = mqtt.connect(
            'broker.hivemq.com',
            Number(8000),
            'mqtts',
            () => {},
            ({ payloadString }) => {
                const temp = { ...data }

                temp.labels.push(new Date().toLocaleTimeString('en-US'))
                temp.datasets[0].data.push(parseFloat(payloadString))
                setData(temp)
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
