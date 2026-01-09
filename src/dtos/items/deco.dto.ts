export interface DecoDto {
    id: number
    name: string
    group_type: string
    name_key?: string
    deco_seg_id: number
    animated: number
    build_time: number
    mobile_version: number
    android_version: number
    show_on_mobile: number
    type: string
    xp: number
    min_level: number
    costs: {
        g?: number
        c?: number
    }
    display_order: number
    boost_modifier: number
    gift_level: number
    giftable: number
    collect: number
    category_id: number
    subcategory_id: number
    building_limit_same_id: number
    in_store: number
    width: number
    height: number
    new_item: number
    img_name: string
    img_name_mobile: string
    img_name_android: string
    inventory_ids?: number
    upgrades_to: number
    collect_type: any
    velocity?: number
    description?: string
    sell_price?: {
        g?: number
    }
    properties?: {
        bulldozable?: number
        floating?: number
        capacity?: number
        incubator?: number
        friend_assistable?: number
        fixed_position?: Array<number>
        upgrade_from?: number
        is_fixed?: number
        max_gold?: number
        crosspromotion?: number
        demolishable?: number
    }
    building_ownership_id: number
    cost_unit_cash?: number
    activation?: number
    element_type?: string
    collect_xp?: number
    elements?: Array<string>
    multiple_costs?: Array<{
        c: number
    }>
    animated_canvas?: string
}