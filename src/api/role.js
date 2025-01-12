import request from '@/utils/request'
import { config } from '@/utils/ADempiere/config'

export function getRoutes() {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function requestRolesList(token) {
  return request({
    baseURL: config.adempiere.api.url,
    url: 'user/roles',
    method: 'get',
    params: {
      token
    }
  })
    .then(responseRoles => {
      const { convertRole } = require('@/utils/ADempiere/apiConverts/user.js')
      const rolesList = responseRoles.map(itemRol => {
        return convertRole(itemRol)
      })

      return rolesList
    })
}

export function addRole(data) {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    baseURL: config.adempiere.api.url,
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    baseURL: config.adempiere.api.url,
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}

/**
 * Change role of access
 * @param {string} roleUuid
 * @param {string} organizationUuid
 * @param {string} warehouseUuid
 */
export function requestChangeRole({
  roleUuid,
  organizationUuid,
  warehouseUuid
}) {
  return request({
    baseURL: config.adempiere.api.url,
    url: 'user/change-role',
    method: 'post',
    data: {
      role: roleUuid,
      organization: organizationUuid,
      warehouse: warehouseUuid
    }
  })
    .then(responseChangeRole => {
      const { convertSession } = require('@/utils/ADempiere/apiConverts/user.js')

      return convertSession(responseChangeRole)
    })
}
