using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class UserType
{
    public int? Id { get; set; }
    
    [Required]
    public string? Name { get; set; }
    public UserType(string name)
    {
        Name=name;
    }
    UserType(int Id,string name)
    {
        this.Id=Id;
        Name=name;
    }
    public UserType()
    {
        
    }

}