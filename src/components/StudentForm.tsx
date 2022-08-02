import { Select, VStack } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { database } from "../databases";
import { StudentModel } from "../databases/models/StudentModel";
import { TeacherModel } from "../databases/models/TeacherModel";
import { Button } from "./Button";
import { Input } from "./Input";
import { Q } from '@nozbe/watermelondb';

interface Props {
    closeModal: () => void;
    reload: () => void;
}
export function StudentForm({ closeModal, reload }: Props) {
    const [studentName, setStudentName] = useState('')
    const [studentRegistration, setStudentRegistration] = useState('')
    const [showTeachers, setShowTeachers] = useState(false)
    const [teacherId, setTeacherId] = useState('')
    const [teachers, setTeachers] = useState<TeacherModel[]>([])
    const [student, setStudent] = useState<StudentModel>({} as StudentModel)

    async function createStudentTeacher(teacher: TeacherModel) {
        if (teacher?.name) {
            await student.addTeacher(teacher).catch(err => console.log(err))
            closeModal()
            Alert.alert('Professor adicionado com sucesso!')
            reload()
        } else {
            Alert.alert('Não foi possível associar um professor')
        }

    }

    async function getTeacher() {
        const teacherFiltered = teachers.filter(teacher => teacher.id === teacherId)

        if (teacherFiltered.length > 0) {
            createStudentTeacher(teacherFiltered[0])
        } else {
            Alert.alert('Não foi possível adicionar o professor')
        }
    }

    async function getTeachers() {
        const teachersCollection = database.get<TeacherModel>('teachers')
        const response = await teachersCollection.query().fetch()
        setTeachers(response)
    }

    async function saveStudent(name: string, registration: string) {
        await database.write(async () => {
            const response = await database.get<StudentModel>('students')
                .create(data => {
                    data.name = name,
                        data.registration = registration
                })

            setStudent(response)
        })

        Alert.alert('Estudante criado')
    }

    return (
        <VStack>
            {
                !showTeachers
                    ? (
                        <>
                            <Input placeholder='Nome' mb={4} value={studentName} onChangeText={setStudentName} />
                            <Input
                                placeholder="Matrícula"
                                mb={4}
                                value={studentRegistration}
                                onChangeText={setStudentRegistration}
                                keyboardType="number-pad"
                            />
                            <Button mt={4} title="Continuar" onPress={() => {
                                setStudentName('')
                                setStudentRegistration('')
                                saveStudent(studentName, studentRegistration)
                                getTeachers()
                                setShowTeachers(true)
                            }} />
                        </>
                    )
                    : (
                        <>
                            <Select
                                selectedValue={teacherId}
                                placeholder="Escolher Professor"
                                fontSize="lg"
                                onValueChange={item => setTeacherId(item)}
                                _selectedItem={{
                                    bg: "gray.300"
                                }}
                            >
                                {teachers.map(teacher => (
                                    <Select.Item label={`Professor ${teacher.name}`} value={teacher.id} key={teacher.id} />
                                ))}
                            </Select>

                            <Button title="Criar" mt={8} onPress={() => getTeacher()} />
                        </>
                    )
            }

        </VStack>
    )
}