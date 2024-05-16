export interface IFormPackageUnit {
  ID?: number | null
  Name: string
  Code: string
}

export interface IPackageUnitDelete {
  package_unit_ids: number[]
}
