const CONFIDENCE_INSIGHTS_TITLE = "Confidence Insights"
const CONFIDENCE_INSIGHTS_HEADER = "Group students by confidence level"
const CONFIDENCE_INSIGHTS_SUBHEADER = "Students are categorised according to their frequency of occurrence in any of the 4 groups."

const CONFIDENCE_INSIGHTS_EXPLN_GRP = "Students are grouped according to their quiz question confidence levels and whether they got the question correct/incorrect. All quiz attempts are considered. If a student has more incorrect than correct attempts, they will be in either 'Misinformed' or 'Uninformed'. If a student has more correct than incorrect attempts, they will be in 'Almost There' or Knowledgeable. For equal numbers, the system takes a “round-down” approach to categorise students: If a student has equal numbers of incorrect attempts in both 'Misinformed' and 'Uninformed', then they will be round down to 'Misinformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS = "Misinformed students are those who chose “Confident” for a question and got it incorrect. This means the student likely has a misconception about the question or the topic, and therefore receives the highest priority."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI = "Uninformed students are those who chose “Not Confident” and got the question incorrect. It is likely that this student can identify the concept they are unaware of. As such, these students are prioritised lower than those in 'Misinformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM = "“Almost There” students are those chose “Not Confident” and got the question correct. This means they are unsure of the answer but might have arrived at it via other means (e.g. elimination). These students require further analysis with other metrics for a better understanding of their learning. However, because they got the question correct, they are given lower priority than those in 'Uninformed'."
const CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO = "“Knowledgeable” students are those who chose “Confident” and got the question correct. This means they are the students with the highest likelihood of understanding the concept. However, there is still a possibility the student got the question correct and still has a conceptual misunderstanding, or has obtained the answer elsewhere without an understanding of the concept. Further analysis with other metrics is required. However, because they got the question correct, they are given less priority than those in 'Almost There'."


export default {
    CONFIDENCE_INSIGHTS_TITLE,
    CONFIDENCE_INSIGHTS_HEADER,
    CONFIDENCE_INSIGHTS_SUBHEADER,
    CONFIDENCE_INSIGHTS_EXPLN_GRP,
    CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS,
    CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI,
    CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM,
    CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO
}
  