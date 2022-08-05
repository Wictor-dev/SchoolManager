import { tableSchema } from "@nozbe/watermelondb/Schema";

export const TeachersSchema = tableSchema({
    name: 'teachers',
    columns: [
        {name: 'name', type: 'string'},
        {name: 'age', type: 'string'},
        {name: 'payment', type: 'string'},
    ]
})