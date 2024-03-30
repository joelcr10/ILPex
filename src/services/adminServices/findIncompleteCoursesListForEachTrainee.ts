import getDaywiseCourseServices from "../../services/TraineeServices/getDaywiseCourseServices";
import getDayTraineeProgress from "../../services/TraineeServices/getDayTraineeProgress";
import daywiseCourseStatus from "../../services/TraineeServices/daywiseCourseStatus";


const findIncompleteCoursesListForEachTrainee :any= async (trainee_id: number|any, day_number: number|any, courseSetId : number) => {

    try {
      // Fetch courses for the given day
      const coursesResponse = await getDaywiseCourseServices(day_number, courseSetId);
      if (!coursesResponse) {
        return "Error getting day wise courses";
      }
      const courses = coursesResponse;
  
      // Fetch trainee progress for the given day
      const progressResponse = await getDayTraineeProgress(trainee_id, day_number);
      if (!progressResponse) {
        return "Error getting trainee progress";
      }
      const progress = progressResponse;
  
      // Call daywiseCourseStatus to process courses and progress
      const courseProgress = daywiseCourseStatus(courses, progress);
  
      // Calculate the total number of courses
      const totalCourses = courses.length;
  
      // Calculate the number of incomplete courses and collect their names
      let incompleteCoursesCount = 0;
      const incompleteCourseNames = [];
      for (const course of courseProgress) {
        if (!course.status) {
          incompleteCoursesCount++;
          incompleteCourseNames.push(course.course_name);
        }
      }
  
      // Return all the data in a single object
      return {
        totalCourses,
        incompleteCoursesCount,
        incompleteCourseNames
      };
    } catch (error) {
      console.error("Error:", error);
      return "Error fetching status of day wise courses";
    }
  };

export default findIncompleteCoursesListForEachTrainee;