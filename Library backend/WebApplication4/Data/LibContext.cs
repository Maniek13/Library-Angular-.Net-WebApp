using Microsoft.EntityFrameworkCore;
using WebApplication4.DbModels;

namespace WebApplication4.Data
{
    public class LibContext : DbContext
    {
        public LibContext (DbContextOptions<LibContext> options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; }

        public DbSet<Book> Book { get; set; }
    }
}
