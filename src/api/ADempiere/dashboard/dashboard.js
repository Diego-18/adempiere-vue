// This file is for get all information for dashboard of ADempiere client,
// please if you want to implement a custom dashboard create a new fielwith api definition

// Get Instance for connection
import request from '@/utils/request'
import { config } from '@/utils/ADempiere/config'

// Get Recent Items based on selection option
export function requestListRecentItems({
  userUuid,
  roleUuid,
  pageToken,
  pageSize
}) {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/logs/list-recent-items',
    method: 'post',
    data: {
      user_uuid: userUuid,
      role_uuid: roleUuid,
      current_session: true
    },
    params: {
      // Page Data
      pageToken,
      pageSize
    }
  })
    .then(recentItmesReponse => {
      const { convertRecentItemsList } = require('@/utils/ADempiere/apiConverts/dashboard.js')

      return convertRecentItemsList(recentItmesReponse)
    })
}

/**
 * Request Favorites List
 * @param {string} userUuid
 */
export function getFavoritesFromServer({
  userId,
  userUuid,
  pageToken,
  pageSize
}) {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/dashboard/list-favorites',
    method: 'post',
    data: {
      user_id: userId,
      user_uuid: userUuid
    },
    params: {
      // Page Data
      pageToken,
      pageSize
    }
  })
    .then(favoritesListReponse => {
      const { convertFavorite } = require('@/utils/ADempiere/apiConverts/dashboard.js')

      return {
        recordCount: favoritesListReponse.record_count,
        favoritesList: favoritesListReponse.records.map(favorite => {
          return convertFavorite(favorite)
        }),
        nextPageToken: favoritesListReponse.next_page_token
      }
    })
}

// Get pending documents
export function getPendingDocumentsFromServer({
  userId,
  userUuid,
  roleId,
  roleUuid,
  pageToken,
  pageSize
}) {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/dashboard/list-pending-documents',
    method: 'post',
    data: {
      user_id: userId,
      user_uuid: userUuid,
      role_id: roleId,
      role_uuid: roleUuid
    },
    params: {
      // Page Data
      pageToken,
      pageSize
    }
  })
    .then(pendingDocumentsListResponse => {
      const { convertPendingDocument } = require('@/utils/ADempiere/apiConverts/dashboard.js')

      return {
        recordCount: pendingDocumentsListResponse.record_count,
        pendingDocumentsList: pendingDocumentsListResponse.records.map(pendingDocument => {
          return convertPendingDocument(pendingDocument)
        }),
        nextPageToken: pendingDocumentsListResponse.next_page_token
      }
    })
}

// List all dashboard for role
export function requestLisDashboards({
  roleId,
  roleUuid,
  pageToken,
  pageSize
}) {
  return request({
    baseURL: config.adempiere.api.url,
    url: '/dashboard/list-dashboards',
    method: 'post',
    data: {
      role_id: roleId,
      role_uuid: roleUuid
    },
    params: {
      // Page Data
      pageToken,
      pageSize
    }
  })
    .then(dashboardsListResponse => {
      const { convertDashboard } = require('@/utils/ADempiere/apiConverts/dashboard.js')

      return {
        recordCount: dashboardsListResponse.record_count,
        dashboardsList: dashboardsListResponse.records.map(favorite => {
          return convertDashboard(favorite)
        }),
        nextPageToken: dashboardsListResponse.next_page_token
      }
    })
}
