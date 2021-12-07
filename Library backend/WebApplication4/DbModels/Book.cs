using System.ComponentModel.DataAnnotations;

namespace WebApplication4.DbModels
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }  
        public string? ISBN { get; set; }
        public int? UserID { get; set; }
        [Required]
        public string Status { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
