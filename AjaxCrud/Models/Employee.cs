using System.ComponentModel.DataAnnotations;

namespace AjaxCrud.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required (ErrorMessage ="Name is Required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "City is Required")]
        public string City { get; set; }

        [Required(ErrorMessage = "State is Required")]
        public string State { get; set; }

        [Required]
        public decimal? Salary { get; set; }


    }
}
