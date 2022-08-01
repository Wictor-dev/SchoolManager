import React, { useEffect, useState } from 'react';
import { Box, Heading, HStack, Text, VStack, IconButton, Icon } from 'native-base';
import { StudentModel } from '../databases/models/StudentModel';
import withObservables from '@nozbe/with-observables'
import { TeacherModel } from '../databases/models/TeacherModel';
import { Button } from './Button';

import { Pencil, Trash } from 'phosphor-react-native'

interface Props {
  student: StudentModel;
  onEdit: () => void;
  onRemove: () => void;
}
export function Student({student, onEdit, onRemove}: Props) {
  const [teachers, setTeachers] = useState<TeacherModel[]>([])

  useEffect(() => {
    // console.log(student)
    async function getTeachers() {
      student?.teachers.fetch().then(res => setTeachers(res))

    }

    getTeachers()

  }, [])

  return (
    <VStack bg="gray.600" mb={8} borderRadius={4} paddingY={4} paddingX={4}>
      <HStack width="100%" justifyContent="space-between">
        <Box>
          <Text color="white" fontSize="lg">Nome: {student?.name}</Text>
          <Text color="white" fontSize="lg" mb={2}>Matrícula: {student?.registration}</Text>

          {teachers.length > 0 && (
            <Heading color="white" fontSize="lg">Professores:</Heading>
          )}
          {
              teachers.map(teacher => (
                <Text key={teacher.id} color="gray.200" fontSize="md">Nome: {teacher?.name}</Text>
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