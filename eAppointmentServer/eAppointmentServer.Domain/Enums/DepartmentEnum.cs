using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.SmartEnum;

namespace eAppointmentServer.Domain.Enums
{
    public sealed class DepartmentEnum : SmartEnum<DepartmentEnum>
    {
        public static readonly DepartmentEnum Cardiology = new DepartmentEnum(nameof(Cardiology), 1);
        public static readonly DepartmentEnum Neurology = new DepartmentEnum(nameof(Neurology), 2);
        public static readonly DepartmentEnum Orthopedics = new DepartmentEnum(nameof(Orthopedics), 3);
        public static readonly DepartmentEnum Pediatrics = new DepartmentEnum(nameof(Pediatrics), 4);
        public static readonly DepartmentEnum Urology = new DepartmentEnum(nameof(Urology), 5);
        public static readonly DepartmentEnum Gynecology = new DepartmentEnum(nameof(Gynecology), 6);
        public static readonly DepartmentEnum Ophthalmology = new DepartmentEnum(nameof(Ophthalmology), 7);
        public static readonly DepartmentEnum Dermatology = new DepartmentEnum(nameof(Dermatology), 8);
        public static readonly DepartmentEnum Radiology = new DepartmentEnum(nameof(Radiology), 9);
        public static readonly DepartmentEnum Anesthesiology = new DepartmentEnum(nameof(Anesthesiology), 10);
        public static readonly DepartmentEnum Emergency = new DepartmentEnum(nameof(Emergency), 11);
        public static readonly DepartmentEnum GeneralSurgery = new DepartmentEnum(nameof(GeneralSurgery), 12);
        public static readonly DepartmentEnum InternalMedicine = new DepartmentEnum(nameof(InternalMedicine), 13);
        public static readonly DepartmentEnum Otolaryngology = new DepartmentEnum(nameof(Otolaryngology), 14);
        public static readonly DepartmentEnum Pathology = new DepartmentEnum(nameof(Pathology), 15);
        public static readonly DepartmentEnum Psychiatry = new DepartmentEnum(nameof(Psychiatry), 16);
        public static readonly DepartmentEnum Pulmonology = new DepartmentEnum(nameof(Pulmonology), 17);
        public static readonly DepartmentEnum Rheumatology = new DepartmentEnum(nameof(Rheumatology), 18);
        public static readonly DepartmentEnum UrologySurgery = new DepartmentEnum(nameof(UrologySurgery), 19);
        public static readonly DepartmentEnum VascularSurgery = new DepartmentEnum(nameof(VascularSurgery), 20);

        public DepartmentEnum(string name, int value) : base(name, value)
        {

        }
    }
}
