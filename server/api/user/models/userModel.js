export default {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                gender: {
                    bsonType: 'string',
                    description: 'must be a string and is not required'
                },
                yearOfBirth: {
                    bsonType: 'int',
                    minimum: 1950,
                    maximum: 2018,
                    exclusiveMaximum: false,
                    description: 'must be an integer in [ 1950, 2018 ] and is not required'
                },
                major: {
                    enum: ['Math', 'English', 'Computer Science', 'History', null],
                    description: 'can only be one of the enum values and is required'
                },
                weight: {
                    bsonType: 'array',
                    minimum: 0,
                    description: 'must be a double and is required'
                }
            }
        }
    }
};
