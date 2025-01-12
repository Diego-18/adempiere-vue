// Get Instance for connection
import request from '@/utils/request'
import { config } from '@/utils/ADempiere/config'

/**
 * Request a browser search
 * @param {string} uuid
 * @param {string} tableName
 * @param {array}  parametersList, This allows follow structure:
 *   [{
 *      columnName,
 *      key
 *   }]
 * @param {array}  filters
 * @param {array}  columns
 * @param {string} query
 * @param {string} whereClause
 * @param {number} limit
 * @param {string} orderByClause
 * @param {string} nextPageToken
 */
export function requestBrowserSearch({
  uuid,
  parametersList = [],
  tableName,
  query,
  whereClause,
  orderByClause,
  limit,
  nextPageToken: pageToken,
  pageSize
}) {
  const filters = parametersList.map(parameter => {
    return {
      key: parameter.columnName,
      value: parameter.value,
      values: parameter.values
    }
  })

  return request({
    baseURL: config.adempiere.api.url,
    url: '/ui/list-browser-items',
    data: {
      // Running Parameters
      uuid,
      table_name: tableName,
      // DSL Query
      filters,
      // Custom Query
      query,
      where_clause: whereClause,
      order_by_clause: orderByClause,
      limit
    },
    params: {
      // Page Data
      page_token: pageToken,
      page_size: pageSize
    }
  })
    .then(responseBrowserSearch => {
      const { convertEntityList } = require('@/utils/ADempiere/apiConverts/persistence.js')

      return convertEntityList(responseBrowserSearch)
    })
}
