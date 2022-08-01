using ProEventos.Domain;
using ProEventos.Application.Contratos;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

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
                Evento[] eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento encontrado");

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
                Evento evento = await _eventoService.GetEventoByIdAsync(id);
                if (evento == null) return NotFound("Nenhum evento encontrado");

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
                Evento[] eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NotFound("Nenhum evento encontrado");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar recuperar eventos. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Evento model)
        {
            try
            {
                Evento evento = await _eventoService.AddEventos(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar evento");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar adicionar evento. Erro: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Evento model)
        {
            try
            {
                Evento evento = await _eventoService.UpdateEvento(id, model);
                if (evento == null) return BadRequest("Erro ao tentar atualizar evento");

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
                return await _eventoService.DeleteEvento(id) ? Ok("Deletado") : BadRequest("Evento não deletado");
              
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao tentar deletar evento. Erro: " + ex.Message);
            }
        }
    }
}
