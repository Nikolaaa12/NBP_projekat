namespace backend.DTOs;

public class AddUserTypeDTO
{
    public string? name { get; set; }
    public AddUserTypeDTO()
    {
        
    }
    public AddUserTypeDTO(string name)
    {
        this.name=name;
    }

}