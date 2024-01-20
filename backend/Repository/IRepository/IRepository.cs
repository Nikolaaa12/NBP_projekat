using System.Linq.Expressions;
namespace backend.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetOne(Expression<Func<T, bool>> predicate);
        Task<IQueryable<T>> GetAll();
        Task Add(T obj);
        void Delete(int? Id);
        void Update(T obj);
        Task<IQueryable<T>> GetAllWhere(Expression<Func<T, bool>> predicate);
        Task<bool> CheckIfNodeHasRelationships(int? Id);
        void DeleteWithoutRelationships(int? Id);
        void DetachDeleteNodeAndRelationships(int? Id);
    }
}
