import { tableSchema } from "@nozbe/watermelondb/Schema";

export const StudentsSchema = tableSchema({
    name: 'students',
    columns: [
        {name: 'name', type: 'string'},
        {name: 'registration', type: 'string'},
    ]
})