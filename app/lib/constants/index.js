"use strict";

const constants = {
  environment: {
    LOCAL: "local",
    DEVELOPMENT: "development",
    TEST: "test",
    PRODUCTION: "production",
  },
  http: {
    status: {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NOCONTENT: 204,
      MULTI_STATUS: 207,
      REDIRECT: 301,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      NOT_FOUND: 404,
      NOT_ALLOWED: 405,
    },
  },
  error: {
    validation: {},
    message: {
      // HTTP Status code messages
      HTTP_STATUS_CODE_201: "Created",
      HTTP_STATUS_CODE_400: "Bad Request.",
      HTTP_STATUS_CODE_301: "Redirect to other url",
      HTTP_STATUS_CODE_401: "Unauthorized.",
      HTTP_STATUS_CODE_403: "Forbidden.",
      HTTP_STATUS_CODE_404: "The specified resource was not found.",
      HTTP_STATUS_CODE_409: "Resource already exists",
      HTTP_STATUS_CODE_500: "Internal Server Error.",
      INVALID_LOGIN: "Invalid Login",
      EMAIL_MISSING: "Email Missing",
      PAYMENT_ACCOUNT_ID_MISSING: "Payment Account Id Missing",
      INVALID_PAYMENT_ACCOUNT_ID: "Invalid Payment Account Id provided",
    },
  },
  models: {
    USER_TABLE: "users",
    OTP_TABLE: "otps",
    ORGANISATION_TABLE: "organisations",
    PROJECT_TABLE: "projects",
    WORK_CATEGORY_TABLE: "work_categories",
    TASK_TABLE: "tasks",
    TASK_TIMELINE_TABLE: "task_timelines",
    TASK_ISSUE_TABLE: "task_issues",
    TASK_COMMENT_TABLE: "task_comments",
    TASK_ATTACHMENT_TABLE: "task_attachments",
    PROJECT_TEAM_TABLE: "project_teams",
    MATERIAL_UOM_TABLE: "material_uoms",
    MATERIAL_CATEGORY_TABLE: "material_categories",
    MATERIAL_TABLE: "materials",
    INVENTORY_TRANSACTION_TABLE: "inventory_transactions",
    INDENT_TABLE: "indents",
    INDENT_ITEM_TABLE: "indent_items",
    LABOUR_TABLE: "labours",
    LABOUR_ATTENDANCE_TABLE: "labour_attendances",
    SITE_TRANSFER_TABLE: "site_transfers",
    ISSUED_ITEM_TABLE: "issued_items",
    RECEIVED_ITEM_TABLE: "received_items",
    GRN_TABLE: "grns",
  },
  bcrypt: {
    SALT_ROUNDS: 10,
  },
  time: {
    // TOKEN_EXPIRES_IN: 15 * 6000000, // 15 * 1 minute = 15 minutes
    TOKEN_EXPIRES_IN: 365 * 24 * 60 * 60 * 1000,
    REFRESH_TOKEN_EXPIRES_IN: 365 * 24 * 60 * 60 * 1000, // 1 day
  },
};

export default constants;
