const CONFIDENCE_INSIGHTS_TITLE = "Confidence Insights"
const CONFIDENCE_INSIGHTS_HEADER = "Group students by confidence level"
const CONFIDENCE_INSIGHTS_SUBHEADER = "Students are categorised according to their frequency of occurrence in any of the 4 groups."

const CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_1 = "For each quiz question, each student is assigned to one of these 4 categories based on the answer's accuracy and the indicated confidence level."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_2 = "The 4 categories are ranked from highest risk to lowest risk of failing the module: Misinformed students, Uninformed, Almost there, Knowledgable."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_3 = "Each student will be assigned to an overall category which has the highest frequency of occurrence. If there is more than 1 category that has the highest frequency of occurrence, the category with the highest risk is chosen."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_OLD = "Students are grouped according to their quiz question confidence levels and whether they got the question correct/incorrect. All quiz attempts are considered. If a student has more incorrect than correct attempts, they will be in either 'Misinformed' or 'Uninformed'. If a student has more correct than incorrect attempts, they will be in 'Almost There' or Knowledgeable. For equal numbers, the system takes a “round-down” approach to categorise students: If a student has equal numbers of incorrect attempts in both 'Misinformed' and 'Uninformed', then they will be round down to 'Misinformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS = "Misinformed students are those who chose “Confident” for a question and got it incorrect. This means the student likely has a misconception about the question or the topic, and therefore receives the highest priority."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI = "Uninformed students are those who chose “Not Confident” and got the question incorrect. It is likely that this student can identify the concept they are unaware of. As such, these students are prioritised lower than those in 'Misinformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM = "“Almost There” students are those chose “Not Confident” and got the question correct. This means they are unsure of the answer but might have arrived at it via other means (e.g. elimination). These students require further analysis with other metrics for a better understanding of their learning. However, because they got the question correct, they are given lower priority than those in 'Uninformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO = "“Knowledgeable” students are those who chose “Confident” and got the question correct. This means they are the students with the highest likelihood of understanding the concept. However, there is still a possibility the student got the question correct and still has a conceptual misunderstanding, or has obtained the answer elsewhere without an understanding of the concept. Further analysis with other metrics is required. However, because they got the question correct, they are given less priority than those in 'Almost There'."

const CONFIDENCE_TUTORIAL_INTRO_HEADER = "Introduction to Student Insights"
const CONFIDENCE_TUTORIAL_INTRO_PARA_1 = "Curious to know who are the high performing and low performing students in the module?"
const CONFIDENCE_TUTORIAL_INTRO_PARA_2 = "This page provides insights of a student’s performance level based on his/her quiz attempts."
const CONFIDENCE_TUTORIAL_INTRO_PARA_3 = "This insight is available when you enable ‘Confidence Level’ when creating quizzes."
const CONFIDENCE_TUTORIAL_INTRO_FOOTER = "Proceed to the next step to see how you can analyse this insight."

const CONFIDENCE_TUTORIAL_PART_1A_HEADER = "Part 1a: Understanding the four groups of students"
const CONFIDENCE_TUTORIAL_PART_1B_HEADER = "Part 1b: Understanding the four groups of students"
const CONFIDENCE_TUTORIAL_PART_1B_DESC = "These 4 groups are summarised in the legend."
const CONFIDENCE_TUTORIAL_PART_2_HEADER = "Part 2: Understanding how each student is categorised"
const CONFIDENCE_TUTORIAL_PART_3_HEADER = "Part 3: Understanding how an overall category is assigned to a student"
const CONFIDENCE_TUTORIAL_PART_4_HEADER = "Part 4: Understanding how to identify the number of students in each category"
const CONFIDENCE_TUTORIAL_PART_4_DESC = "The graph shows the number of students assigned to each of the 4 categories."
const CONFIDENCE_TUTORIAL_PART_5A_HEADER = "Part 5a: Understanding how to identify who the students are in each category"
const CONFIDENCE_TUTORIAL_PART_5A_DESC = "There are 2 ways to retrieve the names of students who are in a particular category."
const CONFIDENCE_TUTORIAL_PART_6_HEADER = "Part 6: Viewing the details of the students in the selected category"
const CONFIDENCE_TUTORIAL_PART_7_HEADER = "Part 7: Obtaining contact information of students in a particular group"
const CONFIDENCE_TUTORIAL_PART_8_HEADER = "Part 8: Copying Emails to Clipboard"
const CONFIDENCE_TUTORIAL_PART_9_HEADER = "Part 9: Emailing selected students"
const CONFIDENCE_TUTORIAL_PART_9_DESC = "You may want to reach out to students who are in a particular group to arrange for a consultation in order to better track their learning progress"
const CONFIDENCE_TUTORIAL_PART_10_HEADER = "Part 10: Conclusion for Student Insights"
const CONFIDENCE_TUTORIAL_PART_10_CONGRATS = "Congratulations on completing the tutorial!"
const CONFIDENCE_TUTORIAL_PART_10_PARA_1 = "We have covered the details on the 4 categories of students and how to identify students in a particular group."
const CONFIDENCE_TUTORIAL_PART_10_PARA_2 = "Now you are able to analyse the insights for students who are at the highest risk of failing this module and intervene early by reaching out to them through email."

export default {
  CONFIDENCE_INSIGHTS_TITLE,
  CONFIDENCE_INSIGHTS_HEADER,
  CONFIDENCE_INSIGHTS_SUBHEADER,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_1,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_2,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_3,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_OLD,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM,
  CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO,
  CONFIDENCE_TUTORIAL_INTRO_HEADER,
  CONFIDENCE_TUTORIAL_INTRO_PARA_1,
  CONFIDENCE_TUTORIAL_INTRO_PARA_2,
  CONFIDENCE_TUTORIAL_INTRO_PARA_3,
  CONFIDENCE_TUTORIAL_INTRO_FOOTER,
  CONFIDENCE_TUTORIAL_PART_1A_HEADER,
  CONFIDENCE_TUTORIAL_PART_1B_HEADER,
  CONFIDENCE_TUTORIAL_PART_1B_DESC,
  CONFIDENCE_TUTORIAL_PART_2_HEADER,
  CONFIDENCE_TUTORIAL_PART_3_HEADER,
  CONFIDENCE_TUTORIAL_PART_4_HEADER,
  CONFIDENCE_TUTORIAL_PART_4_DESC,
  CONFIDENCE_TUTORIAL_PART_5A_HEADER,
  CONFIDENCE_TUTORIAL_PART_5A_DESC,
  CONFIDENCE_TUTORIAL_PART_6_HEADER,
  CONFIDENCE_TUTORIAL_PART_7_HEADER,
  CONFIDENCE_TUTORIAL_PART_8_HEADER,
  CONFIDENCE_TUTORIAL_PART_9_HEADER,
  CONFIDENCE_TUTORIAL_PART_9_DESC,
  CONFIDENCE_TUTORIAL_PART_10_HEADER,
  CONFIDENCE_TUTORIAL_PART_10_CONGRATS,
  CONFIDENCE_TUTORIAL_PART_10_PARA_1,
  CONFIDENCE_TUTORIAL_PART_10_PARA_2,
}
