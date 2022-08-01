﻿using ProEventos.Domain;
using ProEventos.Repository.Interfaces;
using ProEventos.Repository.Contextos;

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Repository
{
    public class PalestranteRepository : IPalestranteRepository
    {
        private readonly ProEventosContext _context;
        public PalestranteRepository(ProEventosContext context)
        {
            _context = context;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                             .Include(p => p.RedesSociais);

            if (includeEventos)
                query = query.Include(p => p.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);

            query = query.OrderBy(p => p.Id);

            return await query.AsSplitQuery()
                              .AsNoTracking()
                              .ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                             .Include(p => p.RedesSociais);

            if (includeEventos)
                query = query.Include(p => p.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);

            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.AsSplitQuery()
                              .AsNoTracking()
                              .ToArrayAsync();
        }

        public async Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                             .Include(p => p.RedesSociais);

            if (includeEventos)
                query = query.Include(p => p.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);

            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Id == palestranteId);

            return await query.AsSplitQuery()
                              .AsNoTracking()
                              .FirstOrDefaultAsync();
        }

    }
}
