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
          title: t('company.code'),
          dataIndex: 'company_code',
          sorter: true,
          width: '30%',
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
          title: t('company.name'),
          dataIndex: 'name',
          key: 'name',
          sorter: true,
          width: '30%',
        },
        {
          title: t('company.level'),
          dataIndex: 'level',
          width: '25%',
          sorter: true,
          filters: [
            {
              text: t("company.parent_company"),
              value: '1',
            },
            {
              text: t("company.branch"),
              value: '2',
            },
          ],
        },
      ])
}
