using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Models;

 public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Description { get; set; }
        public string ProfilePicture { get; set; }
        [Required]
        public string City { get; set; }
        public int PricePerHour { get; set; }

        //public virtual ICollection<GameRequest> RecipientGameInvitations { get; set; }
        
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
        public UserType TypeOfUser { get; set; }

        
        public User(string name, string lastName, string username, string email, string password, string profilePicture, string description,string city,int price,UserType typeOfUser
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
        public User(string name, string lastName, string username, string email, string password, string profilePicture, string city,UserType typeOfUser
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