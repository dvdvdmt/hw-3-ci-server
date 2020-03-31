/**
 * CI server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from './generated/ApiClient.js';
import DefaultApi from './generated/api/DefaultApi.js';

const client = new ApiClient();
console.log('process.env.API_CLIENT_BASE_URL', process.env.API_CLIENT_BASE_URL);
client.basePath = process.env.API_CLIENT_BASE_URL;

/**
 * The DefaultApi service constructor.
 * @property {module:api/DefaultApi}
 */
export const api = new DefaultApi(client);
