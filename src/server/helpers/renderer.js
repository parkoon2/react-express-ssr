import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'
import Routes from '../../client/routes'
import clientScriptNames from '../../../webpack-assets.json'

export default (req, store, context) => {
    const scriptOutput = clientScriptNames => {
        // there must be a better way to order manifest, vendor, bundle :D but I'm tired
        const sortedChunks = []

        Object.keys(clientScriptNames).forEach(key => {
            sortedChunks.push(clientScriptNames[key])
        })
        return sortedChunks.reduce((accumulator, filename) => {
            accumulator += `<script src='${filename.js}'></script>`
            return accumulator
        }, '')
    }

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {renderRoutes(Routes)}
                {/* <div>{renderRoutes(Routes)}</div> */}
            </StaticRouter>
        </Provider>
    )

    const helmet = Helmet.renderStatic()
    return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
        </script>
        ${scriptOutput(clientScriptNames)}
      </body>
    </html>
  `
}
