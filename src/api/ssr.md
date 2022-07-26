# Server-Side Rendering API

## renderToString()

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function renderToString(
    input: App | KNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Example**

  ```js
  import { createSSRApp } from 'kdu'
  import { renderToString } from 'kdu/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context

  You can pass an optional context object, which can be used to record additional data during the render, for example [accessing content of Teleports](/guide/scaling-up/ssr.html#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  Most other SSR APIs on this page also optionally accept a context object. The context object can be accessed in component code via the [useSSRContext](#usessrcontext) helper.

- **See also:** [Guide - Server-Side Rendering](/guide/scaling-up/ssr.html)

## renderToNodeStream()

Renders input as a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function renderToNodeStream(
    input: App | KNode,
    context?: SSRContext
  ): Readable
  ```

- **Example**

  ```js
  // inside a Node.js http handler
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Note
  This method is not supported in the ESM build of `kdu/server-renderer`, which is decoupled from Node.js environments. Use [`pipeToNodeWritable`](#pipetonodewritable) instead.
  :::

## pipeToNodeWritable()

Render and pipe to an existing [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) instance.

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function pipeToNodeWritable(
    input: App | KNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Example**

  ```js
  // inside a Node.js http handler
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream()

Renders input as a [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function renderToWebStream(
    input: App | KNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Example**

  ```js
  // inside an environment with ReadableStream support
  return new Response(renderToWebStream(app))
  ```

  :::tip Note
  In environments that do not expose `ReadableStream` constructor in the global scope, [`pipeToWebWritable()`](#pipetowebwritable) should be used instead.
  :::

## pipeToWebWritable()

Render and pipe to an existing [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) instance.

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function pipeToWebWritable(
    input: App | KNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Example**

  This is typically used in combination with [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream is available in environments such as CloudFlare workers.
  // in Node.js, TransformStream needs to be explicitly imported from 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream()

Renders input in streaming mode using a simple readable interface.

- **Exported from `kdu/server-renderer`**

- **Type**

  ```ts
  function renderToSimpleStream(
    input: App | KNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **Example**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext()

A runtime API used to retrieve the context object passed to `renderToString()` or other server render APIs.

- **Type**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Example**

  The retrieved context can be used to attach information that is needed for rendering the final HTML (e.g. head metadata).

  ```kdu
  <script setup>
  import { useSSRContext } from 'kdu'

  // make sure to only call it during SSR
  // https://witejs.web.app/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...attach properties to the context
  }
  </script>
  ```
