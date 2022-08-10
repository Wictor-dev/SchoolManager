import React, { useState } from "react";
import { Box, FlatList, HStack, Text, View, VStack, Pressable, Heading } from "native-base";
import { database } from "../databases";
import { StudentModel } from "../databases/models/StudentModel";
import { TeacherModel } from "../databases/models/TeacherModel";
import { synchronize } from '@nozbe/watermelondb/sync'

import { useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import { Student } from "../components/Student";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Teacher } from "../components/Teacher";
import { ButtonBottom } from "../components/ButtonBotom";
import { Modal } from "../components/Modal";
import { TeacherForm } from "../components/TeacherForm";
import { StudentForm } from "../components/StudentForm";
import { api } from "../services/api"
import { Button } from "../components/Button";
import { Load } from "../components/Load";
import { Plus, ArrowsClockwise } from 'phosphor-react-native';
import { useNetInfo } from '@react-native-community/netinfo';


export function Home() {
    const netInfo = useNetInfo()
    const [isLoading, setIsLoading] = useState(true)
    const [teachers, setTeachers] = useState<TeacherModel[]>([])
    const [students, setStudents] = useState<StudentModel[]>([])
    const [showModal, setShowModal] = useState(false)
    const [activyItems, setActivyItems] = useState<'students' | 'teachers'>('students')
    async function resetDb() {
        await database.write(async () => {
            await database.unsafeResetDatabase()
        })
    }
    function handleChangeActivyItems(item: typeof activyItems) {
        setActivyItems(item)
    }

    function handleShowModal() {
        setShowModal(!showModal)
    }

    async function handleRemoveStudent(student: StudentModel) {
        await database.write(async () => {
            await student.destroyPermanently();
        })

        fetchData()
        Alert.alert("Estudante excluído")
    }

    async function handleRemoveTeacher(teacher: TeacherModel) {
        await database.write(async () => {
            await teacher.destroyPermanently();
        })

        fetchData()
        Alert.alert("Professor excluído")
    }

    async function saveTeacher(name: string, age: string, payment: string) {
        await database.write(async () => {
            await database.get<TeacherModel>('teachers')
                .create(data => {
                    data.name = name,
                        data.age = age,
                        data.payment = payment
                })
        })

        fetchData()
        Alert.alert('Professor criado')
    }

    async function offlineSynchronize() {
        setIsLoading(true)
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                console.log({lastPulledAt, date: new Date(Number(lastPulledAt))})
                const response = await api.get(`/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
                const { changes, latestVersion } = response.data
                console.log({latestVersion, date: new Date(latestVersion)})
                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes, lastPulledAt }) => {
                const students = changes.students
                const teachers = changes.teachers
                const studentTeachers = changes["student_teachers"]
                console.log(studentTeachers)
                if (activyItems === "students") {
                    try {
                        await api.post(`/students/sync?lastPulledVersion=${lastPulledAt || 0}`, students)

                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    try {
                        await api.post(`/teachers/sync?lastPulledVersion=${lastPulledAt || 0}`, teachers)
                    } catch (error) {
                        console.log(error)
                    }
                }

                try {
                    await api.post(`/assign/sync?lastPulledVersion=${lastPulledAt || 0}`, studentTeachers)

                } catch (error) {
                    console.log(error)
                }
                
            }
        })

        setIsLoading(false)
        fetchData()


    }

    function fetchData() {
        if (activyItems === 'students') {
            fetchStudents()
        } else {
            fetchTeachers()
        }
    }
    async function fetchStudents() {
        try {
            const studentsCollection = database.get<StudentModel>('students')
            const studentsResponse = await studentsCollection.query().fetch()

            setStudents(studentsResponse)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)

        }
    }
    async function fetchTeachers() {
        try {
            const teachersCollection = database.get<TeacherModel>('teachers')
            const teachersResponse = await teachersCollection.query().fetch()

            setTeachers(teachersResponse)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    // useEffect(() => {
    //     if (students.length > 0) {
    //         offlineSynchronize()
    //     }
    // }, [students.length])

    useEffect(() => {
        fetchData()
    }, [activyItems])

    // useEffect(() => {
    //     if (netInfo.isConnected === true) {
    //         offlineSynchronize();
    //     }
    // }, [netInfo.isConnected])

    return (
        <VStack flex={1} bg="gray.800" paddingX={8} paddingTop={getStatusBarHeight() + 16}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <HStack justifyContent="space-between" space={2} mb={8}>
                <Pressable
                    flex={1}
                    _pressed={{
                        opacity: .5,
                    }}
                    onPress={() => handleChangeActivyItems('students')}
                >
                    <Box
                        alignItems="center"
                        width="full"
                        borderWidth={2}
                        borderRadius={4}
                        borderColor="amber.400"
                        bg={activyItems === 'students' ? 'amber.400' : null}
                        paddingY={2}
                    >
                        <Text color={activyItems === 'students' ? 'white' : "amber.400"} fontSize="md">Estudantes</Text>
                    </Box>
                </Pressable>
                <Pressable
                    flex={1}
                    _pressed={{
                        opacity: .5,
                    }}
                    onPress={() => handleChangeActivyItems('teachers')}
                >
                    <Box
                        alignItems="center"
                        width="full"
                        borderWidth={2}
                        borderRadius={4}
                        borderColor="green.400"
                        bg={activyItems === 'teachers' ? 'green.400' : null}
                        paddingY={2}
                    >
                        <Text color={activyItems === 'teachers' ? 'white' : "green.400"} fontSize="md">Professores</Text>
                    </Box>
                </Pressable>
            </HStack>
            {
                isLoading ? (
                    <Load />
                ) : (
                    <>
                        <Heading
                            color="white"
                            alignSelf="center"
                            fontSize="3xl"
                            mb={8}
                        >
                            {activyItems === "students" ? "Estudantes" : "Professores"}
                        </Heading>
                        {
                            activyItems === "students"
                                ? (
                                    <FlatList
                                        data={students}
                                        keyExtractor={item => item.id}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 10 }}
                                        renderItem={({ item }) => (
                                            <Student
                                                student={item}
                                                onEdit={() => { }}
                                                onRemove={() => handleRemoveStudent(item)}
                                            />
                                        )}
                                    />
                                )
                                : (
                                    <FlatList
                                        data={teachers}
                                        keyExtractor={item => item.id}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Teacher
                                                teacher={item}
                                                onEdit={() => { }}
                                                onRemove={() => handleRemoveTeacher(item)}
                                            />
                                        )}
                                    />
                                )
                        }
                    </>
                )

            }

            <View position="absolute" left={4} bottom={8}>
                <ButtonBottom onPress={offlineSynchronize} icon={ArrowsClockwise} />
            </View>

            <View position="absolute" right={4} bottom={8}>
                <ButtonBottom onPress={handleShowModal} icon={Plus} />
            </View>

            <Modal
                modalIsShown={showModal}
                onCloseModal={handleShowModal}
                header={activyItems === 'students' ? 'Estudantes' : 'Professores'}
            >
                {
                    activyItems === 'students'
                        ? (
                            <StudentForm
                                closeModal={handleShowModal}
                                reload={fetchData}
                            />
                        )
                        : (
                            <TeacherForm
                                closeModal={handleShowModal}
                                saveTeacher={saveTeacher}
                            />
                        )
                }

            </Modal>
        </VStack>
    )
}