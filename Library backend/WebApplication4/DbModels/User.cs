using System.ComponentModel.DataAnnotations;

namespace WebApplication4.DbModels
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
