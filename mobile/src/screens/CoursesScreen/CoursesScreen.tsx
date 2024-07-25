import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { styles } from "./CoursesScreen.styles"
import { CourseList } from "./components/CourseList"
import { Course } from "../../types/course"
import { Select } from "../../components/Select"
import { useQuery } from "react-query"
import { apiClient, endpoints } from "../../api"
import { Option } from "../../types/option"

const MOCKED_CATEGORIES: Option[] = [
  { id: 0, name: "All categories" },
  { id: 1, name: "Agriculture" },
  { id: 2, name: "Livestock" },
  { id: 3, name: "Nutrition" },
  { id: 4, name: "Sustainability" },
]
const MOCKED_LANGUAGES: Option[] = [
  { id: 0, name: "All languages" },
  { id: 1, name: "English" },
  { id: 2, name: "Kinyarwanda" },
  { id: 3, name: "French" },
  { id: 4, name: "Swahili" },
]

export const CoursesScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<Option["id"]>(0)
  const [selectedLanguageId, setSelectedLanguageId] = useState<Option["id"]>(0)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await apiClient.get<Course[]>(endpoints.COURSES)

      return data
    },
    onSuccess: (data) => {
      setFilteredCourses(data)
    },
  })

  console.log(courses)

  const filterCourses = (categoryId: Option["id"], languageId: Option["id"]) => {
    let filtered = courses ?? []

    if (categoryId > 0) {
      const categoryName = MOCKED_CATEGORIES[categoryId]?.name

      filtered = filtered.filter((course) => course.category === categoryName)
    }

    if (languageId > 0) {
      const languageName = MOCKED_LANGUAGES[languageId]?.name

      filtered = filtered.filter((course) => course.language === languageName)
    }

    setFilteredCourses(filtered)
  }

  const handleCategoryChange = (categoryId: Option["id"]) => {
    setSelectedCategoryId(categoryId)
    filterCourses(categoryId, selectedLanguageId)
  }

  const handleLanguageChange = (languageId: Option["id"]) => {
    setSelectedLanguageId(languageId)
    filterCourses(selectedCategoryId, languageId)
  }

  return (
    <ScrollView>
      <View style={styles.coursesScreen}>
        <View style={styles.filterContainer}>
          <Select
            selectedOption={selectedCategoryId}
            options={MOCKED_CATEGORIES}
            onOptionChange={handleCategoryChange}
          />
          <Select
            selectedOption={selectedLanguageId}
            options={MOCKED_LANGUAGES}
            onOptionChange={handleLanguageChange}
          />
        </View>

        <CourseList courses={filteredCourses} />
      </View>
    </ScrollView>
  )
}
