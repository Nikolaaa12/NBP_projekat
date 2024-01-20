public class Reservation
{
    public int Id { get; set; }
    public int IdCustomer { get; set; }
    public int IdHandyMan { get; set; }
    public DateOnly Date { get; set; }
    public Reservation()
    {

    }
}
