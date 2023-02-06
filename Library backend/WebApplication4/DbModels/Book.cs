using System.ComponentModel.DataAnnotations;

namespace WebApplication4.DbModels
{
    public class Book
    {
        [Key]
        public int? BookID { get; set; } = null;
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }  
        public string? ISBN { get; set; } = null;
        public int? UserID { get; set; } = null;
        public string? Status { get; set; } = "free";
        public DateTime? From { get; set; } = null;
        public DateTime? To { get; set; } = null;
    }
}
