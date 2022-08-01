import React, { useState } from "react";
import { Box, FlatList, HStack, Text, View, VStack, Pressable } from "native-base";
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
import { StudentModal } from "../components/StudentModal";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Home() {
    const [teacher, setTeacher] = useState<TeacherModel>({} as TeacherModel)
    const [students, setStudents] = useState<StudentModel[]>([])
    const [showStudentModal, setShowStudentModal] = useState(false)
    const [studentName, setStudentName] = useState('')
    const [studentRegistration, setStudentRegistration] = useState('')

    const [activyItems, setActivyItems] = useState<'students' | 'teachers'>('students')

    function handleChangeActivyItems(item: typeof activyItems){
        setActivyItems(item)
    }

    function handleShowStudentModal() {
        setShowStudentModal(!showStudentModal)
        // console.log(showStudentModal)
    }

    async function handleRemoveStudent(student: StudentModel) {
        await database.write(async () => {
            await student.destroyPermanently();
        })

        getStudents()
        Alert.alert("Estudante excluído")
    }

    async function studentAddTeacher() {
        const studentsCollection = database.get<StudentModel>('students')
        const response = await studentsCollection.query().fetch()

        const teachersCollection = database.get<TeacherModel>('teachers')
        const teacherResponse = await teachersCollection.query().fetch()

        response[0].addTeacher(teacherResponse[1])
        // .then(res => console.log(res._raw));
    }
    async function getStudents() {
        const studentsCollection = database.get<StudentModel>('students')
        const response = await studentsCollection.query().fetch()
        // console.log(teacher._raw)
        // response[0].addTeacher(teacher)
        // console.log(response[0].teachers)
        setStudents(response)
    }


    async function saveStudent(name: string, registration: string) {
        await database.write(async () => {
            await database.get<StudentModel>('students')
                .create(data => {
                    data.name = name,
                        data.registration = registration
                })
        })

        getStudents()
        Alert.alert('Estudante criado')
    }

    async function getTeachers() {
        const teachersCollection = database.get<TeacherModel>('teachers')
        const response = await teachersCollection.query().fetch()
        setTeacher(response[0])
        // console.log(response[0]?._raw)
    }

    async function saveTeacher(name: string, age: number, payment: number) {
        await database.write(async () => {
            await database.get<TeacherModel>('teachers')
                .create(data => {
                    data.name = name,
                        data.age = age,
                        data.payment = payment
                })
        })

        Alert.alert('Professor criado')
    }

    useEffect(() => {
        getStudents()
    }, [])

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
                        bg={activyItems === 'students' ? 'amber.400': null}
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
                        bg={activyItems === 'teachers' ? 'green.400': null}
                        paddingY={2}
                    >
                        <Text color={activyItems === 'teachers' ? 'white' : "green.400"} fontSize="md">Professores</Text>
                    </Box>
                </Pressable>
            </HStack>

            <FlatList
                data={students}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Student
                        student={item}
                        onEdit={() => { }}
                        onRemove={() => handleRemoveStudent(item)}
                    />
                )}
            />

            <View position="absolute" right={4} bottom={8}>
                <ButtonBottom onPress={handleShowStudentModal} />
            </View>

            <StudentModal
                modalIsShown={showStudentModal}
                onCloseModal={handleShowStudentModal}
                header="Estudantes"
            >
                <VStack>
                    <Input placeholder='Nome' mb={4} value={studentName} onChangeText={setStudentName} />
                    <Input 
                        placeholder="Matrícula" 
                        mb={4} 
                        value={studentRegistration} 
                        onChangeText={setStudentRegistration}
                        keyboardType="number-pad"
                    />
                    <Button mt={4} title="Criar" onPress={() => {
                        setStudentName('')
                        setStudentRegistration('')
                        setShowStudentModal(false)
                        saveStudent(studentName, studentRegistration)
                    }} />
                </VStack>
            </StudentModal>
        </VStack>
    )
}