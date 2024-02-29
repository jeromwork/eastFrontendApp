/**
 * Interface response appointment data.
 */
export default  interface ScheduleInterface {
    /**
     * The ID of the clinic.
     */
    clinicId: number;

    /**
     * The ID of the doctor.
     */
    doctorId: number;

    /**
     * The timestamp of the appointment date.
     */
    date: number;

    /**
     * The interval between slots in seconds.
     */
    slot_interval: number;

    /**
     * The timestamp when the workday begins.
     */
    work_begin: number;

    /**
     * The timestamp when the workday ends.
     */
    work_end: number;

    /**
     * Array of available time slots.
     */
    slots: number[];
}