import React, { useState } from "react";
import { Box, FlatList, HStack, Text, View, VStack, Pressable, Heading } from "native-base";
import { database } from "../databases";
import { StudentModel } from "../databases/models/StudentModel";
import { TeacherModel } from "../databases/models/TeacherModel";
import withObservables from '@nozbe/with-observables'

import { useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import { Student } from "../components/Student";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Teacher } from "../components/Teacher";
import { ButtonBottom } from "../components/ButtonBotom";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TeacherForm } from "../components/TeacherForm";
import { StudentForm } from "../components/StudentForm";

export function Home() {
    const [teachers, setTeachers] = useState<TeacherModel[]>([])
    const [students, setStudents] = useState<StudentModel[]>([])
    const [showModal, setShowModal] = useState(false)

    const [activyItems, setActivyItems] = useState<'students' | 'teachers'>('students')

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

        getStudents()
        Alert.alert("Estudante excluído")
    }

    async function handleRemoveTeacher(teacher: TeacherModel) {
        await database.write(async () => {
            await teacher.destroyPermanently();
        })

        fetchData()
        Alert.alert("Professor excluído")
    }

    async function getStudents() {
        const studentsCollection = database.get<StudentModel>('students')
        const response = await studentsCollection.query().fetch()
        setStudents(response)
    }

    function fetchData() {
        if (activyItems === 'students') {
            getStudents()
        } else {
            getTeachers()
        }
    }

    async function getTeachers() {
        const teachersCollection = database.get<TeacherModel>('teachers')
        const response = await teachersCollection.query().fetch()
        setTeachers(response)
    }

    async function saveTeacher(name: string, age: string, payment: string) {
        await database.write(async () => {
            await database.get<TeacherModel>('teachers')
                .create(data => {
                    data.name = name,
                        data.age = Number(age),
                        data.payment = Number(payment)
                })
        })

        fetchData()
        Alert.alert('Professor criado')
    }

    useEffect(() => {
        fetchData()
    }, [activyItems])

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
                activyItems === 'students'
                    ? (
                        <>
                            <Heading
                                color="white"
                                alignSelf="center"
                                fontSize="3xl"
                                mb={8}
                            >
                                Estudantes
                            </Heading>
                            <FlatList
                                data={students}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: 10}}
                                renderItem={({ item }) => (
                                    <Student
                                        student={item}
                                        onEdit={() => { }}
                                        onRemove={() => handleRemoveStudent(item)}
                                    />
                                )}
                            />
                        </>
                    )
                    : (
                        <>
                            <Heading
                                color="white"
                                alignSelf="center"
                                fontSize="3xl"
                                mb={8}
                            >
                                Professores
                            </Heading>
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
                        </>
                    )
            }

            <View position="absolute" right={4} bottom={8}>
                <ButtonBottom onPress={handleShowModal} />
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