
using backend.Models;
using backend.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        //public UserRepository(DbContext context) : base(context)
        //{
        //}

        //public EnaContext? _db
        //{
        //    get { return context as EnaContext;}
        //}


        public UserRepository(IGraphClient graphClient) : base(graphClient) { }


        public async Task<User> GetUserByEmail(string email)
        {
            var user = await this.GetOne(n => n.Email == email);
            return user;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var user = await this.GetOne(n => n.Username == username);
            return user;
        }
        public async Task<User> GetUserById(int id)
        {
            return await this.GetOne(n => n.Id == id);
        }

        public async Task<IQueryable<User>> GetUsersByCity(string city)
        {
            return await this.GetAllWhere(n => n.City == city);
        }
        public async Task<IQueryable<User>> GetUsersByType(int id)
        {
            return await this.GetAllWhere(n => n.TypeOfUser == id);
        }
        public User UpVote(User a)
        {
            a.UpVotes += 1;
            return (this.UpdateUser(a));
            
        }
        public User DownVote(User a)
        {
            a.DownVotes += 1;
            return (this.UpdateUser(a));
        }

        public User UpdateUser(User user)
        {
            this.Update(user);
            return user;
        }
        public async Task<User> Create(User user)
        {
            try
            {

                int? maxId = await this.GetMaxId();

                if (maxId == null){
                    user.Id = 1;
                    user.Admin=true;
                }
                else
                {
                    user.Admin=false;
                    user.Id = maxId.Value + 1;
                }
                if(user.Customer == true)
                    {
                    user.TypeOfUser = -1;
                    user.PricePerHour=0;
                    user.Description="";
                    }
                else
                    user.Customer = false;
                user.UpVotes = 0;
                user.DownVotes = 0;
                await this.Add(user);

                return user;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error creating UserType: {ex.Message}");
                throw; // Re-throw the exception to propagate it further
            }
        }
        public async Task<int?> GetMaxId()
        {
            var result = await _graphClient.Cypher
                .Match("(n:User)")
                .Return(() => Return.As<int?>("MAX(n.Id)"))
                .ResultsAsync;

            return result.SingleOrDefault();
        }
        public async void Assign(int Userid, int UserTypeid)
        {
            await _graphClient.Cypher.Match("(u:User),(t:UserType)")
            .Where((User u, UserType t) => u.Id == Userid && t.Id == UserTypeid)
            .Create("(u)-[r:ofType]->(t)")
            .ExecuteWithoutResultsAsync();
        }
        public void DeleteUserAndReservations(int? userId)
        {
            if (userId != null)
            {
                var query = _graphClient.Cypher
                    .Match("(user:User)<-[r:Handyman]-(reservation:Reservation)")
                    .Where($"user.Id = {userId}")
                    .DetachDelete("user, r, reservation")
                    .ExecuteWithoutResultsAsync();

                query.ContinueWith(t =>
                {
                    if (t.IsFaulted)
                    {
                        Console.WriteLine($"Error: {t.Exception?.InnerException?.Message}");
                    }
                }).Wait();
            }
            else
            {
                throw new InvalidOperationException("Unable to determine the ID for deletion.");
            }
        }
        public async Task<long> UserHasReservations(int userId)
        {
            var result = await _graphClient.Cypher
                .Match("(user:User)<-[:Handyman]-(reservation:Reservation)")
                .Where((User user) => user.Id == userId)
                .Return(reservation => reservation.Count())
                .ResultsAsync;

            return result.FirstOrDefault();
        }




    }
}
