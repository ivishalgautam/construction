import jwtVerify from "../../helpers/auth.js";
import userRoutes from "../../api/users/routes.js";
import organisationRoutes from "../../api/organisation/routes.js";
import projectRoutes from "../../api/project/routes.js";
import workCategoryRoutes from "../../api/work-category/routes.js";
import taskRoutes from "../../api/task/routes.js";
import taskTimelineRoutes from "../../api/task_timeline/routes.js";
import taskIssueRoutes from "../../api/task_issue/routes.js";
import taskCommentRoutes from "../../api/task_comment/routes.js";
import taskAttachmentRoutes from "../../api/task_attachment/routes.js";
import projectTeamRoutes from "../../api/project_team/routes.js";
import materialUomRoutes from "../../api/material_uom/routes.js";
import materialCategoryRoutes from "../../api/material_category/routes.js";
import materialRoutes from "../../api/material/routes.js";
import inventoryTransactionRoutes from "../../api/inventory_transaction/routes.js";
import labourRoutes from "../../api/labour/routes.js";
import labourAttendanceRoutes from "../../api/labour_attendance/routes.js";
import siteTransferRoutes from "../../api/site_transfer/routes.js";

export default async function routes(fastify, options) {
  fastify.addHook("onRequest", jwtVerify.verifyToken);
  fastify.register(userRoutes, { prefix: "users" });
  fastify.register(organisationRoutes, { prefix: "organisations" });
  fastify.register(projectRoutes, { prefix: "projects" });
  fastify.register(workCategoryRoutes, { prefix: "workCategories" });
  fastify.register(taskRoutes, { prefix: "tasks" });
  fastify.register(taskTimelineRoutes, { prefix: "taskTimelines" });
  fastify.register(taskIssueRoutes, { prefix: "taskIssues" });
  fastify.register(taskCommentRoutes, { prefix: "taskComments" });
  fastify.register(taskAttachmentRoutes, { prefix: "taskAttachments" });
  fastify.register(projectTeamRoutes, { prefix: "projectTeams" });
  fastify.register(materialUomRoutes, { prefix: "materialUoms" });
  fastify.register(materialCategoryRoutes, { prefix: "materialCategories" });
  fastify.register(materialRoutes, { prefix: "materials" });
  fastify.register(inventoryTransactionRoutes, {
    prefix: "inventoryTransactions",
  });
  fastify.register(labourRoutes, { prefix: "labours" });
  fastify.register(labourAttendanceRoutes, { prefix: "labourAttendances" });
  fastify.register(siteTransferRoutes, { prefix: "siteTransfers" });
}
