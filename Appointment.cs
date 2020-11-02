using System;

namespace PetDesk
{
    public class Appointment
    {
        public string AppointmentId { get; set; }
        
        public string AppointmentType { get; set; }
        
        public DateTime CreateDateTime { get; set; }
        
        public DateTime RequestedDateTime { get; set; }
        
        public string UserId { get; set; }
        
        public string UserFirstName { get; set; }
        
        public string UserLastName { get; set; }
        
        public string VetDataId { get; set; }
        
        public string AnimalId { get; set; }
        
        public string AnimalName { get; set; }
        
        public string Species { get; set; }
        
        public string Breed { get; set; }
    }
}
