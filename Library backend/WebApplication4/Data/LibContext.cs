using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Models;

namespace WebApplication4.Data
{
    public class LibContext : DbContext
    {
        public LibContext (DbContextOptions<LibContext> options)
            : base(options)
        {
        }

        public DbSet<WebApplication4.Models.User> User { get; set; }

        public DbSet<WebApplication4.Models.Book> Book { get; set; }
    }
}
