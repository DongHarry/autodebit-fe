import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { ROUTE_TYPES, USE_STATUS } from '~/constants/route'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  return computed( () =>
      [
        {
          title: '',
          dataIndex: 'action',
          width: '5%',
        },

        {
          title: t('route.code'),
          dataIndex: 'Code',
          sorter: true,
          width: '40%',
          customFilterDropdown: true,
          onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
              setTimeout(() => {
                searchInput?.value.focus()
              }, 100)
            }
          },
        },
        
        {
          title: t('route.name'),
          dataIndex: 'RoutingName',
          key: 'name',
          sorter: true,
          width: '25%',
        },
          {
              title: t('route.type'),
              key: 'type',
              sorter: true,
              width: '25%',
              filters: [
                  { text: t(ROUTE_TYPES.location_type.label), value: ROUTE_TYPES.location_type.value },
                  { text: t(ROUTE_TYPES.area_type.label), value: ROUTE_TYPES.area_type.value },
              ],
          },
          {
              title: t('route.status'),
              dataIndex: 'IsUse',
              key: 'IsUse',
              filters: [
                  { text: t(USE_STATUS.using.label), value: USE_STATUS.using.value },
                  { text: t(USE_STATUS.not_use.label), value: USE_STATUS.not_use.value },
              ],
              sorter: true,
              width: '30%',
          }
      ])
}
