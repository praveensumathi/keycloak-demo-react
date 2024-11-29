import PropTypes from "prop-types";
import UserService from "../services/UserService";
import NotAllowed from "./NotAllowed";

const ADMIN_ROLE = "admin";
const RenderOnAdminRole = ({ showNotAllowed, children }) =>
  UserService.hasRole(ADMIN_ROLE) ? (
    children
  ) : showNotAllowed ? (
    <NotAllowed />
  ) : null;

export default RenderOnAdminRole;
