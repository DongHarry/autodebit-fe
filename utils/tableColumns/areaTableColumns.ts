import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

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
          title: t('area.code'),
          dataIndex: 'company_code',
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
          title: t('area.name'),
          dataIndex: 'name',
          key: 'name',
          sorter: true,
          width: '55%',
        }
      ])
}
