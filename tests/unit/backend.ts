import { rest } from 'msw'
import { setupServer } from 'msw/node'
import episodesJSON from '../fixtures/episodes.json'
import episodeJSON from '../fixtures/episode.json'

const backend = setupServer(
  rest.get('http://localhost:5100/episodes.json', (req, res, ctx) => res(
    ctx.json(episodesJSON)
  )),

  rest.post('http://localhost:5100/episodes.json', (req, res, ctx) => res(
    ctx.status(201),
    ctx.json(episodeJSON)
  )),

  rest.get('http://localhost:5100/episodes/1.json', (req, res, ctx) => res(
    ctx.json(episodeJSON)
  )),

  rest.put('http://localhost:5100/episodes/1.json', (req, res, ctx) => res(
    ctx.json(episodeJSON)
  ))
)

export default backend
