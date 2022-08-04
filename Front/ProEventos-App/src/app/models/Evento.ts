import { Lote } from "@app/models/Lote"
import { PalestranteEvento } from "@app/models/PalestranteEvento"
import { RedeSocial } from "@app/models/RedeSocial"

export interface Evento {
  id: number
  local: string
  dataEvento?: Date
  tema: string
  qtdPessoas: number
  imagemURL: string
  telefone: string
  email: string
  lotes: Lote[]
  redesSociais: RedeSocial[]
  palestrantesEventos: PalestranteEvento[]
}
