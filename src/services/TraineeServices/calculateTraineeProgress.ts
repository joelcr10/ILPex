import Courses from "../../models/courses";
import getDayTraineeProgress from "./getDayTraineeProgress";
import getDaywiseCourseServices from "./getDaywiseCourseServices";

type dayCardType = {day_number: number, progress: number, status: boolean, duration: string}
type currentDayCoursesType = {course_name: string, course_duration: string, course_type: string, day_number: number, course_id: number}

const calculateTraineeProgress = async (trainee_id: number) : Promise<dayCardType[]> => {
    let dayCard : dayCardType[] = [];
    let currentDay : number = 0;
    let unlocked : boolean = true

    for(let i=1;i<22;i++){
        currentDay = i;
        const currentDayCourses : any = await getDaywiseCourseServices(currentDay);

        let status : boolean = false;
        let dayProgress: number = 0;

        if(unlocked){
            const currentDayProgress = await getDayTraineeProgress(trainee_id,currentDay);

            if(currentDayCourses.length===currentDayProgress.length){
                
                dayProgress = 100;
                status = true;

            }else if(currentDayCourses.length<=currentDayProgress.length){
                dayProgress = 100;
                status = true;
            }
            else{
                dayProgress = (currentDayProgress.length/currentDayCourses.length) * 100;
                status = true;
                unlocked = false;
            }
        }

        const duration: string = getCourseDuration(currentDayCourses);
        dayCard.push({
            day_number: i,
            progress: dayProgress,
            status: status,
            duration: duration
        })

        if(i===15){
            i++;
        }

    }

    return dayCard;
} 



const getCourseDuration = (currentDayCourses : currentDayCoursesType[]) =>{
    let duration : number = 0;
    currentDayCourses.map((item: any) => {
        let itemDuration : string = item.course_duration;
        
        let matchResult = itemDuration.match(/((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?/);
        if (matchResult) {
            var hours : number = matchResult[2] ? parseInt(matchResult[2], 10) : 0; // Convert the matched hours to an integer
            var minutes : number = matchResult[4] ? parseInt(matchResult[4], 10) : 0; // Convert the matched minutes to an integer
            var seconds : number = matchResult[6] ? parseInt(matchResult[6], 10) : 0; // Convert the matched seconds to an integer

            duration = duration + (hours*60*60) + (minutes*60) + seconds; //converting everything to seconds

          } else {
            console.log("No match found");
          }

    })

    var hours : number = Math.floor(duration / 3600); // Get the whole hours
    var minutes : number = Math.floor((duration % 3600) / 60); // Get the whole minutes

    if(minutes===0){
        return hours+"h";
    }

    if(hours===0){
        return minutes+"m"
    }
    return hours+"h "+minutes+"m";
}


export default calculateTraineeProgress;