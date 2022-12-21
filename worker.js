export const api = {
  icon: '🔐',
  name: 'encode.do',
  description: 'Base64 Encode API',
  url: 'https://encode.do/api',
  type: 'https://apis.do/utilities',
  endpoints: {
    encodeText: 'https://encode.do/:stringToEncode',
    encodeFile: 'https://encode.do/url/:fileToEncode',
  },
  site: 'https://encode.do',
  login: 'https://encode.do/login',
  signup: 'https://encode.do/signup',
  subscribe: 'https://encode.do/subscribe',
  repo: 'https://github.com/drivly/encode.do',
}

export const gettingStarted = [
  `If you don't already have a JSON Viewer Browser Extension, get that first:`,
  `https://extensions.do`,
]

export const examples = {
  "Encode String": 'https://encode.do/Hello, World!',
  "Encode JSON": 'https://encode.do/?hello=world',
}

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    const hasQuery = Object.entries(query).length > 0
    const isUrl = pathSegments[0] === 'url'
    if (!hasQuery && (rootPath || isUrl && pathSegments === 1)) return json({ api, gettingStarted, examples, user })

    let value = pathSegments[pathSegments.length - 1]
    if (isUrl) {
      const buffer = await fetch(decodeURIComponent(value)).then(res => res.arrayBuffer())
      value = btoa(String.fromCharCode(new Uint8Array(buffer)))
    }
    else if (hasQuery) value = JSON.stringify(query)

    const encoded = btoa(value)
    return json({ api, encoded, decoded: query ? query : value, user })
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' } })
