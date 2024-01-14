using System.Linq.Expressions;
using backend.Repository.IRepository;
using Neo4jClient;

namespace backend.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public readonly GraphClient _graphClient;
        public Repository(GraphClient _graphClient)
        {
            this._graphClient = _graphClient;
        }
        public async Task<T> GetOne(Expression<Func<T, bool>> predicate)
        {
            var result = await _graphClient.Cypher
                .Match("(n:" + typeof(T).Name + ")")
                .Where(predicate)
                .Return(n => n.As<T>())
                .ResultsAsync;
            if (result == null)
            {
                throw new Exception("Object with this ID dosent exists");
            }
            else
            {
                return result.Single();
            }
        }

        public async Task<IQueryable<T>> GetAll()
        {
            var list = await _graphClient.Cypher.Match("(n:" + typeof(T).Name + ")")
                                .Return(n => n.As<T>()).ResultsAsync;

            return list.AsQueryable();
        }

        public async Task Add(T obj)
        {
            try
            {
                await _graphClient.Cypher.Create("(d:" + typeof(T).Name + " $obj)")
                                           .WithParam("obj", obj)
                                           .ExecuteWithoutResultsAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding node to Neo4j: {ex.Message}");
                throw;
            }
        }
        public void Delete(T obj)
        {
            // Assuming there is an Id property in your T class
            var idValue = GetNodeId(obj); // You need to implement this method

            if (idValue != null)
            {
                _graphClient.Cypher
                    .Match("(d:" + typeof(T).Name + ")")
                    .Where($"d.Id = {idValue}")
                    .Delete("d")
                    .ExecuteWithoutResultsAsync();
            }
            else
            {
                // Handle the case where the ID is not available or not valid
                throw new InvalidOperationException("Unable to determine the ID for deletion.");
            }
        }

        private int? GetNodeId(T obj)
        {
            var propertyInfo = typeof(T).GetProperty("Id");
            return propertyInfo?.GetValue(obj) as int?;
        }

        public void Update(T obj)

        {
            var idProperty = typeof(T).GetProperty("Id");

            if (idProperty != null)
            {
                var idValue = idProperty.GetValue(obj);

                if (idValue != null)
                {
                    _graphClient.Cypher
                        .Match("(d:" + typeof(T).Name + ")")
                        .Where($"d.Id = {idValue}")  // Assuming "Id" is the property name
                        .Set("d = $obj")
                        .WithParam("obj", obj)
                        .ExecuteWithoutResultsAsync();
                }
                else
                {
                    // Handle the case where the ID value is null
                    throw new InvalidOperationException("The ID property value is null.");
                }
            }
            else
            {
                // Handle the case where the "Id" property doesn't exist
                throw new InvalidOperationException("The 'Id' property does not exist on type T.");
            }
        }

    }
}
