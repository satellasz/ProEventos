import { PalestranteEvento } from "@app/models/PalestranteEvento"
import { RedeSocial } from "@app/models/RedeSocial"

export interface Palestrante {
  id: number
  nome: string
  miniCurriculo: string
  imagemURL: string
  telefone: string
  email: string
  redesSociais: RedeSocial[]
  palestrantesEventos: PalestranteEvento[]
}
