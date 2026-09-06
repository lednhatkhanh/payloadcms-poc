import * as migration_20260829_103903_initial from './20260829_103903_initial'
import * as migration_20260829_141959_add_locations from './20260829_141959_add_locations'
import * as migration_20260829_144330_add_homepage_and_news_media from './20260829_144330_add_homepage_and_news_media'
import * as migration_20260829_153100_add_pages from './20260829_153100_add_pages'
import * as migration_20260829_162231_add_editorial_workflow from './20260829_162231_add_editorial_workflow'
import * as migration_20260829_170611_add_localization_and_translation_workflow from './20260829_170611_add_localization_and_translation_workflow'
import * as migration_20260830_083900_add_country_tenancy from './20260830_083900_add_country_tenancy'
import * as migration_20260830_101900_add_form_submission_fields from './20260830_101900_add_form_submission_fields'
import * as migration_20260830_102000_add_editorial_dashboard_and_scheduled_publishing from './20260830_102000_add_editorial_dashboard_and_scheduled_publishing'
import * as migration_20260830_174600_add_operations_role from './20260830_174600_add_operations_role'
import * as migration_20260830_174700_fix_user_country_row_ids from './20260830_174700_fix_user_country_row_ids'
import * as migration_20260830_174800_add_country_lock_relations from './20260830_174800_add_country_lock_relations'
import * as migration_20260830_174900_restore_page_titles from './20260830_174900_restore_page_titles'
import * as migration_20260830_183900_add_seo_configuration from './20260830_183900_add_seo_configuration'

export const migrations = [
  {
    up: migration_20260829_103903_initial.up,
    down: migration_20260829_103903_initial.down,
    name: '20260829_103903_initial',
  },
  {
    up: migration_20260829_141959_add_locations.up,
    down: migration_20260829_141959_add_locations.down,
    name: '20260829_141959_add_locations',
  },
  {
    up: migration_20260829_144330_add_homepage_and_news_media.up,
    down: migration_20260829_144330_add_homepage_and_news_media.down,
    name: '20260829_144330_add_homepage_and_news_media',
  },
  {
    up: migration_20260829_153100_add_pages.up,
    down: migration_20260829_153100_add_pages.down,
    name: '20260829_153100_add_pages',
  },
  {
    up: migration_20260829_162231_add_editorial_workflow.up,
    down: migration_20260829_162231_add_editorial_workflow.down,
    name: '20260829_162231_add_editorial_workflow',
  },
  {
    up: migration_20260829_170611_add_localization_and_translation_workflow.up,
    down: migration_20260829_170611_add_localization_and_translation_workflow.down,
    name: '20260829_170611_add_localization_and_translation_workflow',
  },
  {
    up: migration_20260830_083900_add_country_tenancy.up,
    down: migration_20260830_083900_add_country_tenancy.down,
    name: '20260830_083900_add_country_tenancy',
  },
  {
    up: migration_20260830_101900_add_form_submission_fields.up,
    down: migration_20260830_101900_add_form_submission_fields.down,
    name: '20260830_101900_add_form_submission_fields',
  },
  {
    up: migration_20260830_102000_add_editorial_dashboard_and_scheduled_publishing.up,
    down: migration_20260830_102000_add_editorial_dashboard_and_scheduled_publishing.down,
    name: '20260830_102000_add_editorial_dashboard_and_scheduled_publishing',
  },
  {
    up: migration_20260830_174600_add_operations_role.up,
    down: migration_20260830_174600_add_operations_role.down,
    name: '20260830_174600_add_operations_role',
  },
  {
    up: migration_20260830_174700_fix_user_country_row_ids.up,
    down: migration_20260830_174700_fix_user_country_row_ids.down,
    name: '20260830_174700_fix_user_country_row_ids',
  },
  {
    up: migration_20260830_174800_add_country_lock_relations.up,
    down: migration_20260830_174800_add_country_lock_relations.down,
    name: '20260830_174800_add_country_lock_relations',
  },
  {
    up: migration_20260830_174900_restore_page_titles.up,
    down: migration_20260830_174900_restore_page_titles.down,
    name: '20260830_174900_restore_page_titles',
  },
  {
    up: migration_20260830_183900_add_seo_configuration.up,
    down: migration_20260830_183900_add_seo_configuration.down,
    name: '20260830_183900_add_seo_configuration',
  },
]
