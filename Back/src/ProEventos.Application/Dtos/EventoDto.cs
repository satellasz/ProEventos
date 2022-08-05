using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório."),
        //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
        //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
         StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name = "Quantidade de pessoas"),
         Range(1, 120000, ErrorMessage = "{0} precisa ser entre 1 e 120000.")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Imagem inválida.\n (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório.")]
        [Phone(ErrorMessage = "{0} não é um telefone válido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório."),
         Display(Name = "E-mail"),
         EmailAddress(ErrorMessage = "{0} não é um e-mail válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}
