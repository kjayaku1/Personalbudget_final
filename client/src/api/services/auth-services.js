import httpClient from "../http-client";
import {
  LOGIN,
  REGISTER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  CONFIRM_PASSWORD,
  DASHBOARD,
  BUDGETS,
  ALL_BUDGETS,
  REMOVE_BUDGETS,
  UPDATE_BUDGETS,
  GET_BUDGETS_TABLE,
  USER,
  USER_EDIT,
} from "../config";

const AuthServices = {
  /** Pre-Login Routes */
  register: (data) =>
    httpClient.post(REGISTER, data).then((response) => response.data),
  verifyOtp: (data) =>
    httpClient.post(VERIFY_OTP, data).then((response) => response.data),
  resendOtp: (data) =>
    httpClient.post(RESEND_OTP, data).then((response) => response.data),
  forgotPassword: (data) =>
    httpClient.post(FORGOT_PASSWORD, data).then((response) => response.data),
  confirmPassword: (data) =>
    httpClient.post(CONFIRM_PASSWORD, data).then((response) => response.data),
  login: (data) =>
    httpClient.post(LOGIN, data).then((response) => response.data),

  /** Dashboard Routes */
  dashboard: (data) => httpClient.post(DASHBOARD, data).then((response) => response.data),

  /** BUDGETS Routes */
  getBudgets: () => httpClient.get(BUDGETS).then((response) => response.data),
  getAllBudgets: () => httpClient.get(ALL_BUDGETS).then((response) => response.data),
  addBudgets: (data) =>
    httpClient.post(BUDGETS, data).then((response) => response.data),
  updateBudget: (budgetId, data) =>
    httpClient
      .post(`${UPDATE_BUDGETS}/${budgetId}`, data)
      .then((response) => response.data),
  removeBudget: (budgetId) =>
    httpClient
      .post(`${REMOVE_BUDGETS}/${budgetId}`)
      .then((response) => response.data),

  getBudgetTable: (data) =>
    httpClient.post(GET_BUDGETS_TABLE, data).then((response) => response.data),

  /** User Routes */
  getUser: () => httpClient.get(USER).then((response) => response.data),
  editUser: (data) =>
    httpClient.post(USER_EDIT, data).then((response) => response.data),
};

export default AuthServices;
