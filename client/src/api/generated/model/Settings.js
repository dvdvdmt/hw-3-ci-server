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

import ApiClient from '../ApiClient';

/**
 * The Settings model module.
 * @module model/Settings
 * @version 1.0.0
 */
class Settings {
  /**
   * Constructs a new <code>Settings</code>.
   * @alias module:model/Settings
   * @param repoName {String}
   * @param mainBranch {String}
   * @param buildCommand {String}
   * @param period {Number} An interval in minutes between checks for new commits
   */
  constructor(repoName, mainBranch, buildCommand, period) {
    Settings.initialize(this, repoName, mainBranch, buildCommand, period);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, repoName, mainBranch, buildCommand, period) {
    obj['repoName'] = repoName;
    obj['mainBranch'] = mainBranch;
    obj['buildCommand'] = buildCommand;
    obj['period'] = period;
  }

  /**
   * Constructs a <code>Settings</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Settings} obj Optional instance to populate.
   * @return {module:model/Settings} The populated <code>Settings</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Settings();

      if (data.hasOwnProperty('repoName')) {
        obj['repoName'] = ApiClient.convertToType(data['repoName'], 'String');
      }
      if (data.hasOwnProperty('mainBranch')) {
        obj['mainBranch'] = ApiClient.convertToType(data['mainBranch'], 'String');
      }
      if (data.hasOwnProperty('buildCommand')) {
        obj['buildCommand'] = ApiClient.convertToType(data['buildCommand'], 'String');
      }
      if (data.hasOwnProperty('period')) {
        obj['period'] = ApiClient.convertToType(data['period'], 'Number');
      }
    }
    return obj;
  }
}

/**
 * @member {String} repoName
 */
Settings.prototype['repoName'] = undefined;

/**
 * @member {String} mainBranch
 */
Settings.prototype['mainBranch'] = undefined;

/**
 * @member {String} buildCommand
 */
Settings.prototype['buildCommand'] = undefined;

/**
 * An interval in minutes between checks for new commits
 * @member {Number} period
 */
Settings.prototype['period'] = undefined;

export default Settings;
