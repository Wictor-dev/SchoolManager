import { VStack } from 'native-base';
import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface Props {
    saveTeacher: (name: string, age: string, payment: string) => void;
    closeModal: () => void;
}

export function TeacherForm({saveTeacher, closeModal}: Props) {
    const [teacherName, setTeacherName] = useState('')
    const [teacherAge, setTeacherAge] = useState('')
    const [teacherPayment, setTeacherPayment] = useState('')
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