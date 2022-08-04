import { Evento } from "@app/models/Evento"
import { Palestrante } from "@app/models/Palestrante"

export interface PalestranteEvento {
  palestranteId: number
  palestrante: Palestrante
  eventoId: number
  evento: Evento
}
