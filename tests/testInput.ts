import Status from "../src/domain/enums/status.enum";

const validTaskInput = {
  subject: "Complete project report",
  description:
    "Finish writing the final report for the project and submit it to the manager.",
  status: Status.Pending,
  username: "testUser",
};

const invalidTaskInputs = {
  TASK_ID_LENGTH_CASES: [
    ["task ID is too short", "67927354c870a4"],
    ["task ID is too long", "67927354c870a4ca19c3a7eb67927354c870a4ca19c3a7eb"],
  ] as [string, string][],
  TASK_ID_INVALID_CASES: [
    ["task ID contains special symbols", "679273*4c&70^4ca19%3a7eb"],
    ["task ID contains white spaces", "67927 54c870a4 a19c3a7eb"],
    ["task ID contains capital letters", "67927354C870A4ca19c3a7eb"],
  ] as [string, string][],
  TOO_SHORT_SUBJECT: "Hey",
  TOO_LONG_SUBJECT:
    "Comprehensive Review and Revision of the Year-End Financial Statements to Ensure Compliance with Regulatory Standards and Accuracy.",
  TOO_LONG_DESCRIPTION:
    "In this task, you are required to perform a thorough review and analysis of all departmental budgets, ensuring accuracy and compliance with the organizational financial policies. This includes validating all expense reports, cross-referencing them with original receipts, and ensuring that all expenditures are within the allocated budget limits. Additionally, prepare a detailed report highlighting any discrepancies found and provide recommendations for budget adjustments where necessary. Ensure to collaborate with all department heads to gather required information and clarify any ambiguities. This task must be completed by the end of the financial quarter, and all findings should be presented in a comprehensive manner during the upcoming budget review meeting.",
  INVALID_STATUS: "Fast",
};

const validUserInput = {
  username: "newUser",
  email: "random@mail.com",
  password: "5W]L8t1m4@PcTTO",
};

const invalidUserInputs = {
  USER_ID_LENGTH_CASES: [
    ["user ID is too short", "67710722913928977"],
    ["user ID is too long", "67710722913928977aa04ea067710722913928977aa04ea0"],
  ] as [string, string][],
  USER_ID_INVALID_CASES: [
    ["user ID contains special symbols", "67*db12ed*29a1*ed143e37e"],
    ["user ID contains white spaces", "6771 722 13928977aa04ea0"],
    ["user ID contains capital letters", "67710722913928977AA04ea0"],
  ] as [string, string][],
  TOO_SHORT_USERNAME: "ab",
  TOO_LONG_USERNAME: "thisIsAVeryLongUsernameToTest",
  EMAIL_INVALID_CASES: [
    ["email has no prefix", "@mail.com"],
    ["email has no @", "randommail.com"],
    ["email has no domain name", "random@.com"],
    ["email has no .", "random@mailcom"],
    ["email has no top level domain", "random@mail."],
  ] as [string, string][],
  TOO_SHORT_PASSWORD: "E^e;0=",
  PASSWORD_INVALID_CASES: [
    ["password has no uppercase letters", "!]i&u^^.57h3.,%"],
    ["password has no lowercase letters", "+[Q]D~~A,9CGYZ~"],
    ["password has no numbers", "Q}_MC}mdguOs!Gr"],
    ["password has no special symbols", "EyB0McqoXAOYA1Y"],
  ] as [string, string][],
};

export default {
  invalidTaskInputs,
  validTaskInput,
  validUserInput,
  invalidUserInputs,
};
