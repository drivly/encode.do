export const api = {
  icon: '🔐',
  name: 'decode.do',
  description: 'Base64 Decode API',
  url: 'https://decode.do/api',
  type: 'https://apis.do/utilities',
  endpoints: {
    decode: 'https://decode.do/:encodedString',
  },
  site: 'https://decode.do',
  login: 'https://decode.do/login',
  signup: 'https://decode.do/signup',
  subscribe: 'https://decode.do/subscribe',
  repo: 'https://github.com/drivly/decode.do',
}

export const gettingStarted = [
  `If you don't already have a JSON Viewer Browser Extension, get that first:`,
  `https://extensions.do`,
]

export const examples = {
  "Decode String": 'https://encode.do/Hello, World!',
  "Decode JSON": 'https://encode.do/?hello=world',
}

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    if (!query && rootPath) return json({ api, gettingStarted, examples, user })
    
    // TODO: Implement this
    const [ value ] = pathSegments
    const encoded = query ? btoa(JSON.stringify(query)) : btoa(value)
    
    // let encoded = encodedValue 
    
    // try {
    //   decoded = JSON.parse(decodedValue)
    // } catch { }
    
    return json({ api, encoded, decoded: query ? query : value, user })
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
