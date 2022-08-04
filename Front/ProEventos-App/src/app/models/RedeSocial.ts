import { Evento } from "@app/models/Evento"
import { Palestrante } from "@app/models/Palestrante"

export interface RedeSocial {
  id: number
  nome: string
  uRL: string
  eventoId?: number
  evento: Evento
  palestranteId?: number
  palestrante: Palestrante
}
