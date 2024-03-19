"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daywiseCourseStatus = (courses, progress) => {
    const courseProgress = [];
    courses.map((course) => {
        let completion_status = false;
        progress.map((traineeCourse) => {
            if (course.dataValues.course_id === traineeCourse.dataValues.course_id) {
                completion_status = true;
                return;
            }
        });
        courseProgress.push({
            course_name: course.dataValues.course_name,
            course_duration: course.dataValues.course_duration,
            course_type: course.dataValues.course_type,
            course_id: course.dataValues.course_id,
            status: completion_status
        });
    });
    return courseProgress;
};
exports.default = daywiseCourseStatus;
