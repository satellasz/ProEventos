using ProEventos.Domain;

using System.Threading.Tasks;

namespace ProEventos.Repository.Interfaces
{
    public interface IEventoRepository
    {
        // Eventos
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
