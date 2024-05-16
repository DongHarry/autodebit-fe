import { useI18n } from 'vue-i18n'

export const useTitle = () => {
  const { t } = useI18n()

  const BREADCRUMB_SETTING_COMPANY = computed(() => {
    return [{ name: t('company.title') }]
  })
  const BREADCRUMB_SETTING_USER = computed(() => {
    return [{ name: t('user.title') }]
  })
  const BREADCRUMB_SETTING_LOCATIONS = computed(() => {
    return [{ name: t('location.title') }]
  })
  const BREADCRUMB_SETTING_CARRIER = computed(() => {
    return [{ name: t('carrier.title') }]
  })
  const BREADCRUMB_SETTING_TRANSPORT_TYPE = computed(() => {
    return [{ name: t('transport_type.title') }]
  })
  const BREADCRUMB_SETTING_COST_TYPE = computed(() => {
    return [{ name: t('cost_type.title') }]
  })

  const BREADCRUMB_SETTING_SERVICE_TYPE = computed(() => {
    return [{ name: t('service_type.title') }]
  })

  const BREADCRUMB_SETTING_COST_GROUP = computed(() => {
    return [{ name: t('cost_group.title') }]
  })

  const BREADCRUMB_VIEW_VENDOR = computed(() => {
    return [{ name: t('vendor.title') }]
  })

  const BREADCRUMB_CREATE_VENDOR = computed(() => {
    return [
      { name: t('vendor.title'), path: '/vendors' },
      { name: t('button.add_new') },
    ]
  })

  const BREADCRUMB_EDIT_VENDOR = computed(() => {
    return [
      { name: t('vendor.title'), path: '/vendors' },
      { name: t('button.detail') },
    ]
  })

  const BREADCRUMB_SETTING_CONTAINER = computed(() => {
    return [{ name: t('container.title') }]
  })

  const BREADCRUMB_SETTING_COUNTRY = computed(() => {
    return [{ name: t('country.title') }]
  })

  const BREADCRUMB_SETTING_PROVINCE = computed(() => {
    return [{ name: t('province.title') }]
  })

  const BREADCRUMB_SETTING_DISTRICT = computed(() => {
    return [{ name: t('district.title') }]
  })

  const BREADCRUMB_SETTING_PACKAGE_UNIT = computed(() => {
    return [{ name: t('package_unit.title') }]
  })

  //areas
  const BREADCRUMB_VIEW_AREA = computed(() => {
    return [{ name: t('area.title') }]
  })

  const BREADCRUMB_CREATE_AREA = computed(() => {
    return [
      { name: t('area.title'), path: '/areas' },
      { name: t('button.add_new') },
    ]
  })

  //routes
  const BREADCRUMB_VIEW_ROUTE = computed(() => {
    return [{ name: t('route.title') }]
  })

  return {
    BREADCRUMB_SETTING_COMPANY,
    BREADCRUMB_SETTING_USER,
    BREADCRUMB_SETTING_LOCATIONS,
    BREADCRUMB_SETTING_CARRIER,
    BREADCRUMB_SETTING_TRANSPORT_TYPE,
    BREADCRUMB_SETTING_COST_TYPE,
    BREADCRUMB_SETTING_SERVICE_TYPE,
    BREADCRUMB_SETTING_COST_GROUP,
    BREADCRUMB_VIEW_VENDOR,
    BREADCRUMB_CREATE_VENDOR,
    BREADCRUMB_EDIT_VENDOR,
    BREADCRUMB_SETTING_CONTAINER,
    BREADCRUMB_SETTING_COUNTRY,
    BREADCRUMB_SETTING_PROVINCE,
    BREADCRUMB_SETTING_DISTRICT,
    BREADCRUMB_SETTING_PACKAGE_UNIT,
    BREADCRUMB_VIEW_AREA,
    BREADCRUMB_CREATE_AREA,
    BREADCRUMB_VIEW_ROUTE
  }
}
