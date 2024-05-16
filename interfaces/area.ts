export interface IAreas {
    id: number
    name: string
    code: string
    created_at: string
    updated_at: string
    delete_at: string
}

export interface IAreasDelete {
    area_ids: number[]
}
