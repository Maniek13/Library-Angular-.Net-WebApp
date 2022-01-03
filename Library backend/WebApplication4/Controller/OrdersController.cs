using Microsoft.AspNetCore.Mvc;
using WebApplication4.Data;
using WebApplication4.DbModels;

namespace WebApplication4.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly LibContext _context;

        public OrdersController(LibContext context)
        {
            _context = context;
        }

        //get user orders by user id
        // GET: api/Orders/userID
        [HttpGet("userId/{userId}&{type}")]
        public ActionResult<List<Book>> GetOrder(int userId, string type)
        {
            if(userId > 0)
            {
                switch (type)
                {
                    case ("peeding"):
                        return GetPeedingBooks(userId);
                    case ("ordered"):
                        return GetOrderedBooks(userId);
                    default: return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
        }

        private List<Book> GetPeedingBooks(int userId)
        {
            var ret = _context.Book.Where(el => el.UserID == userId && el.Status == "peeding");
            List<Book> books = new();

            foreach (Book b in ret)
            {
                books.Add(b);
            }

            return books;
        }


        private List<Book> GetOrderedBooks(int userId)
        {
            var ret = _context.Book.Where(el => el.UserID == userId && el.Status == "ordered");
            List<Book> books = new();

            foreach (Book b in ret)
            {
                books.Add(b);
            }

            return books;
        }

        //post set book to order 
        // POST: api/Orders
        [HttpPost("userId/{userId}")]
        public async Task<ActionResult<Book>> PostOrder(int userId, Book book)
        {
            try
            {
                if (userId > 0)
                {
                    book = _context.Book.First(el => el.BookID == book.BookID);

                    if(book.Status == "free")
                    {
                        book.UserID = userId;
                        book.Status = "peeding";
                        _context.Book.Update(book);
                        await _context.SaveChangesAsync();

                        return book;
                    }

                    return NotFound();
                    
                }
                else
                {
                    return NotFound();
                }  
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        // set to ordered
        // PUT: api/Orders
        [HttpPut("set/{userId}&{type}")]
        public async Task<ActionResult<List<Book>>> PutOrder(int userId, string type)
        {
            try
            {
                if (userId > 0)
                {
                    switch (type)
                    {
                        case ("order"):
                            return await SetToOrdered(userId);
                        case ("issued"):
                            return await OrderIssued(userId);
                        case ("free"):
                            return await OrderReceived(userId);
                        default: return NotFound();
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        //set user order to zamowiono
        private async Task<List<Book>> SetToOrdered(int userId)
        {
            try
            {
                var books = _context.Book.Where(b => b.UserID == userId && b.Status == "peeding");

                foreach (Book b in books)
                {
                    b.Status = "ordered";
                    b.From = DateTime.Now;
                    b.To = DateTime.Now.AddDays(14);
                }

                _context.Book.UpdateRange(books);
                await _context.SaveChangesAsync();

                return (List<Book>)books;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return new List<Book>();
        }

        //set user order to odebrano
        private async Task<List<Book>> OrderIssued(int userId)
        {
            try
            {
                var books = _context.Book.Where(b => b.UserID == userId && b.Status == "ordered");

                foreach (Book b in books)
                {
                    b.Status = "issued";
                }

                _context.Book.UpdateRange(books);
                await _context.SaveChangesAsync();

                return (List<Book>)books;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return new List<Book>();
        }

        private async Task<List<Book>> OrderReceived(int userId)
        {
            try
            {
                var books = _context.Book.Where(b => b.UserID == userId);

                foreach (Book b in books)
                {
                    b.Status = "free";
                    b.UserID = 0;
                }

                _context.Book.UpdateRange(books);
                await _context.SaveChangesAsync();

                return (List<Book>)books;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return new List<Book>();
        }

        // set to ordered
        // PUT: api/Orders
        [HttpPut("delete/{bookId}")]
        public async Task<ActionResult<bool>> PutOrder(int bookId)
        {
            try
            {
                if (bookId > 0)
                {
                    var books = _context.Book.FirstOrDefault(b => b.BookID == bookId);

                    if(books != null)
                    {
                        books.Status = "free";
                        books.UserID = 0;

                        _context.Book.UpdateRange(books);
                        await _context.SaveChangesAsync();

                        return true;
                    }
                    return NotFound();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }
    }
}
