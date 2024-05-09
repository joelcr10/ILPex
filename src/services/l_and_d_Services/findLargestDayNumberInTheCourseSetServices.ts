import Courses from "../../models/courses";

const findLargestDayNumberInTheCourseSetServices = async (
  courseSetId: number
) => {
  const course_list = await Courses.findAll({
    where: { course_set_id: courseSetId },
  });
  const distinctDayNumbers = [
    ...new Set(course_list.map((course) => course.day_number)),
  ];
  const largestDayNumber = Math.max(...distinctDayNumbers);
  return largestDayNumber;
};

export default findLargestDayNumberInTheCourseSetServices;
