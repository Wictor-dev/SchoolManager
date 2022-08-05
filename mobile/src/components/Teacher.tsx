import React, { useEffect, useState } from 'react';
import { Box, Heading, HStack, Text, VStack, IconButton, Icon } from 'native-base';
import { StudentModel } from '../databases/models/StudentModel';
import withObservables from '@nozbe/with-observables'
import { TeacherModel } from '../databases/models/TeacherModel';
import { Button } from './Button';

import { Pencil, Trash } from 'phosphor-react-native'

interface Props {
  teacher: TeacherModel;
  onEdit: () => void;
  onRemove: () => void;
}
export function Teacher({teacher, onEdit, onRemove}: Props) {
  const [students, setStudents] = useState<StudentModel[]>([])

  useEffect(() => {
    // console.log(student)
    async function getStudents() {
      teacher?.students.fetch().then(res => setStudents(res))

    }

    getStudents()

  }, [])

  return (
    <VStack bg="gray.600" mb={8} borderRadius={4} paddingY={4} paddingX={4}>
      <HStack width="100%" justifyContent="space-between">
        <Box>
          <Text color="white" fontSize="lg">Nome: {teacher?.name}</Text>
          <Text color="white" fontSize="lg" mb={2}>Idade: {teacher?.age}</Text>
          <Text color="white" fontSize="lg" mb={2}>Salário: {teacher?.payment}</Text>

          {students.length > 0 && (
            <Heading color="white" fontSize="lg">Estudantes:</Heading>
          )}
          {
              students.map(student => (
                <Text key={student.id} color="gray.200" fontSize="md">Nome: {student?.name}</Text>
              ))
            }
        </Box>
        <VStack maxHeight="100%" justifyContent="space-between" space={4} >
          <IconButton 
            icon={<Icon as={<Pencil size={24} weight="bold" />} />} 
            bg="lightBlue.200"  
            onPress={onEdit}
          />

          <IconButton 
            icon={<Icon as={<Trash size={24} weight="bold"  />} />} 
            bg="danger.400"
            onPress={onRemove}
          />
        </VStack>
      </HStack>

    </VStack>
  );
}