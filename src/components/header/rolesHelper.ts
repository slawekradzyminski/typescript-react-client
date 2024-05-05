import { Roles } from "../../types"

export const isDoctorOrAdmin = (userRoles: Roles[]) => {
    return userRoles &&
        (userRoles.includes(Roles.ROLE_DOCTOR) || userRoles.includes(Roles.ROLE_ADMIN))
}