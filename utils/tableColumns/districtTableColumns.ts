import { useI18n } from 'vue-i18n'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  const columns = [
    {
      title: '',
      dataIndex: 'action',
      width: 50,
    },

    {
      title: t('district.Code'),
      dataIndex: 'Code',
      sorter: true,
      width: 250,
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
      title: t('district.DistrictName'),
      dataIndex: 'DistrictName',
      key: 'DistrictName',
      sorter: true,
      width: 250,
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
      title: t('province.ProvinceName'),
      dataIndex: 'province',
      customRender: ({ record }: { record: any }) => record.Province.ProvinceName,
      width: 250,
      sorter: true,
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
      title: t('country.CountryName'),
      dataIndex: 'country',
      customRender: ({ record }: { record: any }) => record.Country.CountryName,
      width: 250,
      sorter: true,
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
      title: t('common.CodeSync'),
      dataIndex: 'CodeSync',
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
  ]

  return columns
}
