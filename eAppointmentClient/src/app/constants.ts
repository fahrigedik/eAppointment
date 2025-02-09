import { DepartmentModel } from './models/doctor.model';

export const baseApiUrl: string = 'https://localhost:7023/api/';

export const departments: DepartmentModel[] = [
  { value: 1, name: 'Cardiology' },
  { value: 2, name: 'Neurology' },
  { value: 3, name: 'Orthopedics' },
  { value: 4, name: 'Pediatrics' },
  { value: 5, name: 'Urology' },
  { value: 6, name: 'Gynecology' },
  { value: 7, name: 'Ophthalmology' },
  { value: 8, name: 'Dermatology' },
  { value: 9, name: 'Radiology' },
  { value: 10, name: 'Anesthesiology' },
  { value: 11, name: 'Emergency' },
  { value: 12, name: 'GeneralSurgery' },
  { value: 13, name: 'InternalMedicine' },
  { value: 14, name: 'Otolaryngology' },
  { value: 15, name: 'Pathology' },
  { value: 16, name: 'Psychiatry' },
  { value: 17, name: 'Pulmonology' },
  { value: 18, name: 'Rheumatology' },
  { value: 19, name: 'UrologySurgery' },
  { value: 20, name: 'VascularSurgery' },
];
