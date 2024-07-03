"use strict";
import constants from "../../lib/constants/index.js";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.TaskModel.getById(req, req.body.task_id);

  if (!record) {
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });
  }

  const { total_work_amount: totalTaskWorkAmount } = record;

  const timelines = await table.TaskTimelineModel.getByTaskId(
    req,
    req.body.task_id
  );

  const totalTimelineWorkDone = timelines.reduce(
    (acc, curr) => acc + curr.work_done,
    0
  );
  const currTaskProgress = timelines.reduce(
    (acc, curr) => acc + curr.progress,
    0
  );

  const currTimelineWorkDone = Number(req.body.work_done); // new timeline work done
  if (isNaN(currTimelineWorkDone)) {
    return ErrorHandler({
      code: BAD_REQUEST,
      message: "Invalid work done amount!",
    });
  }

  const newProgress = (currTimelineWorkDone * 100) / totalTaskWorkAmount;

  if (totalTimelineWorkDone + currTimelineWorkDone > totalTaskWorkAmount) {
    /* if the sum of the total work done in all existing timelines plus the
new work done in the current timeline exceeds the total work amount of the task. If this condition
is true, it means that the work done amount for the current timeline is not allowed as it would
exceed the total work amount of the task. */
    return ErrorHandler({
      code: BAD_REQUEST,
      message: "Work done amount is not valid!",
    });
  }

  req.body.progress = newProgress;
  const timeline = await table.TaskTimelineModel.create(req);

  if (timeline) {
    const updatedProgress = currTaskProgress + newProgress;
    req.body.progress = updatedProgress;
    req.body.total_work_done_amount =
      totalTimelineWorkDone + currTimelineWorkDone;

    if (updatedProgress === 100) {
      req.body.status = "completed";
    }

    await table.TaskModel.update(req, req.body.task_id);
    res.send(timeline);
  } else {
    return ErrorHandler({
      code: INTERNAL_SERVER_ERROR,
      message: "Failed to create timeline entry.",
    });
  }
};

const deleteById = async (req, res) => {
  const timelineRecord = await table.TaskTimelineModel.getById(req);
  if (!timelineRecord) {
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Task timeline not found!",
    });
  }

  const taskRecord = await table.TaskModel.getById(
    { params: { id: timelineRecord.task_id } },
    timelineRecord.task_id
  );
  if (!taskRecord) {
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Task not found!",
    });
  }

  const deletionSuccess = await table.TaskTimelineModel.deleteById(req);
  if (!deletionSuccess) {
    return ErrorHandler({
      code: INTERNAL_SERVER_ERROR,
      message: "Failed to delete the task timeline.",
    });
  }

  /* This part of the code is handling the update of the task's total work done amount and progress after
deleting a task timeline entry. */
  const updatedTaskTotalWorkDone =
    taskRecord.total_work_done_amount - timelineRecord.work_done;

  const updatedTaskProgress = taskRecord.progress - timelineRecord.progress;

  await table.TaskModel.update({
    params: { id: timelineRecord.task_id },
    body: {
      total_work_done_amount: updatedTaskTotalWorkDone,
      progress: updatedTaskProgress,
      status: "not_started",
    },
  });

  res.send(timelineRecord);
};

const getByTaskId = async (req, res) => {
  const record = await table.TaskModel.getById(req);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(await table.TaskTimelineModel.getByTaskId(req));
};

export default {
  create: create,
  deleteById: deleteById,
  getByTaskId: getByTaskId,
};
