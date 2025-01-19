import Status from "../src/domain/enums/status.enum";

const validTaskInput = {
  subject: "Complete project report",
  description:
    "Finish writing the final report for the project and submit it to the manager.",
  status: Status.Pending,
  username: "d_exemplidis@random.com",
};

const invalidTaskInputs = {
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
  role: "General",
};

const invalidUserInputs = {
  TOO_SHORT_USERNAME: "ab",
  TOO_LONG_USERNAME: "thisIsAVeryLongUsernameToTest",
  EMAIL_INVALID_CASES: [
    ["has invalid email: no prefix", "@mail.com"],
    ["has invalid email: no @", "randommail.com"],
    ["has invalid email: no domain name", "random@.com"],
    ["has invalid email: no .", "random@mailcom"],
    ["has invalid email: no top level domain", "random@mail."],
  ],
  INVALID_ROLE: "Executive",
};

export default {
  invalidTaskInputs,
  validTaskInput,
  validUserInput,
  invalidUserInputs,
};
