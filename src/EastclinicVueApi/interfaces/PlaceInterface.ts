export default  interface Place {
    id:number
    native_id?: string | null;
    name?: string | null;
    name_cyr?: string | null;
    name_in?: string | null;
    name_from?: string | null;
    name_to?: string | null;
    mkad_distance?: number | null;
    place_type?: number | null;
    lat?: string | null;
    lon?: string | null;
    branch_id?: number | null;
    in_work: number;
}