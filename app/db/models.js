"use strict";
import userModel from "./models/user.model.js";
import otpModel from "./models/otp.model.js";
import organisationModel from "./models/organisation.model.js";
import projectModel from "./models/project.model.js";
import workCategoryModel from "./models/work-category.model.js";
import taskModel from "./models/task.model.js";
import taskTimelineModel from "./models/task-timeline.model.js";
import taskIssueModel from "./models/task-issue.model.js";
import taskCommentModel from "./models/task-comment.model.js";
import taskAttachmentModel from "./models/task-attachment.model.js";
import projectTeamModel from "./models/project-team.model.js";
import materialUomModel from "./models/material-uom.model.js";
import materialCategoryModel from "./models/material-category.model.js";
import materialModel from "./models/material.model.js";
import inventoryTransactionModel from "./models/inventory-transaction.model.js";
import indentModel from "./models/indent.model.js";
import indentItemModel from "./models/indent-item.model.js";
import labourModel from "./models/labour.model.js";
import labourAttendanceModel from "./models/labour-attendance.model.js";
import siteTransferModel from "./models/site-transfer.model.js";
import issuedItemModel from "./models/issued-item.model.js";
import receivedItemModel from "./models/received-item.model.js";
import grnSequenceModel from "./models/grn-sequence.model.js";
import grnModel from "./models/grn.model.js";
import inviteModel from "./models/invite.model.js";

export default {
  UserModel: userModel,
  OtpModel: otpModel,
  OrganisationModel: organisationModel,
  ProjectModel: projectModel,
  WorkCategoryModel: workCategoryModel,
  TaskModel: taskModel,
  TaskTimelineModel: taskTimelineModel,
  TaskIssueModel: taskIssueModel,
  TaskCommentModel: taskCommentModel,
  TaskAttachmentModel: taskAttachmentModel,
  ProjectTeamModel: projectTeamModel,
  MaterialUomModel: materialUomModel,
  MaterialCategoryModel: materialCategoryModel,
  MaterialModel: materialModel,
  InventoryTransactionModel: inventoryTransactionModel,
  IndentModel: indentModel,
  IndentItemModel: indentItemModel,
  LabourModel: labourModel,
  LabourAttendanceModel: labourAttendanceModel,
  SiteTransferModel: siteTransferModel,
  IssuedItemModel: issuedItemModel,
  ReceivedItemModel: receivedItemModel,
  GrnSequenceModel: grnSequenceModel,
  GrnModel: grnModel,
  InviteModel: inviteModel,
};
