/**
 * Task-related service layer HTTP responses.
 * @module src/service/serviceResources/taskService.response
 */

/**
 * Contains task-related HTTP response messages provided by the service layer to the presentation layer.
 *
 * @memberof module:src/service/serviceResources/taskService.response
 * @type {Object}
 * @property {string} TASK_NOT_FOUND - Message sent when the requested task document is not found.
 * @property {string} TASK_NOT_FOUND - Message sent when the requested task documents are not found.
 * @property {string} TASK_CREATED - Message sent when a new task is successfully created.
 * @property {string} TASK_UPDATED - Message sent when an existing task is successfully updated.
 * @property {string} NO_TASKS_IN_DB - Message sent when no tasks are found in the 'tasks' collection.
 */
const taskServiceResponses = {
  /**
   * Message sent when the requested task document is not found.
   * @memberof taskServiceResponses
   * @type {string}
   */
  TASK_NOT_FOUND: "Task was not found",

  /**
   * Message sent when the requested task documents are not found.
   * @memberof taskServiceResponses
   * @type {string}
   */
  TASKS_NOT_FOUND: "Task were not found",

  /**
   * Message sent when a new task is successfully created.
   * @memberof taskServiceResponses
   * @type {string}
   */
  TASK_CREATED: "Successful task creation",

  /**
   * Message sent when an existing task is successfully updated.
   * @memberof taskServiceResponses
   * @type {string}
   */
  TASK_UPDATED: "Successful task update",

  /**
   * Message sent when no tasks are found in the 'tasks' collection.
   * @memberof taskServiceResponses
   * @type {string}
   */
  NO_TASKS_IN_DB: "No tasks are registered in the database.",
};

export default taskServiceResponses;
