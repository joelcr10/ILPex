# ILPex

# Coding Standards 

1. Use lower camel case for functions and variables. 

	E.g: const getCourse = () =>{}; 

	        const isActive; 

2. Use pascal case for Models and types 

	E.g: Course, Batch 

Proper indentation/spacing for each block of code 

Only use arrow functions. 

Write appropriate response for each errors. 

	E.g: res.status(404).json({message: ‘file not found’); 

Give proper status code: 

200: ok 

201: created 

400: Bad Request 

401: Unauthorized 

404: Not found 

422: invalid data 

500: internal server error 

503: service unavailable 

Comment the name of the person who created a file or use “gitlens” extension in VS code. 

Write program logic and data manipulation in the service folder and call that function in Controllers. 

Functions in controller folder will have controller at the end of their name. 

	E.g: createCourseController(); 

Functions in service folder will have service at the end of their name 

	E.g: createCourseService(); 

# Database standards 

Table name in small letter only. 

Use underscore to separate tow words. 

	E.g: assessment_batch_mapping 

Field names in small letters only 

Use underscore for field names also. 

Any change in table must be updated in the excel sheet also. 

	 
