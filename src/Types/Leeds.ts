export type Leed = {
    _embedded: Lead, 
    _links: Self,
    _page: number
}

type Lead = {
    leads: LeadData []
}

export type LeadDataLite = {
    id: number,
    name: string,
    price: number,
    closest_task_at?: string | number,
    color?: string
}

type LeadData = {
    id: number,
    name: string,
    price: number,
    responsible_user_id: number,
    group_id: number,
    status_id: number,
    pipeline_id: number,
    loss_reason_id: any,
    created_by: number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    closed_at: any,
    closest_task_at: number | string,
    is_deleted: boolean,
    custom_fields_values: any,
    score: any,
    account_id: number,
    labor_cost: any,
    _embedded: Company[],
    tags: unknown[]
} 

type Company = {
    _links: Self,
    id: number
}

type Self = {
    href: string
}