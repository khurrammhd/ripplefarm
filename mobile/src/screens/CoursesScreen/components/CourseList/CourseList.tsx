import { View } from "react-native"
import { styles } from "./CourseList.styles"
import { CourseItem } from "../CourseItem"
import { Course } from "../../../../types/course"

type CourseListProps = {
  courses: Course[]
}

export const CourseList = ({ courses }: CourseListProps) => {
  return (
    <View style={styles.courseList}>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </View>
  )
}
