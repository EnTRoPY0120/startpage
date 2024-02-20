/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"bHcdpHbZCHBwo2Rx","label":"..","bookmarks":[{"id":"3cGmyzxchDUkCKrF","label":"100xDevs","url":"https://app.100xdevs.com/courses/"},{"id":"2z8kWaYfbjWkf4SG","label":"Zerodha","url":"https://kite.zerodha.com/"}]},{"id":"eXyiKBsHlwqbgwR8","label":"personal","bookmarks":[{"id":"qR1W8DYjFYIw4oi7","label":"WhatsApp","url":"https://web.whatsapp.com/"},{"id":"N0O9P3ynZkAn8ELI","label":"Telegram","url":"https://web.telegram.org/a/"},{"id":"ZDJkp7rHY2DtuH8I","label":"GitHub","url":"https://github.com/"},{"id":"4VdVTKZzdzYlRJfN","label":"Drive","url":"https://drive.google.com/?authuser=0"}]},{"id":"F9HXac4nZzISx0Wx","label":"media","bookmarks":[{"id":"fiV7LIhj7YfMWTmo","label":"YouTube","url":"https://www.youtube.com/"},{"id":"cUgLOQHgfpnUl5KD","label":"Twitter","url":"https://twitter.com/home?lang=en"},{"id":"hX8X2pvKgMD1bgbm","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"NKAOzN2bXZFWtcta","label":"Reddit","url":"https://www.reddit.com/"}]},{"id":"9kM2yWmsBFs2JQIv","label":"misc","bookmarks":[{"id":"3xn7NewwymtX41kR","label":"icons","url":"https://feathericons.com/"},{"id":"FDHYYP5Rhupkogxv","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"TN3DwsbhgXyGaxdQ","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"QGYNaz0oj7K21rVi","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
