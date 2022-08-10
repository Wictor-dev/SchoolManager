import { VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { database } from '../databases';
import { TeacherModel } from '../databases/models/TeacherModel';
import { Button } from './Button';
import { Input } from './Input';

interface Props {
    closeModal: () => void;
    reload: () => void;
}

export function TeacherForm({ closeModal, reload }: Props) {
    const [teacherName, setTeacherName] = useState('')
    const [teacherAge, setTeacherAge] = useState('')
    const [teacherPayment, setTeacherPayment] = useState('')

    async function saveTeacher(name: string, age: string, payment: string) {
        await database.write(async () => {
            await database.get<TeacherModel>('teachers')
                .create(data => {
                    data.name = name,
                        data.age = age,
                        data.payment = payment
                })
        })

        reload()
        Alert.alert('Professor criado')
    }

    return (
        <VStack>
            <Input placeholder='Nome' mb={4} value={teacherName} onChangeText={setTeacherName} />
            <Input
                placeholder="Idade"
                mb={4}
                value={teacherAge}
                onChangeText={setTeacherAge}
                keyboardType="number-pad"
            />
            <Input
                placeholder="Salário"
                mb={4}
                value={teacherPayment}
                onChangeText={setTeacherPayment}
                keyboardType="number-pad"
            />
            <Button mt={4} title="Criar" onPress={() => {
                setTeacherName('')
                setTeacherAge('')
                setTeacherPayment('')
                saveTeacher(teacherName, teacherAge, teacherPayment)
                closeModal()
            }} />
        </VStack>
    )
}