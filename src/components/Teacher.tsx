import React, { useEffect, useState } from 'react';
import { Heading, Text, VStack } from 'native-base';
import { StudentModel } from '../databases/models/StudentModel';
import withObservables from '@nozbe/with-observables'
import { TeacherModel } from '../databases/models/TeacherModel';

interface Props {
  teacher: TeacherModel;
}
export function Teacher(data: Props) {
  const [students, setStudents] = useState<StudentModel[]>([])
  
  useEffect(() => {
    const { teacher } = data

    // console.log(student)
    async function getTeachers(){
      teacher?.students.fetch().then(res => setStudents(res))
    }

    getTeachers()

  }, [])

  return (
    <VStack>
      <Text color="white">{data.teacher?.name}</Text>
      <Text color="white">{data.teacher?.age}</Text>
      <Text color="white">{data.teacher?.payment}</Text>
      <Heading color="white">Estudantes:</Heading>
      {
        students.map(student => (
          <Text key={student.id} color="white">{student?.name}</Text>
        ))
      }
    </VStack>
  );
}