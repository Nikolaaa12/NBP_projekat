using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Models;

 public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Description { get; set; }
        public string? ProfilePicture { get; set; }
        public string? City { get; set; }
        public int PricePerHour { get; set; }

        //public virtual ICollection<GameRequest> RecipientGameInvitations { get; set; }
        public Boolean Admin { get; set; }
        
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
        public int TypeOfUser { get; set; }

        public User()
        {
            
        }
        public User(string name, string lastName, string username, string email, string password, string profilePicture, string description,string city,int price,int typeOfUser
            )
        {
            Name = name;
            LastName = lastName;
            Username = username;
            Email = email;
            TypeOfUser = typeOfUser;
            Password = password;
            ProfilePicture = profilePicture;
            Description=description;
            City=city;
            PricePerHour=price;
            UpVotes = 0;
            DownVotes = 0;
        }
        public User(string name, string lastName, string username, string email, string password, string profilePicture, string city,int typeOfUser
            )
        {
            Name = name;
            LastName = lastName;
            Username = username;
            Email = email;
            TypeOfUser = typeOfUser;
            Password = password;
            ProfilePicture = profilePicture;
            City=city;
            UpVotes = 0;
            DownVotes = 0;
        }
    }