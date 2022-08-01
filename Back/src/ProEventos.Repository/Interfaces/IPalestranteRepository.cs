using ProEventos.Domain;

using System.Threading.Tasks;

namespace ProEventos.Repository.Interfaces
{
    public interface IPalestranteRepository
    {
        // Palestrantes
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false);
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false);
        Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos = false);
    }
}
