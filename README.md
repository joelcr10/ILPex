# ILPex

# Coding Standards 

1. Use lower camel case for functions and variables. 

	      E.g: const getCourse = () =>{}; 

	        const isActive; 

2. Use pascal case for Models and types 

		E.g: Course, Batch 

3. Proper indentation/spacing for each block of code 

4. Only use arrow functions. 

5. Write appropriate response for each errors. 

	   E.g: res.status(404).json({message: ‘file not found’); 

6. Give proper status code: 

		200: ok 
		
		201: created 
		
		400: Bad Request 
		
		401: Unauthorized 
		
		404: Not found 
		
		422: invalid data 
		
		500: internal server error 
		
		503: service unavailable 

7. Comment the name of the person who created a file or use “gitlens” extension in VS code. 

8. Write program logic and data manipulation in the service folder and call that function in Controllers. 

9. Functions in controller folder will have controller at the end of their name. 

		E.g: createCourseController(); 

10. Functions in service folder will have service at the end of their name 

	    E.g: createCourseService(); 

# Database standards 

1. Table name in small letter only. 

2. Use underscore to separate tow words. 

	   E.g: assessment_batch_mapping 

3. Field names in small letters only 

4. Use underscore for field names also. 

5. Any change in table must be updated in the excel sheet also. 

	 
