using ProEventos.Domain;
using ProEventos.Application.Interfaces;
using ProEventos.Application.Dtos;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoService;

        public EventoController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                EventoDto[] eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null) return NoContent();           

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar recuperar eventos. Erro: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                EventoDto evento = await _eventoService.GetEventoByIdAsync(id);
                if (evento == null) return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar recuperar evento. Erro: " + ex.Message);
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema([FromRoute] string tema)
        {
            try
            {
                EventoDto[] eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NoContent();

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar recuperar eventos. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventoDto model)
        {
            try
            {
                EventoDto evento = await _eventoService.AddEventos(model);
                if (evento == null) return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar adicionar evento. Erro: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] EventoDto model)
        {
            try
            {
                EventoDto evento = await _eventoService.UpdateEvento(id, model);
                if (evento == null) return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar atualizar evento. Erro: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                EventoDto evento = await _eventoService.GetEventoByIdAsync(id);
                if (evento == null) return NoContent();

                return await _eventoService.DeleteEvento(id) ? Ok("Deletado") : throw new Exception("Ocorreu um erro não especificado.");
              
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar deletar evento. Erro: " + ex.Message);
            }
        }
    }
}
