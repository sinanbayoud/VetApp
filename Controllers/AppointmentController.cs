using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace PetDesk.Controllers
{
    [ApiController]
    [Route("data")]
    public class AppointmentController : ControllerBase
    {
        private readonly ILogger<AppointmentController> _logger;

        public AppointmentController(ILogger<AppointmentController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Appointment> Get()
        {
            var url = "https://sampledata.petdesk.com/api/appointments";
            WebClient webClient = new System.Net.WebClient();
            string json = webClient.DownloadString(url);

            var result = JsonConvert.DeserializeObject<dynamic>(json);
            
            Console.WriteLine("Controller Starting to build the JSON...");
            int l = result.Count;

            return Enumerable.Range(0, l-1).Select(index => new Appointment
            {
                AppointmentId = result[index].appointmentId,
                AppointmentType = result[index].appointmentType,
                CreateDateTime = result[index].createDateTime,
                RequestedDateTime  = result[index].requestedDateTimeOffset,
                UserId = result[index].user.userId,
                UserFirstName = result[index].user.firstName,
                UserLastName = result[index].user.lastName,
                VetDataId = result[index].user.vetDataId,
                AnimalId =  result[index].animal.animalId,
                AnimalName =  result[index].animal.firstName,
                Species =  result[index].animal.species,
                Breed = result[index].animal.breed,
            })
            .ToArray();
        }
    }
}
