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
    }
}
