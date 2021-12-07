using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.DbModels;

namespace WebApplication4.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibContext _context;

        public BooksController(LibContext context)
        {
            _context = context;
        }

        //Get free books
        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
            return _context.Book.Where(el => !el.UserID.HasValue|| el.UserID == 0).ToList();
        }

        //Get book by id
        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        //Search book
        // PUT: api/Books/name/xxx
        [HttpGet("search/{name}")]
        public async Task<ActionResult<List<Book>>> GetBook(string name)
        {
            var books = _context.Book.Where(u => (u.Author.Contains(name) || u.Title.Contains(name)) && u.Status == "free").ToList();

            if (books == null)
            {
                return NotFound();
            }

            return (List<Book>)books;
        }

        //Update book
        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookID)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return NoContent();
        }

        //Add book
        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            try
            {
                _context.Book.Add(book);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBook", new { id = book.BookID }, book);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new Book();
            }
        }

        //Delete book
        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Book.Any(e => e.BookID == id);
        }
    }
}
