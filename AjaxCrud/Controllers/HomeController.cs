using AjaxCrud.Data;
using AjaxCrud.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxCrud.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        //Get Employee List
        public JsonResult EmployeeList()
        {
            var data= _context.Employees.ToList();
            return new JsonResult(data);
        }

        //add new employee
        [HttpPost]
        public JsonResult AddEmployee(Employee employee) 
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                City = employee.City,
                State = employee.State,
                Salary = employee.Salary
            };
            _context.Employees.Add(emp);
            _context.SaveChanges();
            return new JsonResult("Data is saved");
        }


        //delete employee data
        public JsonResult Delete(int id)
        {
            var obj = _context.Employees.Where(u => u.Id == id).FirstOrDefault();
            _context.Employees.Remove(obj);
            _context.SaveChanges();
            return new JsonResult("Data Deleted");
        }



        //get employee data base on id and return data to form
        public JsonResult Edit(int id)
        {
            var obj = _context.Employees.Where(u=>u.Id==id).FirstOrDefault();
            return new JsonResult(obj);
        }


        //update employee record
        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            _context.Employees.Update(employee);
            _context.SaveChanges();
            return new JsonResult("update uccessfully");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
