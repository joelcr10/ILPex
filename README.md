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

		GET REQUESTS
----------------------------------------------

		200 OK
		
		400 Bad Request
		
		401 Unauthorized
		
		403 Forbidden
		
		404 Not Found
		
		500 Internal Server Error
		
		503 Service Unavailable



   		POST REQUESTS
----------------------------------------------
		200 OK

  		201 Created

    		202 Accepted

      		400 Bad Request

 		401 Unauthorized

   		403 Forbidden

     		404 Not Found

       		500 Internal Server Error

  		503 Service Unavailable



    		PATCH REQUESTS
----------------------------------------------
      		200 OK

 		204 No Content

   		400 Bad Request

     		401 Unauthorized:

		403 Forbidden

     		404 Not Found

      		500 Internal Server Error

  		503 Service Unavailable
       		

8. Comment the name of the person who created a file or use “gitlens” extension in VS code. 

9. Write program logic and data manipulation in the service folder and call that function in Controllers. 

10. Functions in controller folder will have controller at the end of their name. 

		E.g: createCourseController(); 

11. Functions in service folder will have service at the end of their name 

	    E.g: createCourseService(); 

# Database standards 

1. Table name in small letter only. 

2. Use underscore to separate words. 

	   E.g: assessment_batch_mapping 

3. Field names in small letters only 

4. Use underscore for field names also. 

5. Any change in table must be updated in the excel sheet also. 

	 
