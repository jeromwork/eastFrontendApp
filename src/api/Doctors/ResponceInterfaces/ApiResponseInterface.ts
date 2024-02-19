
import type DoctorInterface from "~/Interfaces/Doctors/DoctorInterface";
export default interface ApiResponseInterface {
    doctors: DoctorInterface[];
    count: number;
    schedule: any[]; // Replace 'any' with a proper type for schedule if possible
    // ... other properties
}